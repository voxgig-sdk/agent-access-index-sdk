-- Typed models for the AgentAccessIndex SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Dataset
---@field agent_can_register string
---@field agent_reports? table
---@field answer? string
---@field checked_at? string
---@field error? string
---@field family string
---@field family_title? string
---@field final_url? string
---@field fingerprint? string
---@field first_pass_gate? string
---@field front_door? table
---@field gate string
---@field gate_label? string
---@field http_status? number
---@field id string
---@field manual? table
---@field name string
---@field note? string
---@field page? string
---@field page_title? string
---@field question? string
---@field reese_account? table
---@field research? table
---@field rules_mentions? table
---@field rules_pages? table
---@field rules_quotes? table
---@field signup_url? string
---@field stepped? table
---@field tone? string

---@class DatasetListMatch
---@field agent_can_register? string
---@field agent_reports? table
---@field answer? string
---@field checked_at? string
---@field error? string
---@field family? string
---@field family_title? string
---@field final_url? string
---@field fingerprint? string
---@field first_pass_gate? string
---@field front_door? table
---@field gate? string
---@field gate_label? string
---@field http_status? number
---@field id? string
---@field manual? table
---@field name? string
---@field note? string
---@field page? string
---@field page_title? string
---@field question? string
---@field reese_account? table
---@field research? table
---@field rules_mentions? table
---@field rules_pages? table
---@field rules_quotes? table
---@field signup_url? string
---@field stepped? table
---@field tone? string

---@class IndexStat
---@field by_family? table
---@field by_gate? table
---@field note? string
---@field shelves number

---@class IndexStatLoadMatch
---@field by_family? table
---@field by_gate? table
---@field note? string
---@field shelves? number

---@class Lab
---@field before? table
---@field experiments? table
---@field updated? string

---@class LabListMatch
---@field before? table
---@field experiments? table
---@field updated? string

---@class Shelf
---@field agent_can_register string
---@field agent_reports? table
---@field answer? string
---@field checked_at? string
---@field error? string
---@field family string
---@field family_title? string
---@field final_url? string
---@field fingerprint? string
---@field first_pass_gate? string
---@field front_door? table
---@field gate string
---@field gate_label? string
---@field http_status? number
---@field id string
---@field manual? table
---@field name string
---@field note? string
---@field page? string
---@field page_title? string
---@field question? string
---@field reese_account? table
---@field research? table
---@field rules_mentions? table
---@field rules_pages? table
---@field rules_quotes? table
---@field signup_url? string
---@field stepped? table
---@field tone? string

---@class ShelfLoadMatch
---@field id string

---@class ShelfListMatch
---@field agent_can_register? string
---@field family? string

---@class Traffic
---@field ai_paths? table
---@field crawler_tokens? table
---@field daily table
---@field distinct_mcp_or_report_callers? number
---@field human_referrers? table
---@field human_src_tags? table
---@field mcp_clients? table
---@field note? string
---@field since string

---@class TrafficListMatch
---@field day? number

local M = {}

return M
