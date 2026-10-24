# Typed models for the AgentAccessIndex SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class DatasetRequired(TypedDict):
    agent_can_register: str
    family: str
    gate: str
    id: str
    name: str


class Dataset(DatasetRequired, total=False):
    agent_reports: dict
    answer: str
    checked_at: str
    error: str
    family_title: str
    final_url: str
    fingerprint: str
    first_pass_gate: str
    front_door: dict
    gate_label: str
    http_status: int
    manual: dict
    note: str
    page: str
    page_title: str
    question: str
    reese_account: dict
    research: dict
    rules_mentions: dict
    rules_pages: list
    rules_quotes: list
    signup_url: str
    stepped: list
    tone: str


class DatasetListMatch(TypedDict, total=False):
    agent_can_register: str
    agent_reports: dict
    answer: str
    checked_at: str
    error: str
    family: str
    family_title: str
    final_url: str
    fingerprint: str
    first_pass_gate: str
    front_door: dict
    gate: str
    gate_label: str
    http_status: int
    id: str
    manual: dict
    name: str
    note: str
    page: str
    page_title: str
    question: str
    reese_account: dict
    research: dict
    rules_mentions: dict
    rules_pages: list
    rules_quotes: list
    signup_url: str
    stepped: list
    tone: str


class IndexStatRequired(TypedDict):
    shelves: int


class IndexStat(IndexStatRequired, total=False):
    by_family: dict
    by_gate: dict
    note: str


class IndexStatLoadMatch(TypedDict, total=False):
    by_family: dict
    by_gate: dict
    note: str
    shelves: int


class Lab(TypedDict, total=False):
    before: list
    experiments: list
    updated: str


class LabListMatch(TypedDict, total=False):
    before: list
    experiments: list
    updated: str


class ShelfRequired(TypedDict):
    agent_can_register: str
    family: str
    gate: str
    id: str
    name: str


class Shelf(ShelfRequired, total=False):
    agent_reports: dict
    answer: str
    checked_at: str
    error: str
    family_title: str
    final_url: str
    fingerprint: str
    first_pass_gate: str
    front_door: dict
    gate_label: str
    http_status: int
    manual: dict
    note: str
    page: str
    page_title: str
    question: str
    reese_account: dict
    research: dict
    rules_mentions: dict
    rules_pages: list
    rules_quotes: list
    signup_url: str
    stepped: list
    tone: str


class ShelfLoadMatch(TypedDict):
    id: str


class ShelfListMatch(TypedDict, total=False):
    agent_can_register: str
    family: str


class TrafficRequired(TypedDict):
    daily: list
    since: str


class Traffic(TrafficRequired, total=False):
    ai_paths: list
    crawler_tokens: list
    distinct_mcp_or_report_callers: int
    human_referrers: list
    human_src_tags: list
    mcp_clients: list
    note: str


class TrafficListMatch(TypedDict, total=False):
    day: int
