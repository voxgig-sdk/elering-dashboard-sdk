<?php
declare(strict_types=1);

// EleringDashboard SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class EleringDashboardFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new EleringDashboardBaseFeature();
            case "test":
                return new EleringDashboardTestFeature();
            default:
                return new EleringDashboardBaseFeature();
        }
    }
}
