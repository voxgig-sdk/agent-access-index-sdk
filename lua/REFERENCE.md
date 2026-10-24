# AgentAccessIndex Lua SDK Reference

Complete API reference for the AgentAccessIndex Lua SDK.


## AgentAccessIndexSDK

### Constructor

```lua
local sdk = require("agent-access-index_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Dataset(data)`

Create a new `Dataset` entity instance. Pass `nil` for no initial data.

#### `IndexStat(data)`

Create a new `IndexStat` entity instance. Pass `nil` for no initial data.

#### `Lab(data)`

Create a new `Lab` entity instance. Pass `nil` for no initial data.

#### `Shelf(data)`

Create a new `Shelf` entity instance. Pass `nil` for no initial data.

#### `Traffic(data)`

Create a new `Traffic` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## DatasetEntity

```lua
local dataset = client:Dataset(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_can_register` | `string` | Yes | Verdict on whether an AI agent can register. |
| `agent_reports` | `table` | No | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `string` | No | Plain-English answer. |
| `checked_at` | `string` | No | Date of the census check (YYYY-MM-DD). |
| `error` | `string` | No | Census error for this platform; null in every probed record (type unverified). |
| `family` | `string` | Yes | Platform family. |
| `family_title` | `string` | No | Human-readable family title. |
| `final_url` | `string` | No | URL reached after redirects; null when unreachable. |
| `fingerprint` | `string` | No | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `string` | No | Gate measured on the first pass, before a re-check. |
| `front_door` | `table` | No | What the census saw on the sign-up page. |
| `gate` | `string` | Yes | Measured sign-up gate code, e.g. |
| `gate_label` | `string` | No | Human-readable gate description. |
| `http_status` | `number` | No | HTTP status of the sign-up page; null when unreachable. |
| `id` | `string` | Yes | Platform (shelf) id, e.g. |
| `manual` | `table` | No | Manual override note. |
| `name` | `string` | Yes | Platform name. |
| `note` | `string` | No | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `string` | No | Site path of the platform page, e.g. |
| `page_title` | `string` | No | Title of the sign-up page; null when unreachable. |
| `question` | `string` | No | The question answered, e.g. |
| `reese_account` | `table` | No | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `table` | No | Desk research on the platform's AI policy. |
| `rules_mentions` | `table` | No | Flags found in the platform's rules pages. |
| `rules_pages` | `table` | No | Rules/terms page URLs that were read. |
| `rules_quotes` | `table` | No | Quotes supporting the rules flags. |
| `signup_url` | `string` | No | Sign-up URL that was tested. |
| `stepped` | `table` | No | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `string` | No | Display tone of the verdict: ok, mid, warn or bad. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Dataset():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DatasetEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## IndexStatEntity

```lua
local index_stat = client:IndexStat(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `by_family` | `table` | No | Platform count keyed by family. |
| `by_gate` | `table` | No | Platform count keyed by gate code. |
| `note` | `string` | No | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `shelves` | `number` | Yes | Number of platforms in the index. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:IndexStat():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IndexStatEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LabEntity

```lua
local lab = client:Lab(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | `table` | No | Earlier attempts and their verdicts. |
| `experiments` | `table` | No | Pre-registered experiments. |
| `updated` | `string` | No | Ledger update date (YYYY-MM-DD). |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Lab():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LabEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ShelfEntity

```lua
local shelf = client:Shelf(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_can_register` | `string` | Yes | Verdict on whether an AI agent can register. |
| `agent_reports` | `table` | No | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `string` | No | Plain-English answer. |
| `checked_at` | `string` | No | Date of the census check (YYYY-MM-DD). |
| `error` | `string` | No | Census error for this platform; null in every probed record (type unverified). |
| `family` | `string` | Yes | Platform family. |
| `family_title` | `string` | No | Human-readable family title. |
| `final_url` | `string` | No | URL reached after redirects; null when unreachable. |
| `fingerprint` | `string` | No | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `string` | No | Gate measured on the first pass, before a re-check. |
| `front_door` | `table` | No | What the census saw on the sign-up page. |
| `gate` | `string` | Yes | Measured sign-up gate code, e.g. |
| `gate_label` | `string` | No | Human-readable gate description. |
| `http_status` | `number` | No | HTTP status of the sign-up page; null when unreachable. |
| `id` | `string` | Yes | Platform (shelf) id, e.g. |
| `manual` | `table` | No | Manual override note. |
| `name` | `string` | Yes | Platform name. |
| `note` | `string` | No | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `string` | No | Site path of the platform page, e.g. |
| `page_title` | `string` | No | Title of the sign-up page; null when unreachable. |
| `question` | `string` | No | The question answered, e.g. |
| `reese_account` | `table` | No | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `table` | No | Desk research on the platform's AI policy. |
| `rules_mentions` | `table` | No | Flags found in the platform's rules pages. |
| `rules_pages` | `table` | No | Rules/terms page URLs that were read. |
| `rules_quotes` | `table` | No | Quotes supporting the rules flags. |
| `signup_url` | `string` | No | Sign-up URL that was tested. |
| `stepped` | `table` | No | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `string` | No | Display tone of the verdict: ok, mid, warn or bad. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Shelf():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Shelf():load({ id = "shelf_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ShelfEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TrafficEntity

```lua
local traffic = client:Traffic(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_paths` | `table` | No | Paths most requested by AI crawlers. |
| `crawler_tokens` | `table` | No | Most frequent crawler tokens. |
| `daily` | `table` | Yes | Per-day counts. |
| `distinct_mcp_or_report_callers` | `number` | No | Distinct callers of MCP or the report endpoint. |
| `human_referrers` | `table` | No | Top human referrers. |
| `human_src_tags` | `table` | No | Top ?src= tags on human visits. |
| `mcp_clients` | `table` | No | MCP clients seen. |
| `note` | `string` | No | Explains the traffic classes (human, bot, search, ai, self). |
| `since` | `string` | Yes | First day covered (YYYY-MM-DD). |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Traffic():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TrafficEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

