<?php
declare(strict_types=1);

// UmmRssFeedController entity test

require_once __DIR__ . '/../eleringdashboard_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class UmmRssFeedControllerEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = EleringDashboardSDK::test(null, null);
        $ent = $testsdk->UmmRssFeedController(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = umm_rss_feed_controller_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "umm_rss_feed_controller." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set ELERINGDASHBOARD_TEST_UMM_RSS_FEED_CONTROLLER_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $umm_rss_feed_controller_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.umm_rss_feed_controller")));
        $umm_rss_feed_controller_ref01_data = null;
        if (count($umm_rss_feed_controller_ref01_data_raw) > 0) {
            $umm_rss_feed_controller_ref01_data = Helpers::to_map($umm_rss_feed_controller_ref01_data_raw[0][1]);
        }

        // LOAD
        $umm_rss_feed_controller_ref01_ent = $client->UmmRssFeedController(null);
        $umm_rss_feed_controller_ref01_match_dt0 = [];
        [$umm_rss_feed_controller_ref01_data_dt0_loaded, $err] = $umm_rss_feed_controller_ref01_ent->load($umm_rss_feed_controller_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($umm_rss_feed_controller_ref01_data_dt0_loaded);

    }
}

function umm_rss_feed_controller_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/umm_rss_feed_controller/UmmRssFeedControllerTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = EleringDashboardSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["umm_rss_feed_controller01", "umm_rss_feed_controller02", "umm_rss_feed_controller03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("ELERINGDASHBOARD_TEST_UMM_RSS_FEED_CONTROLLER_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "ELERINGDASHBOARD_TEST_UMM_RSS_FEED_CONTROLLER_ENTID" => $idmap,
        "ELERINGDASHBOARD_TEST_LIVE" => "FALSE",
        "ELERINGDASHBOARD_TEST_EXPLAIN" => "FALSE",
        "ELERINGDASHBOARD_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["ELERINGDASHBOARD_TEST_UMM_RSS_FEED_CONTROLLER_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["ELERINGDASHBOARD_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["ELERINGDASHBOARD_APIKEY"],
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
