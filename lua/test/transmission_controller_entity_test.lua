-- TransmissionController entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("elering-dashboard_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("TransmissionControllerEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:TransmissionController(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:TransmissionController(nil):load({ ["group"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = transmission_controller_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "transmission_controller." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local transmission_controller_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.transmission_controller")))
    local transmission_controller_ref01_data = nil
    if #transmission_controller_ref01_data_raw > 0 then
      transmission_controller_ref01_data = helpers.to_map(transmission_controller_ref01_data_raw[1][2])
    end

    -- LOAD
    local transmission_controller_ref01_ent = client:TransmissionController(nil)
    local transmission_controller_ref01_match_dt0 = {}
    local transmission_controller_ref01_data_dt0_loaded, err = transmission_controller_ref01_ent:load(transmission_controller_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(transmission_controller_ref01_data_dt0_loaded)

  end)
end)

function transmission_controller_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/transmission_controller/TransmissionControllerTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read transmission_controller test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "transmission_controller01", "transmission_controller02", "transmission_controller03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("ELERING_DASHBOARD_TEST_TRANSMISSION_CONTROLLER_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["ELERING_DASHBOARD_TEST_TRANSMISSION_CONTROLLER_ENTID"] = idmap,
    ["ELERING_DASHBOARD_TEST_LIVE"] = "FALSE",
    ["ELERING_DASHBOARD_TEST_EXPLAIN"] = "FALSE",
  })

  local idmap_resolved = helpers.to_map(
    env["ELERING_DASHBOARD_TEST_TRANSMISSION_CONTROLLER_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["ELERING_DASHBOARD_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["ELERING_DASHBOARD_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["ELERING_DASHBOARD_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
