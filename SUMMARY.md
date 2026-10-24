# Agent Access Index API

Agent Access Index (`agentaccess.lastminutedealshq.com`): a census of ~162 platforms (&#39;shelves&#39;) recording whether an AI agent can register on them, measured by an AI agent. Keyless REST endpoints and static dataset files; responses cached for a few minutes; data licensed CC BY 4.0. Built from https://agentaccess.lastminutedealshq.com/docs and live probes on 2026-10-23. Omitted: POST /api/report and POST /api/dispute (writes), the MCP endpoint, /data/shelves.csv, /feed.xml and /llms.txt. Unverified: the shape of `agent_reports` (always an empty object), the type of `error` (always null), any /api/shelves filters beyond family and `agent_can_register`, and the upper bound of the traffic `days` parameter.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 5 entities and 6 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Dataset

Results: The dataset.

SDK operations: `list`.

Key fields to recognise:

- `agent_can_register`: Verdict on whether an AI agent can register.
- `agent_reports`: Agent-reported outcomes (unverified, shown next to the measurement). Every probed record returned an empty object, so the shape is unverified. Single-shelf responses only.
- `answer`: Plain-English answer. Not in list items.
- `checked_at`: Date of the census check (YYYY-MM-DD).
- `error`: Census error for this platform; null in every probed record (type unverified).

### IndexStat

Results: The index statistics.

SDK operations: `load`.

Key fields to recognise:

- `by_family`: Platform count keyed by family.
- `by_gate`: Platform count keyed by gate code.
- `note`: Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof.
- `shelves`: Number of platforms in the index.

### Lab

Results: The experiment ledger.

SDK operations: `list`.

Key fields to recognise:

- `before`: Earlier attempts and their verdicts.
- `experiments`: Pre-registered experiments.
- `updated`: Ledger update date (YYYY-MM-DD).

### Shelf

Results: The matching platforms; The platform record.

SDK operations: `list`, `load`.

Key fields to recognise:

- `agent_can_register`: Verdict on whether an AI agent can register.
- `agent_reports`: Agent-reported outcomes (unverified, shown next to the measurement). Every probed record returned an empty object, so the shape is unverified. Single-shelf responses only.
- `answer`: Plain-English answer. Not in list items.
- `checked_at`: Date of the census check (YYYY-MM-DD).
- `error`: Census error for this platform; null in every probed record (type unverified).

### Traffic

Results: The traffic report.

SDK operations: `list`.

Key fields to recognise:

- `ai_paths`: Paths most requested by AI crawlers.
- `crawler_tokens`: Most frequent crawler tokens.
- `daily`: Per-day counts.
- `distinct_mcp_or_report_callers`: Distinct callers of MCP or the report endpoint.
- `human_referrers`: Top human referrers.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Dataset | `list` | `GET /data/shelves.json` | See reference |
| IndexStat | `load` | `GET /api/stats` | See reference |
| Lab | `list` | `GET /data/lab.json` | See reference |
| Shelf | `list` | `GET /api/shelves` | See reference |
| Shelf | `load` | `GET /api/shelves/{id}` | See reference |
| Traffic | `list` | `GET /api/traffic` | See reference |

## Connect to the API

- Production server: `https://agentaccess.lastminutedealshq.com`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `agent-access-index_list`: List records for an entity. Supported entities: `dataset`, `lab`, `shelf`, `traffic`.
- `agent-access-index_load`: Load one record for an entity. Supported entities: `index_stat`, `shelf`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

