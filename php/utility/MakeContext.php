<?php
declare(strict_types=1);

// AgentAccessIndex SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class AgentAccessIndexMakeContext
{
    public static function call(array $ctxmap, ?AgentAccessIndexContext $basectx): AgentAccessIndexContext
    {
        return new AgentAccessIndexContext($ctxmap, $basectx);
    }
}
