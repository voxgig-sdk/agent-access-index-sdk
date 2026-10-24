<?php
declare(strict_types=1);

// Typed models for the AgentAccessIndex SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Dataset entity data model. */
class Dataset
{
    public string $agent_can_register;
    public ?array $agent_reports = null;
    public ?string $answer = null;
    public ?string $checked_at = null;
    public ?string $error = null;
    public string $family;
    public ?string $family_title = null;
    public ?string $final_url = null;
    public ?string $fingerprint = null;
    public ?string $first_pass_gate = null;
    public ?array $front_door = null;
    public string $gate;
    public ?string $gate_label = null;
    public ?int $http_status = null;
    public string $id;
    public ?array $manual = null;
    public string $name;
    public ?string $note = null;
    public ?string $page = null;
    public ?string $page_title = null;
    public ?string $question = null;
    public ?array $reese_account = null;
    public ?array $research = null;
    public ?array $rules_mentions = null;
    public ?array $rules_pages = null;
    public ?array $rules_quotes = null;
    public ?string $signup_url = null;
    public ?array $stepped = null;
    public ?string $tone = null;
}

/** Request payload for Dataset#list. */
class DatasetListMatch
{
    public ?string $agent_can_register = null;
    public ?array $agent_reports = null;
    public ?string $answer = null;
    public ?string $checked_at = null;
    public ?string $error = null;
    public ?string $family = null;
    public ?string $family_title = null;
    public ?string $final_url = null;
    public ?string $fingerprint = null;
    public ?string $first_pass_gate = null;
    public ?array $front_door = null;
    public ?string $gate = null;
    public ?string $gate_label = null;
    public ?int $http_status = null;
    public ?string $id = null;
    public ?array $manual = null;
    public ?string $name = null;
    public ?string $note = null;
    public ?string $page = null;
    public ?string $page_title = null;
    public ?string $question = null;
    public ?array $reese_account = null;
    public ?array $research = null;
    public ?array $rules_mentions = null;
    public ?array $rules_pages = null;
    public ?array $rules_quotes = null;
    public ?string $signup_url = null;
    public ?array $stepped = null;
    public ?string $tone = null;
}

/** IndexStat entity data model. */
class IndexStat
{
    public ?array $by_family = null;
    public ?array $by_gate = null;
    public ?string $note = null;
    public int $shelves;
}

/** Request payload for IndexStat#load. */
class IndexStatLoadMatch
{
    public ?array $by_family = null;
    public ?array $by_gate = null;
    public ?string $note = null;
    public ?int $shelves = null;
}

/** Lab entity data model. */
class Lab
{
    public ?array $before = null;
    public ?array $experiments = null;
    public ?string $updated = null;
}

/** Request payload for Lab#list. */
class LabListMatch
{
    public ?array $before = null;
    public ?array $experiments = null;
    public ?string $updated = null;
}

/** Shelf entity data model. */
class Shelf
{
    public string $agent_can_register;
    public ?array $agent_reports = null;
    public ?string $answer = null;
    public ?string $checked_at = null;
    public ?string $error = null;
    public string $family;
    public ?string $family_title = null;
    public ?string $final_url = null;
    public ?string $fingerprint = null;
    public ?string $first_pass_gate = null;
    public ?array $front_door = null;
    public string $gate;
    public ?string $gate_label = null;
    public ?int $http_status = null;
    public string $id;
    public ?array $manual = null;
    public string $name;
    public ?string $note = null;
    public ?string $page = null;
    public ?string $page_title = null;
    public ?string $question = null;
    public ?array $reese_account = null;
    public ?array $research = null;
    public ?array $rules_mentions = null;
    public ?array $rules_pages = null;
    public ?array $rules_quotes = null;
    public ?string $signup_url = null;
    public ?array $stepped = null;
    public ?string $tone = null;
}

/** Request payload for Shelf#load. */
class ShelfLoadMatch
{
    public string $id;
}

/** Request payload for Shelf#list. */
class ShelfListMatch
{
    public ?string $agent_can_register = null;
    public ?string $family = null;
}

/** Traffic entity data model. */
class Traffic
{
    public ?array $ai_paths = null;
    public ?array $crawler_tokens = null;
    public array $daily;
    public ?int $distinct_mcp_or_report_callers = null;
    public ?array $human_referrers = null;
    public ?array $human_src_tags = null;
    public ?array $mcp_clients = null;
    public ?string $note = null;
    public string $since;
}

/** Request payload for Traffic#list. */
class TrafficListMatch
{
    public ?int $day = null;
}

