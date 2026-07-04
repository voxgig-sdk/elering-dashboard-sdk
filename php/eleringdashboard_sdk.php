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

    public function prepare(array $fetchargs = []): mixed
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
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
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
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
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

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_balance = null;

    // Canonical facade: $client->Balance()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->balance()
    // resolves here too.
    public function Balance($data = null)
    {
        require_once __DIR__ . '/entity/balance_entity.php';
        if ($data === null) {
            if ($this->_balance === null) {
                $this->_balance = new BalanceEntity($this, null);
            }
            return $this->_balance;
        }
        return new BalanceEntity($this, $data);
    }


    private $_balance_controller = null;

    // Canonical facade: $client->BalanceController()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->balance_controller()
    // resolves here too.
    public function BalanceController($data = null)
    {
        require_once __DIR__ . '/entity/balance_controller_entity.php';
        if ($data === null) {
            if ($this->_balance_controller === null) {
                $this->_balance_controller = new BalanceControllerEntity($this, null);
            }
            return $this->_balance_controller;
        }
        return new BalanceControllerEntity($this, $data);
    }


    private $_firm = null;

    // Canonical facade: $client->Firm()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->firm()
    // resolves here too.
    public function Firm($data = null)
    {
        require_once __DIR__ . '/entity/firm_entity.php';
        if ($data === null) {
            if ($this->_firm === null) {
                $this->_firm = new FirmEntity($this, null);
            }
            return $this->_firm;
        }
        return new FirmEntity($this, $data);
    }


    private $_firm_capacity_controller = null;

    // Canonical facade: $client->FirmCapacityController()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->firm_capacity_controller()
    // resolves here too.
    public function FirmCapacityController($data = null)
    {
        require_once __DIR__ . '/entity/firm_capacity_controller_entity.php';
        if ($data === null) {
            if ($this->_firm_capacity_controller === null) {
                $this->_firm_capacity_controller = new FirmCapacityControllerEntity($this, null);
            }
            return $this->_firm_capacity_controller;
        }
        return new FirmCapacityControllerEntity($this, $data);
    }


    private $_gas_balance_controller = null;

    // Canonical facade: $client->GasBalanceController()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->gas_balance_controller()
    // resolves here too.
    public function GasBalanceController($data = null)
    {
        require_once __DIR__ . '/entity/gas_balance_controller_entity.php';
        if ($data === null) {
            if ($this->_gas_balance_controller === null) {
                $this->_gas_balance_controller = new GasBalanceControllerEntity($this, null);
            }
            return $this->_gas_balance_controller;
        }
        return new GasBalanceControllerEntity($this, $data);
    }


    private $_gas_border_trade_controller = null;

    // Canonical facade: $client->GasBorderTradeController()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->gas_border_trade_controller()
    // resolves here too.
    public function GasBorderTradeController($data = null)
    {
        require_once __DIR__ . '/entity/gas_border_trade_controller_entity.php';
        if ($data === null) {
            if ($this->_gas_border_trade_controller === null) {
                $this->_gas_border_trade_controller = new GasBorderTradeControllerEntity($this, null);
            }
            return $this->_gas_border_trade_controller;
        }
        return new GasBorderTradeControllerEntity($this, $data);
    }


    private $_gas_system = null;

    // Canonical facade: $client->GasSystem()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->gas_system()
    // resolves here too.
    public function GasSystem($data = null)
    {
        require_once __DIR__ . '/entity/gas_system_entity.php';
        if ($data === null) {
            if ($this->_gas_system === null) {
                $this->_gas_system = new GasSystemEntity($this, null);
            }
            return $this->_gas_system;
        }
        return new GasSystemEntity($this, $data);
    }


    private $_gas_system_controller = null;

    // Canonical facade: $client->GasSystemController()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->gas_system_controller()
    // resolves here too.
    public function GasSystemController($data = null)
    {
        require_once __DIR__ . '/entity/gas_system_controller_entity.php';
        if ($data === null) {
            if ($this->_gas_system_controller === null) {
                $this->_gas_system_controller = new GasSystemControllerEntity($this, null);
            }
            return $this->_gas_system_controller;
        }
        return new GasSystemControllerEntity($this, $data);
    }


    private $_gas_trade = null;

    // Canonical facade: $client->GasTrade()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->gas_trade()
    // resolves here too.
    public function GasTrade($data = null)
    {
        require_once __DIR__ . '/entity/gas_trade_entity.php';
        if ($data === null) {
            if ($this->_gas_trade === null) {
                $this->_gas_trade = new GasTradeEntity($this, null);
            }
            return $this->_gas_trade;
        }
        return new GasTradeEntity($this, $data);
    }


    private $_gas_trade_controller = null;

    // Canonical facade: $client->GasTradeController()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->gas_trade_controller()
    // resolves here too.
    public function GasTradeController($data = null)
    {
        require_once __DIR__ . '/entity/gas_trade_controller_entity.php';
        if ($data === null) {
            if ($this->_gas_trade_controller === null) {
                $this->_gas_trade_controller = new GasTradeControllerEntity($this, null);
            }
            return $this->_gas_trade_controller;
        }
        return new GasTradeControllerEntity($this, $data);
    }


    private $_gas_transmission_controller = null;

    // Canonical facade: $client->GasTransmissionController()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->gas_transmission_controller()
    // resolves here too.
    public function GasTransmissionController($data = null)
    {
        require_once __DIR__ . '/entity/gas_transmission_controller_entity.php';
        if ($data === null) {
            if ($this->_gas_transmission_controller === null) {
                $this->_gas_transmission_controller = new GasTransmissionControllerEntity($this, null);
            }
            return $this->_gas_transmission_controller;
        }
        return new GasTransmissionControllerEntity($this, $data);
    }


    private $_green_controller = null;

    // Canonical facade: $client->GreenController()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->green_controller()
    // resolves here too.
    public function GreenController($data = null)
    {
        require_once __DIR__ . '/entity/green_controller_entity.php';
        if ($data === null) {
            if ($this->_green_controller === null) {
                $this->_green_controller = new GreenControllerEntity($this, null);
            }
            return $this->_green_controller;
        }
        return new GreenControllerEntity($this, $data);
    }


    private $_interruptible = null;

    // Canonical facade: $client->Interruptible()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->interruptible()
    // resolves here too.
    public function Interruptible($data = null)
    {
        require_once __DIR__ . '/entity/interruptible_entity.php';
        if ($data === null) {
            if ($this->_interruptible === null) {
                $this->_interruptible = new InterruptibleEntity($this, null);
            }
            return $this->_interruptible;
        }
        return new InterruptibleEntity($this, $data);
    }


    private $_interruptible_capacity_controller = null;

    // Canonical facade: $client->InterruptibleCapacityController()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->interruptible_capacity_controller()
    // resolves here too.
    public function InterruptibleCapacityController($data = null)
    {
        require_once __DIR__ . '/entity/interruptible_capacity_controller_entity.php';
        if ($data === null) {
            if ($this->_interruptible_capacity_controller === null) {
                $this->_interruptible_capacity_controller = new InterruptibleCapacityControllerEntity($this, null);
            }
            return $this->_interruptible_capacity_controller;
        }
        return new InterruptibleCapacityControllerEntity($this, $data);
    }


    private $_nomination = null;

    // Canonical facade: $client->Nomination()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->nomination()
    // resolves here too.
    public function Nomination($data = null)
    {
        require_once __DIR__ . '/entity/nomination_entity.php';
        if ($data === null) {
            if ($this->_nomination === null) {
                $this->_nomination = new NominationEntity($this, null);
            }
            return $this->_nomination;
        }
        return new NominationEntity($this, $data);
    }


    private $_nominations_controller = null;

    // Canonical facade: $client->NominationsController()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->nominations_controller()
    // resolves here too.
    public function NominationsController($data = null)
    {
        require_once __DIR__ . '/entity/nominations_controller_entity.php';
        if ($data === null) {
            if ($this->_nominations_controller === null) {
                $this->_nominations_controller = new NominationsControllerEntity($this, null);
            }
            return $this->_nominations_controller;
        }
        return new NominationsControllerEntity($this, $data);
    }


    private $_nps_controller = null;

    // Canonical facade: $client->NpsController()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->nps_controller()
    // resolves here too.
    public function NpsController($data = null)
    {
        require_once __DIR__ . '/entity/nps_controller_entity.php';
        if ($data === null) {
            if ($this->_nps_controller === null) {
                $this->_nps_controller = new NpsControllerEntity($this, null);
            }
            return $this->_nps_controller;
        }
        return new NpsControllerEntity($this, $data);
    }


    private $_renomination = null;

    // Canonical facade: $client->Renomination()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->renomination()
    // resolves here too.
    public function Renomination($data = null)
    {
        require_once __DIR__ . '/entity/renomination_entity.php';
        if ($data === null) {
            if ($this->_renomination === null) {
                $this->_renomination = new RenominationEntity($this, null);
            }
            return $this->_renomination;
        }
        return new RenominationEntity($this, $data);
    }


    private $_renominations_controller = null;

    // Canonical facade: $client->RenominationsController()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->renominations_controller()
    // resolves here too.
    public function RenominationsController($data = null)
    {
        require_once __DIR__ . '/entity/renominations_controller_entity.php';
        if ($data === null) {
            if ($this->_renominations_controller === null) {
                $this->_renominations_controller = new RenominationsControllerEntity($this, null);
            }
            return $this->_renominations_controller;
        }
        return new RenominationsControllerEntity($this, $data);
    }


    private $_system = null;

    // Canonical facade: $client->System()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->system()
    // resolves here too.
    public function System($data = null)
    {
        require_once __DIR__ . '/entity/system_entity.php';
        if ($data === null) {
            if ($this->_system === null) {
                $this->_system = new SystemEntity($this, null);
            }
            return $this->_system;
        }
        return new SystemEntity($this, $data);
    }


    private $_system_controller = null;

    // Canonical facade: $client->SystemController()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->system_controller()
    // resolves here too.
    public function SystemController($data = null)
    {
        require_once __DIR__ . '/entity/system_controller_entity.php';
        if ($data === null) {
            if ($this->_system_controller === null) {
                $this->_system_controller = new SystemControllerEntity($this, null);
            }
            return $this->_system_controller;
        }
        return new SystemControllerEntity($this, $data);
    }


    private $_transmission_controller = null;

    // Canonical facade: $client->TransmissionController()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->transmission_controller()
    // resolves here too.
    public function TransmissionController($data = null)
    {
        require_once __DIR__ . '/entity/transmission_controller_entity.php';
        if ($data === null) {
            if ($this->_transmission_controller === null) {
                $this->_transmission_controller = new TransmissionControllerEntity($this, null);
            }
            return $this->_transmission_controller;
        }
        return new TransmissionControllerEntity($this, $data);
    }


    private $_umm_gas_controller = null;

    // Canonical facade: $client->UmmGasController()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->umm_gas_controller()
    // resolves here too.
    public function UmmGasController($data = null)
    {
        require_once __DIR__ . '/entity/umm_gas_controller_entity.php';
        if ($data === null) {
            if ($this->_umm_gas_controller === null) {
                $this->_umm_gas_controller = new UmmGasControllerEntity($this, null);
            }
            return $this->_umm_gas_controller;
        }
        return new UmmGasControllerEntity($this, $data);
    }


    private $_umm_rss_feed_controller = null;

    // Canonical facade: $client->UmmRssFeedController()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->umm_rss_feed_controller()
    // resolves here too.
    public function UmmRssFeedController($data = null)
    {
        require_once __DIR__ . '/entity/umm_rss_feed_controller_entity.php';
        if ($data === null) {
            if ($this->_umm_rss_feed_controller === null) {
                $this->_umm_rss_feed_controller = new UmmRssFeedControllerEntity($this, null);
            }
            return $this->_umm_rss_feed_controller;
        }
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
