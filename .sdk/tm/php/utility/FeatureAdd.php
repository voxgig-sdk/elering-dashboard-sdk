<?php
declare(strict_types=1);

// EleringDashboard SDK utility: feature_add

class EleringDashboardFeatureAdd
{
    public static function call(EleringDashboardContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
