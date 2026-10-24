# AgentAccessIndex Ruby SDK



The Ruby SDK for the AgentAccessIndex API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Dataset` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/agent-access-index-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/agent-access-index-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-agent-access-index-sdk", path: "./agent-access-index-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "AgentAccessIndex_sdk"

client = AgentAccessIndexSDK.new
```

### 2. List dataset records

```ruby
begin
  # list returns an Array of Dataset entities, one per record; data_get reads the record.
  datasets = client.Dataset.list
  datasets.each do |item|
    record = item.data_get
    puts "#{record["id"]} #{record["agent_can_register"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  traffics = client.Traffic.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = AgentAccessIndexSDK.test

# list returns an Array of Traffic entities, one per mock record (raises on
# error); data_get reads each record.
traffics = client.Traffic.list()
traffics.each { |item| puts item.data_get }
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = AgentAccessIndexSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### AgentAccessIndexSDK

```ruby
require_relative "AgentAccessIndex_sdk"
client = AgentAccessIndexSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = AgentAccessIndexSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### AgentAccessIndexSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Dataset` | `(data) -> DatasetEntity` | Create a Dataset entity instance. |
| `IndexStat` | `(data) -> IndexStatEntity` | Create an IndexStat entity instance. |
| `Lab` | `(data) -> LabEntity` | Create a Lab entity instance. |
| `Shelf` | `(data) -> ShelfEntity` | Create a Shelf entity instance. |
| `Traffic` | `(data) -> TrafficEntity` | Create a Traffic entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all), one per record. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`AgentAccessIndexError` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `dataset = client.Dataset`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_can_register` | `String` | Verdict on whether an AI agent can register. |
| `agent_reports` | `Hash` | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `String` | Plain-English answer. |
| `checked_at` | `String` | Date of the census check (YYYY-MM-DD). |
| `error` | `String` | Census error for this platform; null in every probed record (type unverified). |
| `family` | `String` | Platform family. |
| `family_title` | `String` | Human-readable family title. |
| `final_url` | `String` | URL reached after redirects; null when unreachable. |
| `fingerprint` | `String` | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `String` | Gate measured on the first pass, before a re-check. |
| `front_door` | `Hash` | What the census saw on the sign-up page. |
| `gate` | `String` | Measured sign-up gate code, e.g. |
| `gate_label` | `String` | Human-readable gate description. |
| `http_status` | `Integer` | HTTP status of the sign-up page; null when unreachable. |
| `id` | `String` | Platform (shelf) id, e.g. |
| `manual` | `Hash` | Manual override note. |
| `name` | `String` | Platform name. |
| `note` | `String` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `String` | Site path of the platform page, e.g. |
| `page_title` | `String` | Title of the sign-up page; null when unreachable. |
| `question` | `String` | The question answered, e.g. |
| `reese_account` | `Hash` | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `Hash` | Desk research on the platform's AI policy. |
| `rules_mentions` | `Hash` | Flags found in the platform's rules pages. |
| `rules_pages` | `Array` | Rules/terms page URLs that were read. |
| `rules_quotes` | `Array` | Quotes supporting the rules flags. |
| `signup_url` | `String` | Sign-up URL that was tested. |
| `stepped` | `Array` | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `String` | Display tone of the verdict: ok, mid, warn or bad. |

#### Example: List

```ruby
# list returns an Array of Dataset entities, one per record (raises on error).
datasets = client.Dataset.list
datasets.each { |item| puts item.data_get }
```


### IndexStat

Create an instance: `index_stat = client.IndexStat`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `by_family` | `Hash` | Platform count keyed by family. |
| `by_gate` | `Hash` | Platform count keyed by gate code. |
| `note` | `String` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `shelves` | `Integer` | Number of platforms in the index. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the IndexStat record (raises on error).
index_stat = client.IndexStat.load()
```


### Lab

Create an instance: `lab = client.Lab`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `before` | `Array` | Earlier attempts and their verdicts. |
| `experiments` | `Array` | Pre-registered experiments. |
| `updated` | `String` | Ledger update date (YYYY-MM-DD). |

#### Example: List

```ruby
# list returns an Array of Lab entities, one per record (raises on error).
labs = client.Lab.list
labs.each { |item| puts item.data_get }
```


### Shelf

Create an instance: `shelf = client.Shelf`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_can_register` | `String` | Verdict on whether an AI agent can register. |
| `agent_reports` | `Hash` | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `String` | Plain-English answer. |
| `checked_at` | `String` | Date of the census check (YYYY-MM-DD). |
| `error` | `String` | Census error for this platform; null in every probed record (type unverified). |
| `family` | `String` | Platform family. |
| `family_title` | `String` | Human-readable family title. |
| `final_url` | `String` | URL reached after redirects; null when unreachable. |
| `fingerprint` | `String` | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `String` | Gate measured on the first pass, before a re-check. |
| `front_door` | `Hash` | What the census saw on the sign-up page. |
| `gate` | `String` | Measured sign-up gate code, e.g. |
| `gate_label` | `String` | Human-readable gate description. |
| `http_status` | `Integer` | HTTP status of the sign-up page; null when unreachable. |
| `id` | `String` | Platform (shelf) id, e.g. |
| `manual` | `Hash` | Manual override note. |
| `name` | `String` | Platform name. |
| `note` | `String` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `String` | Site path of the platform page, e.g. |
| `page_title` | `String` | Title of the sign-up page; null when unreachable. |
| `question` | `String` | The question answered, e.g. |
| `reese_account` | `Hash` | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `Hash` | Desk research on the platform's AI policy. |
| `rules_mentions` | `Hash` | Flags found in the platform's rules pages. |
| `rules_pages` | `Array` | Rules/terms page URLs that were read. |
| `rules_quotes` | `Array` | Quotes supporting the rules flags. |
| `signup_url` | `String` | Sign-up URL that was tested. |
| `stepped` | `Array` | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `String` | Display tone of the verdict: ok, mid, warn or bad. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Shelf record (raises on error).
shelf = client.Shelf.load({ "id" => "shelf_id" })
```

#### Example: List

```ruby
# list returns an Array of Shelf entities, one per record (raises on error).
shelfs = client.Shelf.list
shelfs.each { |item| puts item.data_get }
```


### Traffic

Create an instance: `traffic = client.Traffic`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ai_paths` | `Array` | Paths most requested by AI crawlers. |
| `crawler_tokens` | `Array` | Most frequent crawler tokens. |
| `daily` | `Array` | Per-day counts. |
| `distinct_mcp_or_report_callers` | `Integer` | Distinct callers of MCP or the report endpoint. |
| `human_referrers` | `Array` | Top human referrers. |
| `human_src_tags` | `Array` | Top ?src= tags on human visits. |
| `mcp_clients` | `Array` | MCP clients seen. |
| `note` | `String` | Explains the traffic classes (human, bot, search, ai, self). |
| `since` | `String` | First day covered (YYYY-MM-DD). |

#### Example: List

```ruby
# list returns an Array of Traffic entities, one per record (raises on error).
traffics = client.Traffic.list
traffics.each { |item| puts item.data_get }
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── AgentAccessIndex_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`AgentAccessIndex_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
traffic = client.Traffic
traffic.list()

# traffic.data_get now returns the traffic data from the last list
# traffic.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
