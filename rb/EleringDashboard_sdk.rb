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

    utility.make_fetch_def.call(ctx)
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


  # Idiomatic facade: client.balance.list / client.balance.load({ "id" => ... })
  def balance
    require_relative 'entity/balance_entity'
    @balance ||= BalanceEntity.new(self, nil)
  end

  # Deprecated: use client.balance instead.
  def Balance(data = nil)
    require_relative 'entity/balance_entity'
    BalanceEntity.new(self, data)
  end


  # Idiomatic facade: client.balance_controller.list / client.balance_controller.load({ "id" => ... })
  def balance_controller
    require_relative 'entity/balance_controller_entity'
    @balance_controller ||= BalanceControllerEntity.new(self, nil)
  end

  # Deprecated: use client.balance_controller instead.
  def BalanceController(data = nil)
    require_relative 'entity/balance_controller_entity'
    BalanceControllerEntity.new(self, data)
  end


  # Idiomatic facade: client.firm.list / client.firm.load({ "id" => ... })
  def firm
    require_relative 'entity/firm_entity'
    @firm ||= FirmEntity.new(self, nil)
  end

  # Deprecated: use client.firm instead.
  def Firm(data = nil)
    require_relative 'entity/firm_entity'
    FirmEntity.new(self, data)
  end


  # Idiomatic facade: client.firm_capacity_controller.list / client.firm_capacity_controller.load({ "id" => ... })
  def firm_capacity_controller
    require_relative 'entity/firm_capacity_controller_entity'
    @firm_capacity_controller ||= FirmCapacityControllerEntity.new(self, nil)
  end

  # Deprecated: use client.firm_capacity_controller instead.
  def FirmCapacityController(data = nil)
    require_relative 'entity/firm_capacity_controller_entity'
    FirmCapacityControllerEntity.new(self, data)
  end


  # Idiomatic facade: client.gas_balance_controller.list / client.gas_balance_controller.load({ "id" => ... })
  def gas_balance_controller
    require_relative 'entity/gas_balance_controller_entity'
    @gas_balance_controller ||= GasBalanceControllerEntity.new(self, nil)
  end

  # Deprecated: use client.gas_balance_controller instead.
  def GasBalanceController(data = nil)
    require_relative 'entity/gas_balance_controller_entity'
    GasBalanceControllerEntity.new(self, data)
  end


  # Idiomatic facade: client.gas_border_trade_controller.list / client.gas_border_trade_controller.load({ "id" => ... })
  def gas_border_trade_controller
    require_relative 'entity/gas_border_trade_controller_entity'
    @gas_border_trade_controller ||= GasBorderTradeControllerEntity.new(self, nil)
  end

  # Deprecated: use client.gas_border_trade_controller instead.
  def GasBorderTradeController(data = nil)
    require_relative 'entity/gas_border_trade_controller_entity'
    GasBorderTradeControllerEntity.new(self, data)
  end


  # Idiomatic facade: client.gas_system.list / client.gas_system.load({ "id" => ... })
  def gas_system
    require_relative 'entity/gas_system_entity'
    @gas_system ||= GasSystemEntity.new(self, nil)
  end

  # Deprecated: use client.gas_system instead.
  def GasSystem(data = nil)
    require_relative 'entity/gas_system_entity'
    GasSystemEntity.new(self, data)
  end


  # Idiomatic facade: client.gas_system_controller.list / client.gas_system_controller.load({ "id" => ... })
  def gas_system_controller
    require_relative 'entity/gas_system_controller_entity'
    @gas_system_controller ||= GasSystemControllerEntity.new(self, nil)
  end

  # Deprecated: use client.gas_system_controller instead.
  def GasSystemController(data = nil)
    require_relative 'entity/gas_system_controller_entity'
    GasSystemControllerEntity.new(self, data)
  end


  # Idiomatic facade: client.gas_trade.list / client.gas_trade.load({ "id" => ... })
  def gas_trade
    require_relative 'entity/gas_trade_entity'
    @gas_trade ||= GasTradeEntity.new(self, nil)
  end

  # Deprecated: use client.gas_trade instead.
  def GasTrade(data = nil)
    require_relative 'entity/gas_trade_entity'
    GasTradeEntity.new(self, data)
  end


  # Idiomatic facade: client.gas_trade_controller.list / client.gas_trade_controller.load({ "id" => ... })
  def gas_trade_controller
    require_relative 'entity/gas_trade_controller_entity'
    @gas_trade_controller ||= GasTradeControllerEntity.new(self, nil)
  end

  # Deprecated: use client.gas_trade_controller instead.
  def GasTradeController(data = nil)
    require_relative 'entity/gas_trade_controller_entity'
    GasTradeControllerEntity.new(self, data)
  end


  # Idiomatic facade: client.gas_transmission_controller.list / client.gas_transmission_controller.load({ "id" => ... })
  def gas_transmission_controller
    require_relative 'entity/gas_transmission_controller_entity'
    @gas_transmission_controller ||= GasTransmissionControllerEntity.new(self, nil)
  end

  # Deprecated: use client.gas_transmission_controller instead.
  def GasTransmissionController(data = nil)
    require_relative 'entity/gas_transmission_controller_entity'
    GasTransmissionControllerEntity.new(self, data)
  end


  # Idiomatic facade: client.green_controller.list / client.green_controller.load({ "id" => ... })
  def green_controller
    require_relative 'entity/green_controller_entity'
    @green_controller ||= GreenControllerEntity.new(self, nil)
  end

  # Deprecated: use client.green_controller instead.
  def GreenController(data = nil)
    require_relative 'entity/green_controller_entity'
    GreenControllerEntity.new(self, data)
  end


  # Idiomatic facade: client.interruptible.list / client.interruptible.load({ "id" => ... })
  def interruptible
    require_relative 'entity/interruptible_entity'
    @interruptible ||= InterruptibleEntity.new(self, nil)
  end

  # Deprecated: use client.interruptible instead.
  def Interruptible(data = nil)
    require_relative 'entity/interruptible_entity'
    InterruptibleEntity.new(self, data)
  end


  # Idiomatic facade: client.interruptible_capacity_controller.list / client.interruptible_capacity_controller.load({ "id" => ... })
  def interruptible_capacity_controller
    require_relative 'entity/interruptible_capacity_controller_entity'
    @interruptible_capacity_controller ||= InterruptibleCapacityControllerEntity.new(self, nil)
  end

  # Deprecated: use client.interruptible_capacity_controller instead.
  def InterruptibleCapacityController(data = nil)
    require_relative 'entity/interruptible_capacity_controller_entity'
    InterruptibleCapacityControllerEntity.new(self, data)
  end


  # Idiomatic facade: client.nomination.list / client.nomination.load({ "id" => ... })
  def nomination
    require_relative 'entity/nomination_entity'
    @nomination ||= NominationEntity.new(self, nil)
  end

  # Deprecated: use client.nomination instead.
  def Nomination(data = nil)
    require_relative 'entity/nomination_entity'
    NominationEntity.new(self, data)
  end


  # Idiomatic facade: client.nominations_controller.list / client.nominations_controller.load({ "id" => ... })
  def nominations_controller
    require_relative 'entity/nominations_controller_entity'
    @nominations_controller ||= NominationsControllerEntity.new(self, nil)
  end

  # Deprecated: use client.nominations_controller instead.
  def NominationsController(data = nil)
    require_relative 'entity/nominations_controller_entity'
    NominationsControllerEntity.new(self, data)
  end


  # Idiomatic facade: client.nps_controller.list / client.nps_controller.load({ "id" => ... })
  def nps_controller
    require_relative 'entity/nps_controller_entity'
    @nps_controller ||= NpsControllerEntity.new(self, nil)
  end

  # Deprecated: use client.nps_controller instead.
  def NpsController(data = nil)
    require_relative 'entity/nps_controller_entity'
    NpsControllerEntity.new(self, data)
  end


  # Idiomatic facade: client.renomination.list / client.renomination.load({ "id" => ... })
  def renomination
    require_relative 'entity/renomination_entity'
    @renomination ||= RenominationEntity.new(self, nil)
  end

  # Deprecated: use client.renomination instead.
  def Renomination(data = nil)
    require_relative 'entity/renomination_entity'
    RenominationEntity.new(self, data)
  end


  # Idiomatic facade: client.renominations_controller.list / client.renominations_controller.load({ "id" => ... })
  def renominations_controller
    require_relative 'entity/renominations_controller_entity'
    @renominations_controller ||= RenominationsControllerEntity.new(self, nil)
  end

  # Deprecated: use client.renominations_controller instead.
  def RenominationsController(data = nil)
    require_relative 'entity/renominations_controller_entity'
    RenominationsControllerEntity.new(self, data)
  end


  # Idiomatic facade: client.system.list / client.system.load({ "id" => ... })
  def system
    require_relative 'entity/system_entity'
    @system ||= SystemEntity.new(self, nil)
  end

  # Deprecated: use client.system instead.
  def System(data = nil)
    require_relative 'entity/system_entity'
    SystemEntity.new(self, data)
  end


  # Idiomatic facade: client.system_controller.list / client.system_controller.load({ "id" => ... })
  def system_controller
    require_relative 'entity/system_controller_entity'
    @system_controller ||= SystemControllerEntity.new(self, nil)
  end

  # Deprecated: use client.system_controller instead.
  def SystemController(data = nil)
    require_relative 'entity/system_controller_entity'
    SystemControllerEntity.new(self, data)
  end


  # Idiomatic facade: client.transmission_controller.list / client.transmission_controller.load({ "id" => ... })
  def transmission_controller
    require_relative 'entity/transmission_controller_entity'
    @transmission_controller ||= TransmissionControllerEntity.new(self, nil)
  end

  # Deprecated: use client.transmission_controller instead.
  def TransmissionController(data = nil)
    require_relative 'entity/transmission_controller_entity'
    TransmissionControllerEntity.new(self, data)
  end


  # Idiomatic facade: client.umm_gas_controller.list / client.umm_gas_controller.load({ "id" => ... })
  def umm_gas_controller
    require_relative 'entity/umm_gas_controller_entity'
    @umm_gas_controller ||= UmmGasControllerEntity.new(self, nil)
  end

  # Deprecated: use client.umm_gas_controller instead.
  def UmmGasController(data = nil)
    require_relative 'entity/umm_gas_controller_entity'
    UmmGasControllerEntity.new(self, data)
  end


  # Idiomatic facade: client.umm_rss_feed_controller.list / client.umm_rss_feed_controller.load({ "id" => ... })
  def umm_rss_feed_controller
    require_relative 'entity/umm_rss_feed_controller_entity'
    @umm_rss_feed_controller ||= UmmRssFeedControllerEntity.new(self, nil)
  end

  # Deprecated: use client.umm_rss_feed_controller instead.
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
