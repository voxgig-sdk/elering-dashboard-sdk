-- EleringDashboard SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local EleringDashboardSDK = {}
EleringDashboardSDK.__index = EleringDashboardSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

EleringDashboardSDK._make_feature = _make_feature


function EleringDashboardSDK.new(options)
  local self = setmetatable({}, EleringDashboardSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features from config.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local feature_items = vs.items(feature_opts)
    if feature_items ~= nil then
      for _, item in ipairs(feature_items) do
        local fname = item[1]
        local fopts = helpers.to_map(item[2])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function EleringDashboardSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function EleringDashboardSDK:get_utility()
  return Utility.copy(self._utility)
end


function EleringDashboardSDK:get_root_ctx()
  return self._rootctx
end


function EleringDashboardSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function EleringDashboardSDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:Balance():list() / client:Balance():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:Balance(data)
  local EntityMod = require("entity.balance_entity")
  if data == nil then
    if self._balance == nil then
      self._balance = EntityMod.new(self, nil)
    end
    return self._balance
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BalanceController():list() / client:BalanceController():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:BalanceController(data)
  local EntityMod = require("entity.balance_controller_entity")
  if data == nil then
    if self._balance_controller == nil then
      self._balance_controller = EntityMod.new(self, nil)
    end
    return self._balance_controller
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Firm():list() / client:Firm():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:Firm(data)
  local EntityMod = require("entity.firm_entity")
  if data == nil then
    if self._firm == nil then
      self._firm = EntityMod.new(self, nil)
    end
    return self._firm
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:FirmCapacityController():list() / client:FirmCapacityController():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:FirmCapacityController(data)
  local EntityMod = require("entity.firm_capacity_controller_entity")
  if data == nil then
    if self._firm_capacity_controller == nil then
      self._firm_capacity_controller = EntityMod.new(self, nil)
    end
    return self._firm_capacity_controller
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GasBalanceController():list() / client:GasBalanceController():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:GasBalanceController(data)
  local EntityMod = require("entity.gas_balance_controller_entity")
  if data == nil then
    if self._gas_balance_controller == nil then
      self._gas_balance_controller = EntityMod.new(self, nil)
    end
    return self._gas_balance_controller
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GasBorderTradeController():list() / client:GasBorderTradeController():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:GasBorderTradeController(data)
  local EntityMod = require("entity.gas_border_trade_controller_entity")
  if data == nil then
    if self._gas_border_trade_controller == nil then
      self._gas_border_trade_controller = EntityMod.new(self, nil)
    end
    return self._gas_border_trade_controller
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GasSystem():list() / client:GasSystem():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:GasSystem(data)
  local EntityMod = require("entity.gas_system_entity")
  if data == nil then
    if self._gas_system == nil then
      self._gas_system = EntityMod.new(self, nil)
    end
    return self._gas_system
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GasSystemController():list() / client:GasSystemController():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:GasSystemController(data)
  local EntityMod = require("entity.gas_system_controller_entity")
  if data == nil then
    if self._gas_system_controller == nil then
      self._gas_system_controller = EntityMod.new(self, nil)
    end
    return self._gas_system_controller
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GasTrade():list() / client:GasTrade():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:GasTrade(data)
  local EntityMod = require("entity.gas_trade_entity")
  if data == nil then
    if self._gas_trade == nil then
      self._gas_trade = EntityMod.new(self, nil)
    end
    return self._gas_trade
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GasTradeController():list() / client:GasTradeController():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:GasTradeController(data)
  local EntityMod = require("entity.gas_trade_controller_entity")
  if data == nil then
    if self._gas_trade_controller == nil then
      self._gas_trade_controller = EntityMod.new(self, nil)
    end
    return self._gas_trade_controller
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GasTransmissionController():list() / client:GasTransmissionController():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:GasTransmissionController(data)
  local EntityMod = require("entity.gas_transmission_controller_entity")
  if data == nil then
    if self._gas_transmission_controller == nil then
      self._gas_transmission_controller = EntityMod.new(self, nil)
    end
    return self._gas_transmission_controller
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GreenController():list() / client:GreenController():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:GreenController(data)
  local EntityMod = require("entity.green_controller_entity")
  if data == nil then
    if self._green_controller == nil then
      self._green_controller = EntityMod.new(self, nil)
    end
    return self._green_controller
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Interruptible():list() / client:Interruptible():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:Interruptible(data)
  local EntityMod = require("entity.interruptible_entity")
  if data == nil then
    if self._interruptible == nil then
      self._interruptible = EntityMod.new(self, nil)
    end
    return self._interruptible
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:InterruptibleCapacityController():list() / client:InterruptibleCapacityController():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:InterruptibleCapacityController(data)
  local EntityMod = require("entity.interruptible_capacity_controller_entity")
  if data == nil then
    if self._interruptible_capacity_controller == nil then
      self._interruptible_capacity_controller = EntityMod.new(self, nil)
    end
    return self._interruptible_capacity_controller
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Nomination():list() / client:Nomination():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:Nomination(data)
  local EntityMod = require("entity.nomination_entity")
  if data == nil then
    if self._nomination == nil then
      self._nomination = EntityMod.new(self, nil)
    end
    return self._nomination
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:NominationsController():list() / client:NominationsController():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:NominationsController(data)
  local EntityMod = require("entity.nominations_controller_entity")
  if data == nil then
    if self._nominations_controller == nil then
      self._nominations_controller = EntityMod.new(self, nil)
    end
    return self._nominations_controller
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:NpsController():list() / client:NpsController():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:NpsController(data)
  local EntityMod = require("entity.nps_controller_entity")
  if data == nil then
    if self._nps_controller == nil then
      self._nps_controller = EntityMod.new(self, nil)
    end
    return self._nps_controller
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Renomination():list() / client:Renomination():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:Renomination(data)
  local EntityMod = require("entity.renomination_entity")
  if data == nil then
    if self._renomination == nil then
      self._renomination = EntityMod.new(self, nil)
    end
    return self._renomination
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RenominationsController():list() / client:RenominationsController():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:RenominationsController(data)
  local EntityMod = require("entity.renominations_controller_entity")
  if data == nil then
    if self._renominations_controller == nil then
      self._renominations_controller = EntityMod.new(self, nil)
    end
    return self._renominations_controller
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:System():list() / client:System():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:System(data)
  local EntityMod = require("entity.system_entity")
  if data == nil then
    if self._system == nil then
      self._system = EntityMod.new(self, nil)
    end
    return self._system
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SystemController():list() / client:SystemController():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:SystemController(data)
  local EntityMod = require("entity.system_controller_entity")
  if data == nil then
    if self._system_controller == nil then
      self._system_controller = EntityMod.new(self, nil)
    end
    return self._system_controller
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:TransmissionController():list() / client:TransmissionController():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:TransmissionController(data)
  local EntityMod = require("entity.transmission_controller_entity")
  if data == nil then
    if self._transmission_controller == nil then
      self._transmission_controller = EntityMod.new(self, nil)
    end
    return self._transmission_controller
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:UmmGasController():list() / client:UmmGasController():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:UmmGasController(data)
  local EntityMod = require("entity.umm_gas_controller_entity")
  if data == nil then
    if self._umm_gas_controller == nil then
      self._umm_gas_controller = EntityMod.new(self, nil)
    end
    return self._umm_gas_controller
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:UmmRssFeedController():list() / client:UmmRssFeedController():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EleringDashboardSDK:UmmRssFeedController(data)
  local EntityMod = require("entity.umm_rss_feed_controller_entity")
  if data == nil then
    if self._umm_rss_feed_controller == nil then
      self._umm_rss_feed_controller = EntityMod.new(self, nil)
    end
    return self._umm_rss_feed_controller
  end
  return EntityMod.new(self, data)
end




function EleringDashboardSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = EleringDashboardSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return EleringDashboardSDK
