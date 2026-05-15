<?php
declare(strict_types=1);

// EleringDashboard SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class EleringDashboardMakeContext
{
    public static function call(array $ctxmap, ?EleringDashboardContext $basectx): EleringDashboardContext
    {
        return new EleringDashboardContext($ctxmap, $basectx);
    }
}
