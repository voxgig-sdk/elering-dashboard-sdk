# NominationsController entity test

require "minitest/autorun"
require "json"
require_relative "../EleringDashboard_sdk"
require_relative "runner"

class NominationsControllerEntityTest < Minitest::Test
  def test_create_instance
    testsdk = EleringDashboardSDK.test(nil, nil)
    ent = testsdk.NominationsController(nil)
    assert !ent.nil?
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
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set ELERINGDASHBOARD_TEST_NOMINATIONS_CONTROLLER_ENTID JSON to run live"
      return
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
    nominations_controller_ref01_data_dt0_loaded, err = nominations_controller_ref01_ent.load(nominations_controller_ref01_match_dt0, nil)
    assert_nil err
    assert !nominations_controller_ref01_data_dt0_loaded.nil?

  end
end

def nominations_controller_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "nominations_controller", "NominationsControllerTestData.json")
  entity_data_source = File.read(entity_data_file)
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

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["ELERINGDASHBOARD_TEST_NOMINATIONS_CONTROLLER_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "ELERINGDASHBOARD_TEST_NOMINATIONS_CONTROLLER_ENTID" => idmap,
    "ELERINGDASHBOARD_TEST_LIVE" => "FALSE",
    "ELERINGDASHBOARD_TEST_EXPLAIN" => "FALSE",
    "ELERINGDASHBOARD_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["ELERINGDASHBOARD_TEST_NOMINATIONS_CONTROLLER_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["ELERINGDASHBOARD_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["ELERINGDASHBOARD_APIKEY"],
      },
      extra || {},
    ])
    client = EleringDashboardSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["ELERINGDASHBOARD_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["ELERINGDASHBOARD_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
