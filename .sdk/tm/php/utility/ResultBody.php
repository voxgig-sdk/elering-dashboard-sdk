<?php
declare(strict_types=1);

// EleringDashboard SDK utility: result_body

class EleringDashboardResultBody
{
    public static function call(EleringDashboardContext $ctx): ?EleringDashboardResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
