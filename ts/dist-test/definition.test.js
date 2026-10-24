"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "dataset",
        "accessor": "Dataset",
        "op": "list",
        "method": "GET",
        "path": "/data/shelves.json",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "name": "x",
            "run_at": "x",
            "browser": "x",
            "licence": "x",
            "note": "x",
            "rows": [
                {
                    "id": "pypi",
                    "name": "x",
                    "family": "assistant_stores",
                    "family_title": "x",
                    "gate": "x",
                    "gate_label": "x",
                    "agent_can_register": "yes_candidate",
                    "signup_url": "x",
                    "checked_at": "2026-01-01",
                    "page": "x",
                    "final_url": "x",
                    "http_status": 1,
                    "page_title": "x",
                    "tone": "x",
                    "question": "x",
                    "answer": "x",
                    "stepped": [
                        "x"
                    ],
                    "front_door": {
                        "bot_wall": true,
                        "captcha_visible": true,
                        "captcha_invisible": true,
                        "email_field": true,
                        "password_field": true,
                        "phone_field": true,
                        "invite_words": true,
                        "kyc_words": true,
                        "oauth_buttons": [
                            "x"
                        ]
                    },
                    "rules_mentions": {
                        "ai_content": true,
                        "bots_automation": true,
                        "human_only": true
                    },
                    "rules_pages": [
                        "x"
                    ],
                    "rules_quotes": [
                        {
                            "flag": "x",
                            "quote": "x",
                            "url": "x"
                        }
                    ],
                    "error": "x",
                    "research": {
                        "ai_policy": "x",
                        "ai_policy_url": "x"
                    },
                    "reese_account": {
                        "status": "x",
                        "note": "x"
                    },
                    "manual": {
                        "note": "x",
                        "source": "x"
                    },
                    "fingerprint": "x",
                    "first_pass_gate": "x",
                    "agent_reports": {},
                    "note": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "index_stat",
        "accessor": "IndexStat",
        "op": "load",
        "method": "GET",
        "path": "/api/stats",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "shelves": 1,
            "by_family": {},
            "by_gate": {},
            "note": "x"
        },
        "idField": "id"
    },
    {
        "entity": "lab",
        "accessor": "Lab",
        "op": "list",
        "method": "GET",
        "path": "/data/lab.json",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "updated": "2026-01-01",
            "experiments": [
                {
                    "id": "x",
                    "name": "x",
                    "what": "x",
                    "started": "x",
                    "status": "x",
                    "pass": "x",
                    "kill": "x",
                    "odds": "x",
                    "read_by": "x",
                    "result": "x"
                }
            ],
            "before": [
                {
                    "what": "x",
                    "numbers": "x",
                    "verdict": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "shelf",
        "accessor": "Shelf",
        "op": "list",
        "method": "GET",
        "path": "/api/shelves",
        "args": [],
        "select": {
            "agent_can_register": "yes_candidate",
            "family": "packages"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "family",
            "agent_can_register"
        ],
        "queryArgs": [
            {
                "name": "agent_can_register",
                "wire": "agent_can_register"
            },
            {
                "name": "family",
                "wire": "family"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "shelves": [
                {
                    "id": "pypi",
                    "name": "x",
                    "family": "assistant_stores",
                    "family_title": "x",
                    "gate": "x",
                    "gate_label": "x",
                    "agent_can_register": "yes_candidate",
                    "signup_url": "x",
                    "checked_at": "2026-01-01",
                    "page": "x",
                    "final_url": "x",
                    "http_status": 1,
                    "page_title": "x",
                    "tone": "x",
                    "question": "x",
                    "answer": "x",
                    "stepped": [
                        "x"
                    ],
                    "front_door": {
                        "bot_wall": true,
                        "captcha_visible": true,
                        "captcha_invisible": true,
                        "email_field": true,
                        "password_field": true,
                        "phone_field": true,
                        "invite_words": true,
                        "kyc_words": true,
                        "oauth_buttons": [
                            "x"
                        ]
                    },
                    "rules_mentions": {
                        "ai_content": true,
                        "bots_automation": true,
                        "human_only": true
                    },
                    "rules_pages": [
                        "x"
                    ],
                    "rules_quotes": [
                        {
                            "flag": "x",
                            "quote": "x",
                            "url": "x"
                        }
                    ],
                    "error": "x",
                    "research": {
                        "ai_policy": "x",
                        "ai_policy_url": "x"
                    },
                    "reese_account": {
                        "status": "x",
                        "note": "x"
                    },
                    "manual": {
                        "note": "x",
                        "source": "x"
                    },
                    "fingerprint": "x",
                    "first_pass_gate": "x",
                    "agent_reports": {},
                    "note": "x"
                }
            ],
            "note": "x"
        },
        "idField": "id"
    },
    {
        "entity": "shelf",
        "accessor": "Shelf",
        "op": "load",
        "method": "GET",
        "path": "/api/shelves/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "pypi"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": "pypi",
            "name": "x",
            "family": "assistant_stores",
            "family_title": "x",
            "gate": "x",
            "gate_label": "x",
            "agent_can_register": "yes_candidate",
            "signup_url": "x",
            "checked_at": "2026-01-01",
            "page": "x",
            "final_url": "x",
            "http_status": 1,
            "page_title": "x",
            "tone": "x",
            "question": "x",
            "answer": "x",
            "stepped": [
                "x"
            ],
            "front_door": {
                "bot_wall": true,
                "captcha_visible": true,
                "captcha_invisible": true,
                "email_field": true,
                "password_field": true,
                "phone_field": true,
                "invite_words": true,
                "kyc_words": true,
                "oauth_buttons": [
                    "x"
                ]
            },
            "rules_mentions": {
                "ai_content": true,
                "bots_automation": true,
                "human_only": true
            },
            "rules_pages": [
                "x"
            ],
            "rules_quotes": [
                {
                    "flag": "x",
                    "quote": "x",
                    "url": "x"
                }
            ],
            "error": "x",
            "research": {
                "ai_policy": "x",
                "ai_policy_url": "x"
            },
            "reese_account": {
                "status": "x",
                "note": "x"
            },
            "manual": {
                "note": "x",
                "source": "x"
            },
            "fingerprint": "x",
            "first_pass_gate": "x",
            "agent_reports": {},
            "note": "x"
        },
        "idField": "id"
    },
    {
        "entity": "traffic",
        "accessor": "Traffic",
        "op": "list",
        "method": "GET",
        "path": "/api/traffic",
        "args": [],
        "select": {
            "day": 14
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "days"
        ],
        "queryArgs": [
            {
                "name": "day",
                "wire": "days"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "since": "2026-01-01",
            "note": "x",
            "daily": [
                {
                    "day": "2026-01-01",
                    "people": 1,
                    "bots": 1,
                    "search": 1,
                    "ai": 1,
                    "api": 1,
                    "mcp": 1
                }
            ],
            "ai_paths": [
                {
                    "path": "x",
                    "n": 1
                }
            ],
            "crawler_tokens": [
                {
                    "tok": "x",
                    "n": 1
                }
            ],
            "human_referrers": [
                {
                    "ref": "x",
                    "n": 1
                }
            ],
            "human_src_tags": [
                {
                    "src": "x",
                    "n": 1
                }
            ],
            "mcp_clients": [
                {
                    "tok": "x",
                    "n": 1,
                    "visitors": 1
                }
            ],
            "distinct_mcp_or_report_callers": 1
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map