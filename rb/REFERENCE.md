# AgentAccessIndex Ruby SDK Reference

Complete API reference for the AgentAccessIndex Ruby SDK.


## AgentAccessIndexSDK

### Constructor

```ruby
require_relative 'AgentAccessIndex_sdk'

client = AgentAccessIndexSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AgentAccessIndexSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = AgentAccessIndexSDK.test
```


### Instance Methods

#### `Dataset(data = nil)`

Create a new `Dataset` entity instance. Pass `nil` for no initial data.

#### `IndexStat(data = nil)`

Create a new `IndexStat` entity instance. Pass `nil` for no initial data.

#### `Lab(data = nil)`

Create a new `Lab` entity instance. Pass `nil` for no initial data.

#### `Shelf(data = nil)`

Create a new `Shelf` entity instance. Pass `nil` for no initial data.

#### `Traffic(data = nil)`

Create a new `Traffic` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## DatasetEntity

```ruby
dataset = client.Dataset
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_can_register` | `String` | Yes | Verdict on whether an AI agent can register. |
| `agent_reports` | `Hash` | No | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `String` | No | Plain-English answer. |
| `checked_at` | `String` | No | Date of the census check (YYYY-MM-DD). |
| `error` | `String` | No | Census error for this platform; null in every probed record (type unverified). |
| `family` | `String` | Yes | Platform family. |
| `family_title` | `String` | No | Human-readable family title. |
| `final_url` | `String` | No | URL reached after redirects; null when unreachable. |
| `fingerprint` | `String` | No | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `String` | No | Gate measured on the first pass, before a re-check. |
| `front_door` | `Hash` | No | What the census saw on the sign-up page. |
| `gate` | `String` | Yes | Measured sign-up gate code, e.g. |
| `gate_label` | `String` | No | Human-readable gate description. |
| `http_status` | `Integer` | No | HTTP status of the sign-up page; null when unreachable. |
| `id` | `String` | Yes | Platform (shelf) id, e.g. |
| `manual` | `Hash` | No | Manual override note. |
| `name` | `String` | Yes | Platform name. |
| `note` | `String` | No | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `String` | No | Site path of the platform page, e.g. |
| `page_title` | `String` | No | Title of the sign-up page; null when unreachable. |
| `question` | `String` | No | The question answered, e.g. |
| `reese_account` | `Hash` | No | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `Hash` | No | Desk research on the platform's AI policy. |
| `rules_mentions` | `Hash` | No | Flags found in the platform's rules pages. |
| `rules_pages` | `Array` | No | Rules/terms page URLs that were read. |
| `rules_quotes` | `Array` | No | Quotes supporting the rules flags. |
| `signup_url` | `String` | No | Sign-up URL that was tested. |
| `stepped` | `Array` | No | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `String` | No | Display tone of the verdict: ok, mid, warn or bad. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Dataset.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DatasetEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IndexStatEntity

```ruby
index_stat = client.IndexStat
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `by_family` | `Hash` | No | Platform count keyed by family. |
| `by_gate` | `Hash` | No | Platform count keyed by gate code. |
| `note` | `String` | No | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `shelves` | `Integer` | Yes | Number of platforms in the index. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.IndexStat.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IndexStatEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LabEntity

```ruby
lab = client.Lab
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | `Array` | No | Earlier attempts and their verdicts. |
| `experiments` | `Array` | No | Pre-registered experiments. |
| `updated` | `String` | No | Ledger update date (YYYY-MM-DD). |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Lab.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LabEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ShelfEntity

```ruby
shelf = client.Shelf
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_can_register` | `String` | Yes | Verdict on whether an AI agent can register. |
| `agent_reports` | `Hash` | No | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `String` | No | Plain-English answer. |
| `checked_at` | `String` | No | Date of the census check (YYYY-MM-DD). |
| `error` | `String` | No | Census error for this platform; null in every probed record (type unverified). |
| `family` | `String` | Yes | Platform family. |
| `family_title` | `String` | No | Human-readable family title. |
| `final_url` | `String` | No | URL reached after redirects; null when unreachable. |
| `fingerprint` | `String` | No | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `String` | No | Gate measured on the first pass, before a re-check. |
| `front_door` | `Hash` | No | What the census saw on the sign-up page. |
| `gate` | `String` | Yes | Measured sign-up gate code, e.g. |
| `gate_label` | `String` | No | Human-readable gate description. |
| `http_status` | `Integer` | No | HTTP status of the sign-up page; null when unreachable. |
| `id` | `String` | Yes | Platform (shelf) id, e.g. |
| `manual` | `Hash` | No | Manual override note. |
| `name` | `String` | Yes | Platform name. |
| `note` | `String` | No | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `String` | No | Site path of the platform page, e.g. |
| `page_title` | `String` | No | Title of the sign-up page; null when unreachable. |
| `question` | `String` | No | The question answered, e.g. |
| `reese_account` | `Hash` | No | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `Hash` | No | Desk research on the platform's AI policy. |
| `rules_mentions` | `Hash` | No | Flags found in the platform's rules pages. |
| `rules_pages` | `Array` | No | Rules/terms page URLs that were read. |
| `rules_quotes` | `Array` | No | Quotes supporting the rules flags. |
| `signup_url` | `String` | No | Sign-up URL that was tested. |
| `stepped` | `Array` | No | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `String` | No | Display tone of the verdict: ok, mid, warn or bad. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Shelf.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Shelf.load({ "id" => "shelf_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ShelfEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TrafficEntity

```ruby
traffic = client.Traffic
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_paths` | `Array` | No | Paths most requested by AI crawlers. |
| `crawler_tokens` | `Array` | No | Most frequent crawler tokens. |
| `daily` | `Array` | Yes | Per-day counts. |
| `distinct_mcp_or_report_callers` | `Integer` | No | Distinct callers of MCP or the report endpoint. |
| `human_referrers` | `Array` | No | Top human referrers. |
| `human_src_tags` | `Array` | No | Top ?src= tags on human visits. |
| `mcp_clients` | `Array` | No | MCP clients seen. |
| `note` | `String` | No | Explains the traffic classes (human, bot, search, ai, self). |
| `since` | `String` | Yes | First day covered (YYYY-MM-DD). |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Traffic.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TrafficEntity` instance with the same client and
options.

#### `get_name -> String`

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

```ruby
client = AgentAccessIndexSDK.new({
  "feature" => {
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
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

