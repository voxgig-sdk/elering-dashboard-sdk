<?php
declare(strict_types=1);

// NpsController entity test

require_once __DIR__ . '/../eleringdashboard_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class NpsControllerEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = EleringDashboardSDK::test(null, null);
        $ent = $testsdk->NpsController(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = nps_controller_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "nps_controller." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set ELERINGDASHBOARD_TEST_NPS_CONTROLLER_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $nps_controller_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.nps_controller")));
        $nps_controller_ref01_data = null;
        if (count($nps_controller_ref01_data_raw) > 0) {
            $nps_controller_ref01_data = Helpers::to_map($nps_controller_ref01_data_raw[0][1]);
        }

        // LOAD
        $nps_controller_ref01_ent = $client->NpsController(null);
        $nps_controller_ref01_match_dt0 = [];
        $nps_controller_ref01_data_dt0_loaded = $nps_controller_ref01_ent->load($nps_controller_ref01_match_dt0, null);
        $this->assertNotNull($nps_controller_ref01_data_dt0_loaded);

    }
}

function nps_controller_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/nps_controller/NpsControllerTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = EleringDashboardSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["nps_controller01", "nps_controller02", "nps_controller03", "price01", "price02", "price03", "turnover01", "turnover02", "turnover03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("ELERINGDASHBOARD_TEST_NPS_CONTROLLER_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "ELERINGDASHBOARD_TEST_NPS_CONTROLLER_ENTID" => $idmap,
        "ELERINGDASHBOARD_TEST_LIVE" => "FALSE",
        "ELERINGDASHBOARD_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["ELERINGDASHBOARD_TEST_NPS_CONTROLLER_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["ELERINGDASHBOARD_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new EleringDashboardSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["ELERINGDASHBOARD_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["ELERINGDASHBOARD_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
