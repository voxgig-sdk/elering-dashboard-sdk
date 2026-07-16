<?php
declare(strict_types=1);

// EleringDashboard SDK base feature

class EleringDashboardBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(EleringDashboardContext $ctx, array $options): void {}
    public function PostConstruct(EleringDashboardContext $ctx): void {}
    public function PostConstructEntity(EleringDashboardContext $ctx): void {}
    public function SetData(EleringDashboardContext $ctx): void {}
    public function GetData(EleringDashboardContext $ctx): void {}
    public function GetMatch(EleringDashboardContext $ctx): void {}
    public function SetMatch(EleringDashboardContext $ctx): void {}
    public function PrePoint(EleringDashboardContext $ctx): void {}
    public function PreSpec(EleringDashboardContext $ctx): void {}
    public function PreRequest(EleringDashboardContext $ctx): void {}
    public function PreResponse(EleringDashboardContext $ctx): void {}
    public function PreResult(EleringDashboardContext $ctx): void {}
    public function PreDone(EleringDashboardContext $ctx): void {}
    public function PreUnexpected(EleringDashboardContext $ctx): void {}
}
