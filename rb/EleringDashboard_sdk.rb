# EleringDashboard SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'EleringDashboard_types'


class EleringDashboardSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = EleringDashboardUtility.new
    @_utility = utility

    config = EleringDashboardConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = EleringDashboardHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = EleringDashboardHelpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, EleringDashboardFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    EleringDashboardUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = EleringDashboardHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = EleringDashboardHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = EleringDashboardHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = EleringDashboardSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    # make_fetch_def returns a (fetchdef, err) tuple; destructure it and
    # return just the fetchdef Hash (raising on error) so callers — including
    # direct(), which indexes fetchdef["url"] — receive a Hash, mirroring the
    # ts/py prepare().
    fetchdef, fd_err = utility.make_fetch_def.call(ctx)
    raise fd_err if fd_err

    fetchdef
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue EleringDashboardError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = EleringDashboardHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = EleringDashboardHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Canonical facade: client.Balance.list / client.Balance.load({ "id" => ... })
  def Balance(data = nil)
    require_relative 'entity/balance_entity'
    BalanceEntity.new(self, data)
  end


  # Canonical facade: client.BalanceController.list / client.BalanceController.load({ "id" => ... })
  def BalanceController(data = nil)
    require_relative 'entity/balance_controller_entity'
    BalanceControllerEntity.new(self, data)
  end


  # Canonical facade: client.Firm.list / client.Firm.load({ "id" => ... })
  def Firm(data = nil)
    require_relative 'entity/firm_entity'
    FirmEntity.new(self, data)
  end


  # Canonical facade: client.FirmCapacityController.list / client.FirmCapacityController.load({ "id" => ... })
  def FirmCapacityController(data = nil)
    require_relative 'entity/firm_capacity_controller_entity'
    FirmCapacityControllerEntity.new(self, data)
  end


  # Canonical facade: client.GasBalanceController.list / client.GasBalanceController.load({ "id" => ... })
  def GasBalanceController(data = nil)
    require_relative 'entity/gas_balance_controller_entity'
    GasBalanceControllerEntity.new(self, data)
  end


  # Canonical facade: client.GasBorderTradeController.list / client.GasBorderTradeController.load({ "id" => ... })
  def GasBorderTradeController(data = nil)
    require_relative 'entity/gas_border_trade_controller_entity'
    GasBorderTradeControllerEntity.new(self, data)
  end


  # Canonical facade: client.GasSystem.list / client.GasSystem.load({ "id" => ... })
  def GasSystem(data = nil)
    require_relative 'entity/gas_system_entity'
    GasSystemEntity.new(self, data)
  end


  # Canonical facade: client.GasSystemController.list / client.GasSystemController.load({ "id" => ... })
  def GasSystemController(data = nil)
    require_relative 'entity/gas_system_controller_entity'
    GasSystemControllerEntity.new(self, data)
  end


  # Canonical facade: client.GasTrade.list / client.GasTrade.load({ "id" => ... })
  def GasTrade(data = nil)
    require_relative 'entity/gas_trade_entity'
    GasTradeEntity.new(self, data)
  end


  # Canonical facade: client.GasTradeController.list / client.GasTradeController.load({ "id" => ... })
  def GasTradeController(data = nil)
    require_relative 'entity/gas_trade_controller_entity'
    GasTradeControllerEntity.new(self, data)
  end


  # Canonical facade: client.GasTransmissionController.list / client.GasTransmissionController.load({ "id" => ... })
  def GasTransmissionController(data = nil)
    require_relative 'entity/gas_transmission_controller_entity'
    GasTransmissionControllerEntity.new(self, data)
  end


  # Canonical facade: client.GreenController.list / client.GreenController.load({ "id" => ... })
  def GreenController(data = nil)
    require_relative 'entity/green_controller_entity'
    GreenControllerEntity.new(self, data)
  end


  # Canonical facade: client.Interruptible.list / client.Interruptible.load({ "id" => ... })
  def Interruptible(data = nil)
    require_relative 'entity/interruptible_entity'
    InterruptibleEntity.new(self, data)
  end


  # Canonical facade: client.InterruptibleCapacityController.list / client.InterruptibleCapacityController.load({ "id" => ... })
  def InterruptibleCapacityController(data = nil)
    require_relative 'entity/interruptible_capacity_controller_entity'
    InterruptibleCapacityControllerEntity.new(self, data)
  end


  # Canonical facade: client.Nomination.list / client.Nomination.load({ "id" => ... })
  def Nomination(data = nil)
    require_relative 'entity/nomination_entity'
    NominationEntity.new(self, data)
  end


  # Canonical facade: client.NominationsController.list / client.NominationsController.load({ "id" => ... })
  def NominationsController(data = nil)
    require_relative 'entity/nominations_controller_entity'
    NominationsControllerEntity.new(self, data)
  end


  # Canonical facade: client.NpsController.list / client.NpsController.load({ "id" => ... })
  def NpsController(data = nil)
    require_relative 'entity/nps_controller_entity'
    NpsControllerEntity.new(self, data)
  end


  # Canonical facade: client.Renomination.list / client.Renomination.load({ "id" => ... })
  def Renomination(data = nil)
    require_relative 'entity/renomination_entity'
    RenominationEntity.new(self, data)
  end


  # Canonical facade: client.RenominationsController.list / client.RenominationsController.load({ "id" => ... })
  def RenominationsController(data = nil)
    require_relative 'entity/renominations_controller_entity'
    RenominationsControllerEntity.new(self, data)
  end


  # Canonical facade: client.System.list / client.System.load({ "id" => ... })
  def System(data = nil)
    require_relative 'entity/system_entity'
    SystemEntity.new(self, data)
  end


  # Canonical facade: client.SystemController.list / client.SystemController.load({ "id" => ... })
  def SystemController(data = nil)
    require_relative 'entity/system_controller_entity'
    SystemControllerEntity.new(self, data)
  end


  # Canonical facade: client.TransmissionController.list / client.TransmissionController.load({ "id" => ... })
  def TransmissionController(data = nil)
    require_relative 'entity/transmission_controller_entity'
    TransmissionControllerEntity.new(self, data)
  end


  # Canonical facade: client.UmmGasController.list / client.UmmGasController.load({ "id" => ... })
  def UmmGasController(data = nil)
    require_relative 'entity/umm_gas_controller_entity'
    UmmGasControllerEntity.new(self, data)
  end


  # Canonical facade: client.UmmRssFeedController.list / client.UmmRssFeedController.load({ "id" => ... })
  def UmmRssFeedController(data = nil)
    require_relative 'entity/umm_rss_feed_controller_entity'
    UmmRssFeedControllerEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = EleringDashboardSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
