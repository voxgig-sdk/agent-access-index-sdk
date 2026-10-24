<?php
declare(strict_types=1);

// AgentAccessIndex SDK utility: result_headers

class AgentAccessIndexResultHeaders
{
    public static function call(AgentAccessIndexContext $ctx): ?AgentAccessIndexResult
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
