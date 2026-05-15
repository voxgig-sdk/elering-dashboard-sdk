<?php
declare(strict_types=1);

// EleringDashboard SDK utility: prepare_body

class EleringDashboardPrepareBody
{
    public static function call(EleringDashboardContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
