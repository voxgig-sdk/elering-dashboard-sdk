<?php
declare(strict_types=1);

// EleringDashboard SDK utility: result_headers

class EleringDashboardResultHeaders
{
    public static function call(EleringDashboardContext $ctx): ?EleringDashboardResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
