package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "AgentAccessIndex",
			"slug": "agent-access-index",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://agentaccess.lastminutedealshq.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"dataset": map[string]any{},
				"index_stat": map[string]any{},
				"lab": map[string]any{},
				"shelf": map[string]any{},
				"traffic": map[string]any{},
			},
		},
		"entity": map[string]any{
			"dataset": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "agent_can_register",
						"title": "Agent Can Register",
						"type": "`$STRING`",
						"req": true,
						"short": "Verdict on whether an AI agent can register.",
					},
					map[string]any{
						"name": "agent_reports",
						"title": "Agent Reports",
						"type": "`$OBJECT`",
						"short": "Agent-reported outcomes (unverified, shown next to the measurement).",
					},
					map[string]any{
						"name": "answer",
						"title": "Answer",
						"type": "`$STRING`",
						"short": "Plain-English answer.",
					},
					map[string]any{
						"name": "checked_at",
						"title": "Checked At",
						"type": "`$STRING`",
						"short": "Date of the census check (YYYY-MM-DD).",
						"format": "date",
					},
					map[string]any{
						"name": "error",
						"title": "Error",
						"type": "`$STRING`",
						"short": "Census error for this platform; null in every probed record (type unverified).",
					},
					map[string]any{
						"name": "family",
						"title": "Family",
						"type": "`$STRING`",
						"req": true,
						"short": "Platform family.",
					},
					map[string]any{
						"name": "family_title",
						"title": "Family Title",
						"type": "`$STRING`",
						"short": "Human-readable family title.",
					},
					map[string]any{
						"name": "final_url",
						"title": "Final Url",
						"type": "`$STRING`",
						"short": "URL reached after redirects; null when unreachable.",
					},
					map[string]any{
						"name": "fingerprint",
						"title": "Fingerprint",
						"type": "`$STRING`",
						"short": "Browser fingerprint used on a re-check.",
					},
					map[string]any{
						"name": "first_pass_gate",
						"title": "First Pass Gate",
						"type": "`$STRING`",
						"short": "Gate measured on the first pass, before a re-check.",
					},
					map[string]any{
						"name": "front_door",
						"title": "Front Door",
						"type": "`$OBJECT`",
						"short": "What the census saw on the sign-up page.",
					},
					map[string]any{
						"name": "gate",
						"title": "Gate",
						"type": "`$STRING`",
						"req": true,
						"short": "Measured sign-up gate code, e.g.",
					},
					map[string]any{
						"name": "gate_label",
						"title": "Gate Label",
						"type": "`$STRING`",
						"short": "Human-readable gate description.",
					},
					map[string]any{
						"name": "http_status",
						"title": "Http Status",
						"type": "`$INTEGER`",
						"short": "HTTP status of the sign-up page; null when unreachable.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Platform (shelf) id, e.g.",
					},
					map[string]any{
						"name": "manual",
						"title": "Manual",
						"type": "`$OBJECT`",
						"short": "Manual override note.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Platform name.",
					},
					map[string]any{
						"name": "note",
						"title": "Note",
						"type": "`$STRING`",
						"short": "Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof.",
					},
					map[string]any{
						"name": "page",
						"title": "Page",
						"type": "`$STRING`",
						"short": "Site path of the platform page, e.g.",
					},
					map[string]any{
						"name": "page_title",
						"title": "Page Title",
						"type": "`$STRING`",
						"short": "Title of the sign-up page; null when unreachable.",
					},
					map[string]any{
						"name": "question",
						"title": "Question",
						"type": "`$STRING`",
						"short": "The question answered, e.g.",
					},
					map[string]any{
						"name": "reese_account",
						"title": "Reese Account",
						"type": "`$OBJECT`",
						"short": "Present when the measuring agent (Reese) holds an account on the platform.",
					},
					map[string]any{
						"name": "research",
						"title": "Research",
						"type": "`$OBJECT`",
						"short": "Desk research on the platform's AI policy.",
					},
					map[string]any{
						"name": "rules_mentions",
						"title": "Rules Mentions",
						"type": "`$OBJECT`",
						"short": "Flags found in the platform's rules pages.",
					},
					map[string]any{
						"name": "rules_pages",
						"title": "Rules Pages",
						"type": "`$ARRAY`",
						"short": "Rules/terms page URLs that were read.",
					},
					map[string]any{
						"name": "rules_quotes",
						"title": "Rules Quotes",
						"type": "`$ARRAY`",
						"short": "Quotes supporting the rules flags.",
					},
					map[string]any{
						"name": "signup_url",
						"title": "Signup Url",
						"type": "`$STRING`",
						"short": "Sign-up URL that was tested.",
					},
					map[string]any{
						"name": "stepped",
						"title": "Stepped",
						"type": "`$ARRAY`",
						"short": "Button labels the census clicked through to reach the form; null when none.",
					},
					map[string]any{
						"name": "tone",
						"title": "Tone",
						"type": "`$STRING`",
						"short": "Display tone of the verdict: ok, mid, warn or bad.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "dataset",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/data/shelves.json",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "shelves.json",
									},
								},
								"parts": []any{
									"data",
									"shelves.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.rows`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"index_stat": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "by_family",
						"title": "By Family",
						"type": "`$OBJECT`",
						"short": "Platform count keyed by family.",
					},
					map[string]any{
						"name": "by_gate",
						"title": "By Gate",
						"type": "`$OBJECT`",
						"short": "Platform count keyed by gate code.",
					},
					map[string]any{
						"name": "note",
						"title": "Note",
						"type": "`$STRING`",
						"short": "Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof.",
					},
					map[string]any{
						"name": "shelves",
						"title": "Shelves",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Number of platforms in the index.",
					},
				},
				"name": "index_stat",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/stats",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "stats",
									},
								},
								"parts": []any{
									"api",
									"stats",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"lab": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "before",
						"title": "Before",
						"type": "`$ARRAY`",
						"short": "Earlier attempts and their verdicts.",
					},
					map[string]any{
						"name": "experiments",
						"title": "Experiments",
						"type": "`$ARRAY`",
						"short": "Pre-registered experiments.",
					},
					map[string]any{
						"name": "updated",
						"title": "Updated",
						"type": "`$STRING`",
						"short": "Ledger update date (YYYY-MM-DD).",
						"format": "date",
					},
				},
				"name": "lab",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/data/lab.json",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "lab.json",
									},
								},
								"parts": []any{
									"data",
									"lab.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"shelf": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "agent_can_register",
						"title": "Agent Can Register",
						"type": "`$STRING`",
						"req": true,
						"short": "Verdict on whether an AI agent can register.",
					},
					map[string]any{
						"name": "agent_reports",
						"title": "Agent Reports",
						"type": "`$OBJECT`",
						"short": "Agent-reported outcomes (unverified, shown next to the measurement).",
					},
					map[string]any{
						"name": "answer",
						"title": "Answer",
						"type": "`$STRING`",
						"short": "Plain-English answer.",
					},
					map[string]any{
						"name": "checked_at",
						"title": "Checked At",
						"type": "`$STRING`",
						"short": "Date of the census check (YYYY-MM-DD).",
						"format": "date",
					},
					map[string]any{
						"name": "error",
						"title": "Error",
						"type": "`$STRING`",
						"short": "Census error for this platform; null in every probed record (type unverified).",
					},
					map[string]any{
						"name": "family",
						"title": "Family",
						"type": "`$STRING`",
						"req": true,
						"short": "Platform family.",
					},
					map[string]any{
						"name": "family_title",
						"title": "Family Title",
						"type": "`$STRING`",
						"short": "Human-readable family title.",
					},
					map[string]any{
						"name": "final_url",
						"title": "Final Url",
						"type": "`$STRING`",
						"short": "URL reached after redirects; null when unreachable.",
					},
					map[string]any{
						"name": "fingerprint",
						"title": "Fingerprint",
						"type": "`$STRING`",
						"short": "Browser fingerprint used on a re-check.",
					},
					map[string]any{
						"name": "first_pass_gate",
						"title": "First Pass Gate",
						"type": "`$STRING`",
						"short": "Gate measured on the first pass, before a re-check.",
					},
					map[string]any{
						"name": "front_door",
						"title": "Front Door",
						"type": "`$OBJECT`",
						"short": "What the census saw on the sign-up page.",
					},
					map[string]any{
						"name": "gate",
						"title": "Gate",
						"type": "`$STRING`",
						"req": true,
						"short": "Measured sign-up gate code, e.g.",
					},
					map[string]any{
						"name": "gate_label",
						"title": "Gate Label",
						"type": "`$STRING`",
						"short": "Human-readable gate description.",
					},
					map[string]any{
						"name": "http_status",
						"title": "Http Status",
						"type": "`$INTEGER`",
						"short": "HTTP status of the sign-up page; null when unreachable.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Platform (shelf) id, e.g.",
					},
					map[string]any{
						"name": "manual",
						"title": "Manual",
						"type": "`$OBJECT`",
						"short": "Manual override note.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Platform name.",
					},
					map[string]any{
						"name": "note",
						"title": "Note",
						"type": "`$STRING`",
						"short": "Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof.",
					},
					map[string]any{
						"name": "page",
						"title": "Page",
						"type": "`$STRING`",
						"short": "Site path of the platform page, e.g.",
					},
					map[string]any{
						"name": "page_title",
						"title": "Page Title",
						"type": "`$STRING`",
						"short": "Title of the sign-up page; null when unreachable.",
					},
					map[string]any{
						"name": "question",
						"title": "Question",
						"type": "`$STRING`",
						"short": "The question answered, e.g.",
					},
					map[string]any{
						"name": "reese_account",
						"title": "Reese Account",
						"type": "`$OBJECT`",
						"short": "Present when the measuring agent (Reese) holds an account on the platform.",
					},
					map[string]any{
						"name": "research",
						"title": "Research",
						"type": "`$OBJECT`",
						"short": "Desk research on the platform's AI policy.",
					},
					map[string]any{
						"name": "rules_mentions",
						"title": "Rules Mentions",
						"type": "`$OBJECT`",
						"short": "Flags found in the platform's rules pages.",
					},
					map[string]any{
						"name": "rules_pages",
						"title": "Rules Pages",
						"type": "`$ARRAY`",
						"short": "Rules/terms page URLs that were read.",
					},
					map[string]any{
						"name": "rules_quotes",
						"title": "Rules Quotes",
						"type": "`$ARRAY`",
						"short": "Quotes supporting the rules flags.",
					},
					map[string]any{
						"name": "signup_url",
						"title": "Signup Url",
						"type": "`$STRING`",
						"short": "Sign-up URL that was tested.",
					},
					map[string]any{
						"name": "stepped",
						"title": "Stepped",
						"type": "`$ARRAY`",
						"short": "Button labels the census clicked through to reach the form; null when none.",
					},
					map[string]any{
						"name": "tone",
						"title": "Tone",
						"type": "`$STRING`",
						"short": "Display tone of the verdict: ok, mid, warn or bad.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "shelf",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/shelves",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "shelves",
									},
								},
								"parts": []any{
									"api",
									"shelves",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.shelves`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "agent_can_register",
											"orig": "agent_can_register",
											"type": "`$STRING`",
											"kind": "query",
											"example": "yes_candidate",
											"field": true,
										},
										map[string]any{
											"name": "family",
											"orig": "family",
											"type": "`$STRING`",
											"kind": "query",
											"example": "packages",
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/shelves/{id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "shelves",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"shelves",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "pypi",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"traffic": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ai_paths",
						"title": "Ai Paths",
						"type": "`$ARRAY`",
						"short": "Paths most requested by AI crawlers.",
					},
					map[string]any{
						"name": "crawler_tokens",
						"title": "Crawler Tokens",
						"type": "`$ARRAY`",
						"short": "Most frequent crawler tokens.",
					},
					map[string]any{
						"name": "daily",
						"title": "Daily",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Per-day counts.",
					},
					map[string]any{
						"name": "distinct_mcp_or_report_callers",
						"title": "Distinct Mcp Or Report Callers",
						"type": "`$INTEGER`",
						"short": "Distinct callers of MCP or the report endpoint.",
					},
					map[string]any{
						"name": "human_referrers",
						"title": "Human Referrers",
						"type": "`$ARRAY`",
						"short": "Top human referrers.",
					},
					map[string]any{
						"name": "human_src_tags",
						"title": "Human Src Tags",
						"type": "`$ARRAY`",
						"short": "Top ?src= tags on human visits.",
					},
					map[string]any{
						"name": "mcp_clients",
						"title": "Mcp Clients",
						"type": "`$ARRAY`",
						"short": "MCP clients seen.",
					},
					map[string]any{
						"name": "note",
						"title": "Note",
						"type": "`$STRING`",
						"short": "Explains the traffic classes (human, bot, search, ai, self).",
					},
					map[string]any{
						"name": "since",
						"title": "Since",
						"type": "`$STRING`",
						"req": true,
						"short": "First day covered (YYYY-MM-DD).",
						"format": "date",
					},
				},
				"name": "traffic",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/traffic",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "traffic",
									},
								},
								"parts": []any{
									"api",
									"traffic",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "day",
											"orig": "days",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 14,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
