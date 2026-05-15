<?php
declare(strict_types=1);

// EleringDashboard SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

class EleringDashboardSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new EleringDashboardUtility();
        $this->_utility = $utility;

        $config = EleringDashboardConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features from config.
        $feature_opts = EleringDashboardHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = EleringDashboardHelpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, EleringDashboardFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return EleringDashboardUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): array
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = EleringDashboardHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = EleringDashboardHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = EleringDashboardHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new EleringDashboardSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return [null, $err];
        }

        return ($utility->make_fetch_def)($ctx);
    }

    public function direct(array $fetchargs = []): array
    {
        $utility = $this->_utility;

        [$fetchdef, $err] = $this->prepare($fetchargs);
        if ($err) {
            return [["ok" => false, "err" => $err], null];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = EleringDashboardHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return [["ok" => false, "err" => $fetch_err], null];
        }

        if ($fetched === null) {
            return [[
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ], null];
        }

        if (is_array($fetched)) {
            $status = EleringDashboardHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [[
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ], null];
        }

        return [[
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ], null];
    }


    public function Balance($data = null)
    {
        require_once __DIR__ . '/entity/balance_entity.php';
        return new BalanceEntity($this, $data);
    }


    public function BalanceController($data = null)
    {
        require_once __DIR__ . '/entity/balance_controller_entity.php';
        return new BalanceControllerEntity($this, $data);
    }


    public function Firm($data = null)
    {
        require_once __DIR__ . '/entity/firm_entity.php';
        return new FirmEntity($this, $data);
    }


    public function FirmCapacityController($data = null)
    {
        require_once __DIR__ . '/entity/firm_capacity_controller_entity.php';
        return new FirmCapacityControllerEntity($this, $data);
    }


    public function GasBalanceController($data = null)
    {
        require_once __DIR__ . '/entity/gas_balance_controller_entity.php';
        return new GasBalanceControllerEntity($this, $data);
    }


    public function GasBorderTradeController($data = null)
    {
        require_once __DIR__ . '/entity/gas_border_trade_controller_entity.php';
        return new GasBorderTradeControllerEntity($this, $data);
    }


    public function GasSystem($data = null)
    {
        require_once __DIR__ . '/entity/gas_system_entity.php';
        return new GasSystemEntity($this, $data);
    }


    public function GasSystemController($data = null)
    {
        require_once __DIR__ . '/entity/gas_system_controller_entity.php';
        return new GasSystemControllerEntity($this, $data);
    }


    public function GasTrade($data = null)
    {
        require_once __DIR__ . '/entity/gas_trade_entity.php';
        return new GasTradeEntity($this, $data);
    }


    public function GasTradeController($data = null)
    {
        require_once __DIR__ . '/entity/gas_trade_controller_entity.php';
        return new GasTradeControllerEntity($this, $data);
    }


    public function GasTransmissionController($data = null)
    {
        require_once __DIR__ . '/entity/gas_transmission_controller_entity.php';
        return new GasTransmissionControllerEntity($this, $data);
    }


    public function GreenController($data = null)
    {
        require_once __DIR__ . '/entity/green_controller_entity.php';
        return new GreenControllerEntity($this, $data);
    }


    public function Interruptible($data = null)
    {
        require_once __DIR__ . '/entity/interruptible_entity.php';
        return new InterruptibleEntity($this, $data);
    }


    public function InterruptibleCapacityController($data = null)
    {
        require_once __DIR__ . '/entity/interruptible_capacity_controller_entity.php';
        return new InterruptibleCapacityControllerEntity($this, $data);
    }


    public function Nomination($data = null)
    {
        require_once __DIR__ . '/entity/nomination_entity.php';
        return new NominationEntity($this, $data);
    }


    public function NominationsController($data = null)
    {
        require_once __DIR__ . '/entity/nominations_controller_entity.php';
        return new NominationsControllerEntity($this, $data);
    }


    public function NpsController($data = null)
    {
        require_once __DIR__ . '/entity/nps_controller_entity.php';
        return new NpsControllerEntity($this, $data);
    }


    public function Renomination($data = null)
    {
        require_once __DIR__ . '/entity/renomination_entity.php';
        return new RenominationEntity($this, $data);
    }


    public function RenominationsController($data = null)
    {
        require_once __DIR__ . '/entity/renominations_controller_entity.php';
        return new RenominationsControllerEntity($this, $data);
    }


    public function System($data = null)
    {
        require_once __DIR__ . '/entity/system_entity.php';
        return new SystemEntity($this, $data);
    }


    public function SystemController($data = null)
    {
        require_once __DIR__ . '/entity/system_controller_entity.php';
        return new SystemControllerEntity($this, $data);
    }


    public function TransmissionController($data = null)
    {
        require_once __DIR__ . '/entity/transmission_controller_entity.php';
        return new TransmissionControllerEntity($this, $data);
    }


    public function UmmGasController($data = null)
    {
        require_once __DIR__ . '/entity/umm_gas_controller_entity.php';
        return new UmmGasControllerEntity($this, $data);
    }


    public function UmmRssFeedController($data = null)
    {
        require_once __DIR__ . '/entity/umm_rss_feed_controller_entity.php';
        return new UmmRssFeedControllerEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new EleringDashboardSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
