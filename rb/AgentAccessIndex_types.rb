# frozen_string_literal: true

# Typed models for the AgentAccessIndex SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Dataset entity data model.
#
# @!attribute [rw] agent_can_register
#   @return [String]
#
# @!attribute [rw] agent_reports
#   @return [Hash, nil]
#
# @!attribute [rw] answer
#   @return [String, nil]
#
# @!attribute [rw] checked_at
#   @return [String, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] family
#   @return [String]
#
# @!attribute [rw] family_title
#   @return [String, nil]
#
# @!attribute [rw] final_url
#   @return [String, nil]
#
# @!attribute [rw] fingerprint
#   @return [String, nil]
#
# @!attribute [rw] first_pass_gate
#   @return [String, nil]
#
# @!attribute [rw] front_door
#   @return [Hash, nil]
#
# @!attribute [rw] gate
#   @return [String]
#
# @!attribute [rw] gate_label
#   @return [String, nil]
#
# @!attribute [rw] http_status
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] manual
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] note
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [String, nil]
#
# @!attribute [rw] page_title
#   @return [String, nil]
#
# @!attribute [rw] question
#   @return [String, nil]
#
# @!attribute [rw] reese_account
#   @return [Hash, nil]
#
# @!attribute [rw] research
#   @return [Hash, nil]
#
# @!attribute [rw] rules_mentions
#   @return [Hash, nil]
#
# @!attribute [rw] rules_pages
#   @return [Array, nil]
#
# @!attribute [rw] rules_quotes
#   @return [Array, nil]
#
# @!attribute [rw] signup_url
#   @return [String, nil]
#
# @!attribute [rw] stepped
#   @return [Array, nil]
#
# @!attribute [rw] tone
#   @return [String, nil]
Dataset = Struct.new(
  :agent_can_register,
  :agent_reports,
  :answer,
  :checked_at,
  :error,
  :family,
  :family_title,
  :final_url,
  :fingerprint,
  :first_pass_gate,
  :front_door,
  :gate,
  :gate_label,
  :http_status,
  :id,
  :manual,
  :name,
  :note,
  :page,
  :page_title,
  :question,
  :reese_account,
  :research,
  :rules_mentions,
  :rules_pages,
  :rules_quotes,
  :signup_url,
  :stepped,
  :tone,
  keyword_init: true
)

# Request payload for Dataset#list.
#
# @!attribute [rw] agent_can_register
#   @return [String, nil]
#
# @!attribute [rw] agent_reports
#   @return [Hash, nil]
#
# @!attribute [rw] answer
#   @return [String, nil]
#
# @!attribute [rw] checked_at
#   @return [String, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] family
#   @return [String, nil]
#
# @!attribute [rw] family_title
#   @return [String, nil]
#
# @!attribute [rw] final_url
#   @return [String, nil]
#
# @!attribute [rw] fingerprint
#   @return [String, nil]
#
# @!attribute [rw] first_pass_gate
#   @return [String, nil]
#
# @!attribute [rw] front_door
#   @return [Hash, nil]
#
# @!attribute [rw] gate
#   @return [String, nil]
#
# @!attribute [rw] gate_label
#   @return [String, nil]
#
# @!attribute [rw] http_status
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] manual
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] note
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [String, nil]
#
# @!attribute [rw] page_title
#   @return [String, nil]
#
# @!attribute [rw] question
#   @return [String, nil]
#
# @!attribute [rw] reese_account
#   @return [Hash, nil]
#
# @!attribute [rw] research
#   @return [Hash, nil]
#
# @!attribute [rw] rules_mentions
#   @return [Hash, nil]
#
# @!attribute [rw] rules_pages
#   @return [Array, nil]
#
# @!attribute [rw] rules_quotes
#   @return [Array, nil]
#
# @!attribute [rw] signup_url
#   @return [String, nil]
#
# @!attribute [rw] stepped
#   @return [Array, nil]
#
# @!attribute [rw] tone
#   @return [String, nil]
DatasetListMatch = Struct.new(
  :agent_can_register,
  :agent_reports,
  :answer,
  :checked_at,
  :error,
  :family,
  :family_title,
  :final_url,
  :fingerprint,
  :first_pass_gate,
  :front_door,
  :gate,
  :gate_label,
  :http_status,
  :id,
  :manual,
  :name,
  :note,
  :page,
  :page_title,
  :question,
  :reese_account,
  :research,
  :rules_mentions,
  :rules_pages,
  :rules_quotes,
  :signup_url,
  :stepped,
  :tone,
  keyword_init: true
)

# IndexStat entity data model.
#
# @!attribute [rw] by_family
#   @return [Hash, nil]
#
# @!attribute [rw] by_gate
#   @return [Hash, nil]
#
# @!attribute [rw] note
#   @return [String, nil]
#
# @!attribute [rw] shelves
#   @return [Integer]
IndexStat = Struct.new(
  :by_family,
  :by_gate,
  :note,
  :shelves,
  keyword_init: true
)

# Request payload for IndexStat#load.
#
# @!attribute [rw] by_family
#   @return [Hash, nil]
#
# @!attribute [rw] by_gate
#   @return [Hash, nil]
#
# @!attribute [rw] note
#   @return [String, nil]
#
# @!attribute [rw] shelves
#   @return [Integer, nil]
IndexStatLoadMatch = Struct.new(
  :by_family,
  :by_gate,
  :note,
  :shelves,
  keyword_init: true
)

# Lab entity data model.
#
# @!attribute [rw] before
#   @return [Array, nil]
#
# @!attribute [rw] experiments
#   @return [Array, nil]
#
# @!attribute [rw] updated
#   @return [String, nil]
Lab = Struct.new(
  :before,
  :experiments,
  :updated,
  keyword_init: true
)

# Request payload for Lab#list.
#
# @!attribute [rw] before
#   @return [Array, nil]
#
# @!attribute [rw] experiments
#   @return [Array, nil]
#
# @!attribute [rw] updated
#   @return [String, nil]
LabListMatch = Struct.new(
  :before,
  :experiments,
  :updated,
  keyword_init: true
)

# Shelf entity data model.
#
# @!attribute [rw] agent_can_register
#   @return [String]
#
# @!attribute [rw] agent_reports
#   @return [Hash, nil]
#
# @!attribute [rw] answer
#   @return [String, nil]
#
# @!attribute [rw] checked_at
#   @return [String, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] family
#   @return [String]
#
# @!attribute [rw] family_title
#   @return [String, nil]
#
# @!attribute [rw] final_url
#   @return [String, nil]
#
# @!attribute [rw] fingerprint
#   @return [String, nil]
#
# @!attribute [rw] first_pass_gate
#   @return [String, nil]
#
# @!attribute [rw] front_door
#   @return [Hash, nil]
#
# @!attribute [rw] gate
#   @return [String]
#
# @!attribute [rw] gate_label
#   @return [String, nil]
#
# @!attribute [rw] http_status
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] manual
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] note
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [String, nil]
#
# @!attribute [rw] page_title
#   @return [String, nil]
#
# @!attribute [rw] question
#   @return [String, nil]
#
# @!attribute [rw] reese_account
#   @return [Hash, nil]
#
# @!attribute [rw] research
#   @return [Hash, nil]
#
# @!attribute [rw] rules_mentions
#   @return [Hash, nil]
#
# @!attribute [rw] rules_pages
#   @return [Array, nil]
#
# @!attribute [rw] rules_quotes
#   @return [Array, nil]
#
# @!attribute [rw] signup_url
#   @return [String, nil]
#
# @!attribute [rw] stepped
#   @return [Array, nil]
#
# @!attribute [rw] tone
#   @return [String, nil]
Shelf = Struct.new(
  :agent_can_register,
  :agent_reports,
  :answer,
  :checked_at,
  :error,
  :family,
  :family_title,
  :final_url,
  :fingerprint,
  :first_pass_gate,
  :front_door,
  :gate,
  :gate_label,
  :http_status,
  :id,
  :manual,
  :name,
  :note,
  :page,
  :page_title,
  :question,
  :reese_account,
  :research,
  :rules_mentions,
  :rules_pages,
  :rules_quotes,
  :signup_url,
  :stepped,
  :tone,
  keyword_init: true
)

# Request payload for Shelf#load.
#
# @!attribute [rw] id
#   @return [String]
ShelfLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Shelf#list.
#
# @!attribute [rw] agent_can_register
#   @return [String, nil]
#
# @!attribute [rw] family
#   @return [String, nil]
ShelfListMatch = Struct.new(
  :agent_can_register,
  :family,
  keyword_init: true
)

# Traffic entity data model.
#
# @!attribute [rw] ai_paths
#   @return [Array, nil]
#
# @!attribute [rw] crawler_tokens
#   @return [Array, nil]
#
# @!attribute [rw] daily
#   @return [Array]
#
# @!attribute [rw] distinct_mcp_or_report_callers
#   @return [Integer, nil]
#
# @!attribute [rw] human_referrers
#   @return [Array, nil]
#
# @!attribute [rw] human_src_tags
#   @return [Array, nil]
#
# @!attribute [rw] mcp_clients
#   @return [Array, nil]
#
# @!attribute [rw] note
#   @return [String, nil]
#
# @!attribute [rw] since
#   @return [String]
Traffic = Struct.new(
  :ai_paths,
  :crawler_tokens,
  :daily,
  :distinct_mcp_or_report_callers,
  :human_referrers,
  :human_src_tags,
  :mcp_clients,
  :note,
  :since,
  keyword_init: true
)

# Request payload for Traffic#list.
#
# @!attribute [rw] day
#   @return [Integer, nil]
TrafficListMatch = Struct.new(
  :day,
  keyword_init: true
)

