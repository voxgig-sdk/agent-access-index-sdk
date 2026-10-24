-- AgentAccessIndex SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "AgentAccessIndex",
      slug = "agent-access-index",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["now"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://agentaccess.lastminutedealshq.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["dataset"] = {},
        ["index_stat"] = {},
        ["lab"] = {},
        ["shelf"] = {},
        ["traffic"] = {},
      },
    },
    entity = {
      ["dataset"] = {
        ["fields"] = {
          {
            ["name"] = "agent_can_register",
            ["title"] = "Agent Can Register",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Verdict on whether an AI agent can register.",
          },
          {
            ["name"] = "agent_reports",
            ["title"] = "Agent Reports",
            ["type"] = "`$OBJECT`",
            ["short"] = "Agent-reported outcomes (unverified, shown next to the measurement).",
          },
          {
            ["name"] = "answer",
            ["title"] = "Answer",
            ["type"] = "`$STRING`",
            ["short"] = "Plain-English answer.",
          },
          {
            ["name"] = "checked_at",
            ["title"] = "Checked At",
            ["type"] = "`$STRING`",
            ["short"] = "Date of the census check (YYYY-MM-DD).",
            ["format"] = "date",
          },
          {
            ["name"] = "error",
            ["title"] = "Error",
            ["type"] = "`$STRING`",
            ["short"] = "Census error for this platform; null in every probed record (type unverified).",
          },
          {
            ["name"] = "family",
            ["title"] = "Family",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Platform family.",
          },
          {
            ["name"] = "family_title",
            ["title"] = "Family Title",
            ["type"] = "`$STRING`",
            ["short"] = "Human-readable family title.",
          },
          {
            ["name"] = "final_url",
            ["title"] = "Final Url",
            ["type"] = "`$STRING`",
            ["short"] = "URL reached after redirects; null when unreachable.",
          },
          {
            ["name"] = "fingerprint",
            ["title"] = "Fingerprint",
            ["type"] = "`$STRING`",
            ["short"] = "Browser fingerprint used on a re-check.",
          },
          {
            ["name"] = "first_pass_gate",
            ["title"] = "First Pass Gate",
            ["type"] = "`$STRING`",
            ["short"] = "Gate measured on the first pass, before a re-check.",
          },
          {
            ["name"] = "front_door",
            ["title"] = "Front Door",
            ["type"] = "`$OBJECT`",
            ["short"] = "What the census saw on the sign-up page.",
          },
          {
            ["name"] = "gate",
            ["title"] = "Gate",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Measured sign-up gate code, e.g.",
          },
          {
            ["name"] = "gate_label",
            ["title"] = "Gate Label",
            ["type"] = "`$STRING`",
            ["short"] = "Human-readable gate description.",
          },
          {
            ["name"] = "http_status",
            ["title"] = "Http Status",
            ["type"] = "`$INTEGER`",
            ["short"] = "HTTP status of the sign-up page; null when unreachable.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Platform (shelf) id, e.g.",
          },
          {
            ["name"] = "manual",
            ["title"] = "Manual",
            ["type"] = "`$OBJECT`",
            ["short"] = "Manual override note.",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Platform name.",
          },
          {
            ["name"] = "note",
            ["title"] = "Note",
            ["type"] = "`$STRING`",
            ["short"] = "Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof.",
          },
          {
            ["name"] = "page",
            ["title"] = "Page",
            ["type"] = "`$STRING`",
            ["short"] = "Site path of the platform page, e.g.",
          },
          {
            ["name"] = "page_title",
            ["title"] = "Page Title",
            ["type"] = "`$STRING`",
            ["short"] = "Title of the sign-up page; null when unreachable.",
          },
          {
            ["name"] = "question",
            ["title"] = "Question",
            ["type"] = "`$STRING`",
            ["short"] = "The question answered, e.g.",
          },
          {
            ["name"] = "reese_account",
            ["title"] = "Reese Account",
            ["type"] = "`$OBJECT`",
            ["short"] = "Present when the measuring agent (Reese) holds an account on the platform.",
          },
          {
            ["name"] = "research",
            ["title"] = "Research",
            ["type"] = "`$OBJECT`",
            ["short"] = "Desk research on the platform's AI policy.",
          },
          {
            ["name"] = "rules_mentions",
            ["title"] = "Rules Mentions",
            ["type"] = "`$OBJECT`",
            ["short"] = "Flags found in the platform's rules pages.",
          },
          {
            ["name"] = "rules_pages",
            ["title"] = "Rules Pages",
            ["type"] = "`$ARRAY`",
            ["short"] = "Rules/terms page URLs that were read.",
          },
          {
            ["name"] = "rules_quotes",
            ["title"] = "Rules Quotes",
            ["type"] = "`$ARRAY`",
            ["short"] = "Quotes supporting the rules flags.",
          },
          {
            ["name"] = "signup_url",
            ["title"] = "Signup Url",
            ["type"] = "`$STRING`",
            ["short"] = "Sign-up URL that was tested.",
          },
          {
            ["name"] = "stepped",
            ["title"] = "Stepped",
            ["type"] = "`$ARRAY`",
            ["short"] = "Button labels the census clicked through to reach the form; null when none.",
          },
          {
            ["name"] = "tone",
            ["title"] = "Tone",
            ["type"] = "`$STRING`",
            ["short"] = "Display tone of the verdict: ok, mid, warn or bad.",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "dataset",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/data/shelves.json",
                ["segments"] = {
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "shelves.json",
                  },
                },
                ["parts"] = {
                  "data",
                  "shelves.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.rows`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["index_stat"] = {
        ["fields"] = {
          {
            ["name"] = "by_family",
            ["title"] = "By Family",
            ["type"] = "`$OBJECT`",
            ["short"] = "Platform count keyed by family.",
          },
          {
            ["name"] = "by_gate",
            ["title"] = "By Gate",
            ["type"] = "`$OBJECT`",
            ["short"] = "Platform count keyed by gate code.",
          },
          {
            ["name"] = "note",
            ["title"] = "Note",
            ["type"] = "`$STRING`",
            ["short"] = "Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof.",
          },
          {
            ["name"] = "shelves",
            ["title"] = "Shelves",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["short"] = "Number of platforms in the index.",
          },
        },
        ["name"] = "index_stat",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/stats",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "stats",
                  },
                },
                ["parts"] = {
                  "api",
                  "stats",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["lab"] = {
        ["fields"] = {
          {
            ["name"] = "before",
            ["title"] = "Before",
            ["type"] = "`$ARRAY`",
            ["short"] = "Earlier attempts and their verdicts.",
          },
          {
            ["name"] = "experiments",
            ["title"] = "Experiments",
            ["type"] = "`$ARRAY`",
            ["short"] = "Pre-registered experiments.",
          },
          {
            ["name"] = "updated",
            ["title"] = "Updated",
            ["type"] = "`$STRING`",
            ["short"] = "Ledger update date (YYYY-MM-DD).",
            ["format"] = "date",
          },
        },
        ["name"] = "lab",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/data/lab.json",
                ["segments"] = {
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "lab.json",
                  },
                },
                ["parts"] = {
                  "data",
                  "lab.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["shelf"] = {
        ["fields"] = {
          {
            ["name"] = "agent_can_register",
            ["title"] = "Agent Can Register",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Verdict on whether an AI agent can register.",
          },
          {
            ["name"] = "agent_reports",
            ["title"] = "Agent Reports",
            ["type"] = "`$OBJECT`",
            ["short"] = "Agent-reported outcomes (unverified, shown next to the measurement).",
          },
          {
            ["name"] = "answer",
            ["title"] = "Answer",
            ["type"] = "`$STRING`",
            ["short"] = "Plain-English answer.",
          },
          {
            ["name"] = "checked_at",
            ["title"] = "Checked At",
            ["type"] = "`$STRING`",
            ["short"] = "Date of the census check (YYYY-MM-DD).",
            ["format"] = "date",
          },
          {
            ["name"] = "error",
            ["title"] = "Error",
            ["type"] = "`$STRING`",
            ["short"] = "Census error for this platform; null in every probed record (type unverified).",
          },
          {
            ["name"] = "family",
            ["title"] = "Family",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Platform family.",
          },
          {
            ["name"] = "family_title",
            ["title"] = "Family Title",
            ["type"] = "`$STRING`",
            ["short"] = "Human-readable family title.",
          },
          {
            ["name"] = "final_url",
            ["title"] = "Final Url",
            ["type"] = "`$STRING`",
            ["short"] = "URL reached after redirects; null when unreachable.",
          },
          {
            ["name"] = "fingerprint",
            ["title"] = "Fingerprint",
            ["type"] = "`$STRING`",
            ["short"] = "Browser fingerprint used on a re-check.",
          },
          {
            ["name"] = "first_pass_gate",
            ["title"] = "First Pass Gate",
            ["type"] = "`$STRING`",
            ["short"] = "Gate measured on the first pass, before a re-check.",
          },
          {
            ["name"] = "front_door",
            ["title"] = "Front Door",
            ["type"] = "`$OBJECT`",
            ["short"] = "What the census saw on the sign-up page.",
          },
          {
            ["name"] = "gate",
            ["title"] = "Gate",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Measured sign-up gate code, e.g.",
          },
          {
            ["name"] = "gate_label",
            ["title"] = "Gate Label",
            ["type"] = "`$STRING`",
            ["short"] = "Human-readable gate description.",
          },
          {
            ["name"] = "http_status",
            ["title"] = "Http Status",
            ["type"] = "`$INTEGER`",
            ["short"] = "HTTP status of the sign-up page; null when unreachable.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Platform (shelf) id, e.g.",
          },
          {
            ["name"] = "manual",
            ["title"] = "Manual",
            ["type"] = "`$OBJECT`",
            ["short"] = "Manual override note.",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Platform name.",
          },
          {
            ["name"] = "note",
            ["title"] = "Note",
            ["type"] = "`$STRING`",
            ["short"] = "Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof.",
          },
          {
            ["name"] = "page",
            ["title"] = "Page",
            ["type"] = "`$STRING`",
            ["short"] = "Site path of the platform page, e.g.",
          },
          {
            ["name"] = "page_title",
            ["title"] = "Page Title",
            ["type"] = "`$STRING`",
            ["short"] = "Title of the sign-up page; null when unreachable.",
          },
          {
            ["name"] = "question",
            ["title"] = "Question",
            ["type"] = "`$STRING`",
            ["short"] = "The question answered, e.g.",
          },
          {
            ["name"] = "reese_account",
            ["title"] = "Reese Account",
            ["type"] = "`$OBJECT`",
            ["short"] = "Present when the measuring agent (Reese) holds an account on the platform.",
          },
          {
            ["name"] = "research",
            ["title"] = "Research",
            ["type"] = "`$OBJECT`",
            ["short"] = "Desk research on the platform's AI policy.",
          },
          {
            ["name"] = "rules_mentions",
            ["title"] = "Rules Mentions",
            ["type"] = "`$OBJECT`",
            ["short"] = "Flags found in the platform's rules pages.",
          },
          {
            ["name"] = "rules_pages",
            ["title"] = "Rules Pages",
            ["type"] = "`$ARRAY`",
            ["short"] = "Rules/terms page URLs that were read.",
          },
          {
            ["name"] = "rules_quotes",
            ["title"] = "Rules Quotes",
            ["type"] = "`$ARRAY`",
            ["short"] = "Quotes supporting the rules flags.",
          },
          {
            ["name"] = "signup_url",
            ["title"] = "Signup Url",
            ["type"] = "`$STRING`",
            ["short"] = "Sign-up URL that was tested.",
          },
          {
            ["name"] = "stepped",
            ["title"] = "Stepped",
            ["type"] = "`$ARRAY`",
            ["short"] = "Button labels the census clicked through to reach the form; null when none.",
          },
          {
            ["name"] = "tone",
            ["title"] = "Tone",
            ["type"] = "`$STRING`",
            ["short"] = "Display tone of the verdict: ok, mid, warn or bad.",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "shelf",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/shelves",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "shelves",
                  },
                },
                ["parts"] = {
                  "api",
                  "shelves",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.shelves`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "agent_can_register",
                      ["orig"] = "agent_can_register",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "yes_candidate",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "family",
                      ["orig"] = "family",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "packages",
                      ["field"] = true,
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/shelves/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "shelves",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "api",
                  "shelves",
                  "{id}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "pypi",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["traffic"] = {
        ["fields"] = {
          {
            ["name"] = "ai_paths",
            ["title"] = "Ai Paths",
            ["type"] = "`$ARRAY`",
            ["short"] = "Paths most requested by AI crawlers.",
          },
          {
            ["name"] = "crawler_tokens",
            ["title"] = "Crawler Tokens",
            ["type"] = "`$ARRAY`",
            ["short"] = "Most frequent crawler tokens.",
          },
          {
            ["name"] = "daily",
            ["title"] = "Daily",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "Per-day counts.",
          },
          {
            ["name"] = "distinct_mcp_or_report_callers",
            ["title"] = "Distinct Mcp Or Report Callers",
            ["type"] = "`$INTEGER`",
            ["short"] = "Distinct callers of MCP or the report endpoint.",
          },
          {
            ["name"] = "human_referrers",
            ["title"] = "Human Referrers",
            ["type"] = "`$ARRAY`",
            ["short"] = "Top human referrers.",
          },
          {
            ["name"] = "human_src_tags",
            ["title"] = "Human Src Tags",
            ["type"] = "`$ARRAY`",
            ["short"] = "Top ?src= tags on human visits.",
          },
          {
            ["name"] = "mcp_clients",
            ["title"] = "Mcp Clients",
            ["type"] = "`$ARRAY`",
            ["short"] = "MCP clients seen.",
          },
          {
            ["name"] = "note",
            ["title"] = "Note",
            ["type"] = "`$STRING`",
            ["short"] = "Explains the traffic classes (human, bot, search, ai, self).",
          },
          {
            ["name"] = "since",
            ["title"] = "Since",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "First day covered (YYYY-MM-DD).",
            ["format"] = "date",
          },
        },
        ["name"] = "traffic",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/traffic",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "traffic",
                  },
                },
                ["parts"] = {
                  "api",
                  "traffic",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "day",
                      ["orig"] = "days",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 14,
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
