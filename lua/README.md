# AgentAccessIndex Lua SDK



The Lua SDK for the AgentAccessIndex API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Dataset()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/agent-access-index-sdk/tags)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("agent-access-index_sdk")

local client = sdk.new()
```

### 2. List dataset records

Entity operations return `(value, err)`. For `list`, `value` is an
array of entities, one per record — iterate it directly (there is no
wrapper), and read each record with `data_get()`.

```lua
local datasets, err = client:Dataset():list()
if err then error(err) end

for _, item in ipairs(datasets) do
  local rec = item:data_get()
  print(rec["id"])
end
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local traffics, err = client:Traffic():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Traffic():list()
-- result is an array of entities, one per mock record; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
AGENT_ACCESS_INDEX_TEST_LIVE=TRUE
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### AgentAccessIndexSDK

```lua
local sdk = require("agent-access-index_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### AgentAccessIndexSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Dataset` | `(data) -> DatasetEntity` | Create a Dataset entity instance. |
| `IndexStat` | `(data) -> IndexStatEntity` | Create an IndexStat entity instance. |
| `Lab` | `(data) -> LabEntity` | Create a Lab entity instance. |
| `Shelf` | `(data) -> ShelfEntity` | Create a Shelf entity instance. |
| `Traffic` | `(data) -> TrafficEntity` | Create a Traffic entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria, and return it. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria, one per record. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity, whose `data_get()` reads its record (a `table`) |
| `list` | an array (`table`) of entities, one per record |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local index_stat, err = client:IndexStat():load()
    if err then error(err) end
    -- index_stat is the loaded entity

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Dataset

| Field | Description |
| --- | --- |
| `agent_can_register` | Verdict on whether an AI agent can register. |
| `agent_reports` | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | Plain-English answer. |
| `checked_at` | Date of the census check (YYYY-MM-DD). |
| `error` | Census error for this platform; null in every probed record (type unverified). |
| `family` | Platform family. |
| `family_title` | Human-readable family title. |
| `final_url` | URL reached after redirects; null when unreachable. |
| `fingerprint` | Browser fingerprint used on a re-check. |
| `first_pass_gate` | Gate measured on the first pass, before a re-check. |
| `front_door` | What the census saw on the sign-up page. |
| `gate` | Measured sign-up gate code, e.g. |
| `gate_label` | Human-readable gate description. |
| `http_status` | HTTP status of the sign-up page; null when unreachable. |
| `id` | Platform (shelf) id, e.g. |
| `manual` | Manual override note. |
| `name` | Platform name. |
| `note` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | Site path of the platform page, e.g. |
| `page_title` | Title of the sign-up page; null when unreachable. |
| `question` | The question answered, e.g. |
| `reese_account` | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | Desk research on the platform's AI policy. |
| `rules_mentions` | Flags found in the platform's rules pages. |
| `rules_pages` | Rules/terms page URLs that were read. |
| `rules_quotes` | Quotes supporting the rules flags. |
| `signup_url` | Sign-up URL that was tested. |
| `stepped` | Button labels the census clicked through to reach the form; null when none. |
| `tone` | Display tone of the verdict: ok, mid, warn or bad. |

Operations: List.

API path: `/data/shelves.json`

#### IndexStat

| Field | Description |
| --- | --- |
| `by_family` | Platform count keyed by family. |
| `by_gate` | Platform count keyed by gate code. |
| `note` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `shelves` | Number of platforms in the index. |

Operations: Load.

API path: `/api/stats`

#### Lab

| Field | Description |
| --- | --- |
| `before` | Earlier attempts and their verdicts. |
| `experiments` | Pre-registered experiments. |
| `updated` | Ledger update date (YYYY-MM-DD). |

Operations: List.

API path: `/data/lab.json`

#### Shelf

| Field | Description |
| --- | --- |
| `agent_can_register` | Verdict on whether an AI agent can register. |
| `agent_reports` | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | Plain-English answer. |
| `checked_at` | Date of the census check (YYYY-MM-DD). |
| `error` | Census error for this platform; null in every probed record (type unverified). |
| `family` | Platform family. |
| `family_title` | Human-readable family title. |
| `final_url` | URL reached after redirects; null when unreachable. |
| `fingerprint` | Browser fingerprint used on a re-check. |
| `first_pass_gate` | Gate measured on the first pass, before a re-check. |
| `front_door` | What the census saw on the sign-up page. |
| `gate` | Measured sign-up gate code, e.g. |
| `gate_label` | Human-readable gate description. |
| `http_status` | HTTP status of the sign-up page; null when unreachable. |
| `id` | Platform (shelf) id, e.g. |
| `manual` | Manual override note. |
| `name` | Platform name. |
| `note` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | Site path of the platform page, e.g. |
| `page_title` | Title of the sign-up page; null when unreachable. |
| `question` | The question answered, e.g. |
| `reese_account` | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | Desk research on the platform's AI policy. |
| `rules_mentions` | Flags found in the platform's rules pages. |
| `rules_pages` | Rules/terms page URLs that were read. |
| `rules_quotes` | Quotes supporting the rules flags. |
| `signup_url` | Sign-up URL that was tested. |
| `stepped` | Button labels the census clicked through to reach the form; null when none. |
| `tone` | Display tone of the verdict: ok, mid, warn or bad. |

Operations: List, Load.

API path: `/api/shelves`

#### Traffic

| Field | Description |
| --- | --- |
| `ai_paths` | Paths most requested by AI crawlers. |
| `crawler_tokens` | Most frequent crawler tokens. |
| `daily` | Per-day counts. |
| `distinct_mcp_or_report_callers` | Distinct callers of MCP or the report endpoint. |
| `human_referrers` | Top human referrers. |
| `human_src_tags` | Top ?src= tags on human visits. |
| `mcp_clients` | MCP clients seen. |
| `note` | Explains the traffic classes (human, bot, search, ai, self). |
| `since` | First day covered (YYYY-MM-DD). |

Operations: List.

API path: `/api/traffic`



## Entities


### Dataset

Create an instance: `local dataset = client:Dataset(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_can_register` | `string` | Verdict on whether an AI agent can register. |
| `agent_reports` | `table` | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `string` | Plain-English answer. |
| `checked_at` | `string` | Date of the census check (YYYY-MM-DD). |
| `error` | `string` | Census error for this platform; null in every probed record (type unverified). |
| `family` | `string` | Platform family. |
| `family_title` | `string` | Human-readable family title. |
| `final_url` | `string` | URL reached after redirects; null when unreachable. |
| `fingerprint` | `string` | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `string` | Gate measured on the first pass, before a re-check. |
| `front_door` | `table` | What the census saw on the sign-up page. |
| `gate` | `string` | Measured sign-up gate code, e.g. |
| `gate_label` | `string` | Human-readable gate description. |
| `http_status` | `number` | HTTP status of the sign-up page; null when unreachable. |
| `id` | `string` | Platform (shelf) id, e.g. |
| `manual` | `table` | Manual override note. |
| `name` | `string` | Platform name. |
| `note` | `string` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `string` | Site path of the platform page, e.g. |
| `page_title` | `string` | Title of the sign-up page; null when unreachable. |
| `question` | `string` | The question answered, e.g. |
| `reese_account` | `table` | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `table` | Desk research on the platform's AI policy. |
| `rules_mentions` | `table` | Flags found in the platform's rules pages. |
| `rules_pages` | `table` | Rules/terms page URLs that were read. |
| `rules_quotes` | `table` | Quotes supporting the rules flags. |
| `signup_url` | `string` | Sign-up URL that was tested. |
| `stepped` | `table` | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `string` | Display tone of the verdict: ok, mid, warn or bad. |

#### Example: List

```lua
local datasets, err = client:Dataset():list()
```


### IndexStat

Create an instance: `local index_stat = client:IndexStat(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `by_family` | `table` | Platform count keyed by family. |
| `by_gate` | `table` | Platform count keyed by gate code. |
| `note` | `string` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `shelves` | `number` | Number of platforms in the index. |

#### Example: Load

```lua
local index_stat, err = client:IndexStat():load()
```


### Lab

Create an instance: `local lab = client:Lab(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `before` | `table` | Earlier attempts and their verdicts. |
| `experiments` | `table` | Pre-registered experiments. |
| `updated` | `string` | Ledger update date (YYYY-MM-DD). |

#### Example: List

```lua
local labs, err = client:Lab():list()
```


### Shelf

Create an instance: `local shelf = client:Shelf(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_can_register` | `string` | Verdict on whether an AI agent can register. |
| `agent_reports` | `table` | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `string` | Plain-English answer. |
| `checked_at` | `string` | Date of the census check (YYYY-MM-DD). |
| `error` | `string` | Census error for this platform; null in every probed record (type unverified). |
| `family` | `string` | Platform family. |
| `family_title` | `string` | Human-readable family title. |
| `final_url` | `string` | URL reached after redirects; null when unreachable. |
| `fingerprint` | `string` | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `string` | Gate measured on the first pass, before a re-check. |
| `front_door` | `table` | What the census saw on the sign-up page. |
| `gate` | `string` | Measured sign-up gate code, e.g. |
| `gate_label` | `string` | Human-readable gate description. |
| `http_status` | `number` | HTTP status of the sign-up page; null when unreachable. |
| `id` | `string` | Platform (shelf) id, e.g. |
| `manual` | `table` | Manual override note. |
| `name` | `string` | Platform name. |
| `note` | `string` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `string` | Site path of the platform page, e.g. |
| `page_title` | `string` | Title of the sign-up page; null when unreachable. |
| `question` | `string` | The question answered, e.g. |
| `reese_account` | `table` | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `table` | Desk research on the platform's AI policy. |
| `rules_mentions` | `table` | Flags found in the platform's rules pages. |
| `rules_pages` | `table` | Rules/terms page URLs that were read. |
| `rules_quotes` | `table` | Quotes supporting the rules flags. |
| `signup_url` | `string` | Sign-up URL that was tested. |
| `stepped` | `table` | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `string` | Display tone of the verdict: ok, mid, warn or bad. |

#### Example: Load

```lua
local shelf, err = client:Shelf():load({ id = "shelf_id" })
```

#### Example: List

```lua
local shelfs, err = client:Shelf():list()
```


### Traffic

Create an instance: `local traffic = client:Traffic(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ai_paths` | `table` | Paths most requested by AI crawlers. |
| `crawler_tokens` | `table` | Most frequent crawler tokens. |
| `daily` | `table` | Per-day counts. |
| `distinct_mcp_or_report_callers` | `number` | Distinct callers of MCP or the report endpoint. |
| `human_referrers` | `table` | Top human referrers. |
| `human_src_tags` | `table` | Top ?src= tags on human visits. |
| `mcp_clients` | `table` | MCP clients seen. |
| `note` | `string` | Explains the traffic classes (human, bot, search, ai, self). |
| `since` | `string` | First day covered (YYYY-MM-DD). |

#### Example: List

```lua
local traffics, err = client:Traffic():list()
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── agent-access-index_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`agent-access-index_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local traffic = client:Traffic()
traffic:list()

-- traffic:data_get() now returns the traffic data from the last list
-- traffic:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
