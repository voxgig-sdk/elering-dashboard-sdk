# NominationsController entity test

require "minitest/autorun"
require "json"
require_relative "../EleringDashboard_sdk"
require_relative "runner"

class NominationsControllerEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = EleringDashboardSDK.test(nil, nil)
    ent = testsdk.NominationsController(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = EleringDashboardConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = EleringDashboardSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.NominationsController(nil).load({ "end" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = nominations_controller_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "nominations_controller." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    nominations_controller_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.nominations_controller")))
    nominations_controller_ref01_data = nil
    if nominations_controller_ref01_data_raw.length > 0
      nominations_controller_ref01_data = Helpers.to_map(nominations_controller_ref01_data_raw[0][1])
    end

    # LOAD
    nominations_controller_ref01_ent = client.NominationsController(nil)
    nominations_controller_ref01_match_dt0 = {}
    nominations_controller_ref01_data_dt0_loaded = nominations_controller_ref01_ent.load(nominations_controller_ref01_match_dt0, nil)
    assert !nominations_controller_ref01_data_dt0_loaded.nil?

  end
end

def nominations_controller_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "nominations_controller", "NominationsControllerTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = EleringDashboardSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["nominations_controller01", "nominations_controller02", "nominations_controller03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["ELERING_DASHBOARD_TEST_NOMINATIONS_CONTROLLER_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "ELERING_DASHBOARD_TEST_NOMINATIONS_CONTROLLER_ENTID" => idmap,
    "ELERING_DASHBOARD_TEST_LIVE" => "FALSE",
    "ELERING_DASHBOARD_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["ELERING_DASHBOARD_TEST_NOMINATIONS_CONTROLLER_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["ELERING_DASHBOARD_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = EleringDashboardSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["ELERING_DASHBOARD_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["ELERING_DASHBOARD_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
