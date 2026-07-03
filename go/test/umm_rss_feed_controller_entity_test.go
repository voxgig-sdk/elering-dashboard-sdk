package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/elering-dashboard-sdk/go"
	"github.com/voxgig-sdk/elering-dashboard-sdk/go/core"

	vs "github.com/voxgig-sdk/elering-dashboard-sdk/go/utility/struct"
)

func TestUmmRssFeedControllerEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.UmmRssFeedController(nil)
		if ent == nil {
			t.Fatal("expected non-nil UmmRssFeedControllerEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := umm_rss_feed_controllerBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "umm_rss_feed_controller." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set ELERINGDASHBOARD_TEST_UMM_RSS_FEED_CONTROLLER_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		ummRssFeedControllerRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.umm_rss_feed_controller", setup.data)))
		var ummRssFeedControllerRef01Data map[string]any
		if len(ummRssFeedControllerRef01DataRaw) > 0 {
			ummRssFeedControllerRef01Data = core.ToMapAny(ummRssFeedControllerRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = ummRssFeedControllerRef01Data

		// LOAD
		ummRssFeedControllerRef01Ent := client.UmmRssFeedController(nil)
		ummRssFeedControllerRef01MatchDt0 := map[string]any{}
		ummRssFeedControllerRef01DataDt0Loaded, err := ummRssFeedControllerRef01Ent.Load(ummRssFeedControllerRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if ummRssFeedControllerRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func umm_rss_feed_controllerBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "umm_rss_feed_controller", "UmmRssFeedControllerTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read umm_rss_feed_controller test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse umm_rss_feed_controller test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"umm_rss_feed_controller01", "umm_rss_feed_controller02", "umm_rss_feed_controller03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("ELERINGDASHBOARD_TEST_UMM_RSS_FEED_CONTROLLER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ELERINGDASHBOARD_TEST_UMM_RSS_FEED_CONTROLLER_ENTID": idmap,
		"ELERINGDASHBOARD_TEST_LIVE":      "FALSE",
		"ELERINGDASHBOARD_TEST_EXPLAIN":   "FALSE",
		"ELERINGDASHBOARD_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["ELERINGDASHBOARD_TEST_UMM_RSS_FEED_CONTROLLER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["ELERINGDASHBOARD_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["ELERINGDASHBOARD_APIKEY"],
			},
			extra,
		})
		client = sdk.NewEleringDashboardSDK(core.ToMapAny(mergedOpts))
	}

	live := env["ELERINGDASHBOARD_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["ELERINGDASHBOARD_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
