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
    return nil, err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    fetchdef, err = prepare(fetchargs)
    return { "ok" => false, "err" => err }, nil if err

    fetchargs ||= {}
    ctrl = EleringDashboardHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err }, nil if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }, nil
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
      }, nil
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }, nil
  end


  def Balance(data = nil)
    require_relative 'entity/balance_entity'
    BalanceEntity.new(self, data)
  end


  def BalanceController(data = nil)
    require_relative 'entity/balance_controller_entity'
    BalanceControllerEntity.new(self, data)
  end


  def Firm(data = nil)
    require_relative 'entity/firm_entity'
    FirmEntity.new(self, data)
  end


  def FirmCapacityController(data = nil)
    require_relative 'entity/firm_capacity_controller_entity'
    FirmCapacityControllerEntity.new(self, data)
  end


  def GasBalanceController(data = nil)
    require_relative 'entity/gas_balance_controller_entity'
    GasBalanceControllerEntity.new(self, data)
  end


  def GasBorderTradeController(data = nil)
    require_relative 'entity/gas_border_trade_controller_entity'
    GasBorderTradeControllerEntity.new(self, data)
  end


  def GasSystem(data = nil)
    require_relative 'entity/gas_system_entity'
    GasSystemEntity.new(self, data)
  end


  def GasSystemController(data = nil)
    require_relative 'entity/gas_system_controller_entity'
    GasSystemControllerEntity.new(self, data)
  end


  def GasTrade(data = nil)
    require_relative 'entity/gas_trade_entity'
    GasTradeEntity.new(self, data)
  end


  def GasTradeController(data = nil)
    require_relative 'entity/gas_trade_controller_entity'
    GasTradeControllerEntity.new(self, data)
  end


  def GasTransmissionController(data = nil)
    require_relative 'entity/gas_transmission_controller_entity'
    GasTransmissionControllerEntity.new(self, data)
  end


  def GreenController(data = nil)
    require_relative 'entity/green_controller_entity'
    GreenControllerEntity.new(self, data)
  end


  def Interruptible(data = nil)
    require_relative 'entity/interruptible_entity'
    InterruptibleEntity.new(self, data)
  end


  def InterruptibleCapacityController(data = nil)
    require_relative 'entity/interruptible_capacity_controller_entity'
    InterruptibleCapacityControllerEntity.new(self, data)
  end


  def Nomination(data = nil)
    require_relative 'entity/nomination_entity'
    NominationEntity.new(self, data)
  end


  def NominationsController(data = nil)
    require_relative 'entity/nominations_controller_entity'
    NominationsControllerEntity.new(self, data)
  end


  def NpsController(data = nil)
    require_relative 'entity/nps_controller_entity'
    NpsControllerEntity.new(self, data)
  end


  def Renomination(data = nil)
    require_relative 'entity/renomination_entity'
    RenominationEntity.new(self, data)
  end


  def RenominationsController(data = nil)
    require_relative 'entity/renominations_controller_entity'
    RenominationsControllerEntity.new(self, data)
  end


  def System(data = nil)
    require_relative 'entity/system_entity'
    SystemEntity.new(self, data)
  end


  def SystemController(data = nil)
    require_relative 'entity/system_controller_entity'
    SystemControllerEntity.new(self, data)
  end


  def TransmissionController(data = nil)
    require_relative 'entity/transmission_controller_entity'
    TransmissionControllerEntity.new(self, data)
  end


  def UmmGasController(data = nil)
    require_relative 'entity/umm_gas_controller_entity'
    UmmGasControllerEntity.new(self, data)
  end


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
