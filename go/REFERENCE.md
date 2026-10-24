# AgentAccessIndex Golang SDK Reference

Complete API reference for the AgentAccessIndex Golang SDK.


## AgentAccessIndexSDK

### Constructor

```go
func NewAgentAccessIndexSDK(options map[string]any) *AgentAccessIndexSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *AgentAccessIndexSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *AgentAccessIndexSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Dataset(data map[string]any) AgentAccessIndexEntity`

Create a new `Dataset` entity instance. Pass `nil` for no initial data.

#### `IndexStat(data map[string]any) AgentAccessIndexEntity`

Create a new `IndexStat` entity instance. Pass `nil` for no initial data.

#### `Lab(data map[string]any) AgentAccessIndexEntity`

Create a new `Lab` entity instance. Pass `nil` for no initial data.

#### `Shelf(data map[string]any) AgentAccessIndexEntity`

Create a new `Shelf` entity instance. Pass `nil` for no initial data.

#### `Traffic(data map[string]any) AgentAccessIndexEntity`

Create a new `Traffic` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## DatasetEntity

```go
dataset := client.Dataset(nil)
fmt.Println(dataset.GetName()) // "dataset"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_can_register` | `string` | Yes | Verdict on whether an AI agent can register. |
| `agent_reports` | `map[string]any` | No | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `string` | No | Plain-English answer. |
| `checked_at` | `string` | No | Date of the census check (YYYY-MM-DD). |
| `error` | `string` | No | Census error for this platform; null in every probed record (type unverified). |
| `family` | `string` | Yes | Platform family. |
| `family_title` | `string` | No | Human-readable family title. |
| `final_url` | `string` | No | URL reached after redirects; null when unreachable. |
| `fingerprint` | `string` | No | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `string` | No | Gate measured on the first pass, before a re-check. |
| `front_door` | `map[string]any` | No | What the census saw on the sign-up page. |
| `gate` | `string` | Yes | Measured sign-up gate code, e.g. |
| `gate_label` | `string` | No | Human-readable gate description. |
| `http_status` | `int` | No | HTTP status of the sign-up page; null when unreachable. |
| `id` | `string` | Yes | Platform (shelf) id, e.g. |
| `manual` | `map[string]any` | No | Manual override note. |
| `name` | `string` | Yes | Platform name. |
| `note` | `string` | No | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `string` | No | Site path of the platform page, e.g. |
| `page_title` | `string` | No | Title of the sign-up page; null when unreachable. |
| `question` | `string` | No | The question answered, e.g. |
| `reese_account` | `map[string]any` | No | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `map[string]any` | No | Desk research on the platform's AI policy. |
| `rules_mentions` | `map[string]any` | No | Flags found in the platform's rules pages. |
| `rules_pages` | `[]any` | No | Rules/terms page URLs that were read. |
| `rules_quotes` | `[]any` | No | Quotes supporting the rules flags. |
| `signup_url` | `string` | No | Sign-up URL that was tested. |
| `stepped` | `[]any` | No | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `string` | No | Display tone of the verdict: ok, mid, warn or bad. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Dataset(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DatasetEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## IndexStatEntity

```go
indexStat := client.IndexStat(nil)
fmt.Println(indexStat.GetName()) // "index_stat"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `by_family` | `map[string]any` | No | Platform count keyed by family. |
| `by_gate` | `map[string]any` | No | Platform count keyed by gate code. |
| `note` | `string` | No | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `shelves` | `int` | Yes | Number of platforms in the index. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.IndexStat(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IndexStatEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LabEntity

```go
lab := client.Lab(nil)
fmt.Println(lab.GetName()) // "lab"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | `[]any` | No | Earlier attempts and their verdicts. |
| `experiments` | `[]any` | No | Pre-registered experiments. |
| `updated` | `string` | No | Ledger update date (YYYY-MM-DD). |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Lab(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LabEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## ShelfEntity

```go
shelf := client.Shelf(nil)
fmt.Println(shelf.GetName()) // "shelf"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_can_register` | `string` | Yes | Verdict on whether an AI agent can register. |
| `agent_reports` | `map[string]any` | No | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `string` | No | Plain-English answer. |
| `checked_at` | `string` | No | Date of the census check (YYYY-MM-DD). |
| `error` | `string` | No | Census error for this platform; null in every probed record (type unverified). |
| `family` | `string` | Yes | Platform family. |
| `family_title` | `string` | No | Human-readable family title. |
| `final_url` | `string` | No | URL reached after redirects; null when unreachable. |
| `fingerprint` | `string` | No | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `string` | No | Gate measured on the first pass, before a re-check. |
| `front_door` | `map[string]any` | No | What the census saw on the sign-up page. |
| `gate` | `string` | Yes | Measured sign-up gate code, e.g. |
| `gate_label` | `string` | No | Human-readable gate description. |
| `http_status` | `int` | No | HTTP status of the sign-up page; null when unreachable. |
| `id` | `string` | Yes | Platform (shelf) id, e.g. |
| `manual` | `map[string]any` | No | Manual override note. |
| `name` | `string` | Yes | Platform name. |
| `note` | `string` | No | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `string` | No | Site path of the platform page, e.g. |
| `page_title` | `string` | No | Title of the sign-up page; null when unreachable. |
| `question` | `string` | No | The question answered, e.g. |
| `reese_account` | `map[string]any` | No | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `map[string]any` | No | Desk research on the platform's AI policy. |
| `rules_mentions` | `map[string]any` | No | Flags found in the platform's rules pages. |
| `rules_pages` | `[]any` | No | Rules/terms page URLs that were read. |
| `rules_quotes` | `[]any` | No | Quotes supporting the rules flags. |
| `signup_url` | `string` | No | Sign-up URL that was tested. |
| `stepped` | `[]any` | No | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `string` | No | Display tone of the verdict: ok, mid, warn or bad. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Shelf(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria. Returns the entity, whose record `Data()` reads; `err` is non-nil on failure.

```go
result, err := client.Shelf(nil).Load(map[string]any{"id": "shelf_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data())
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ShelfEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## TrafficEntity

```go
traffic := client.Traffic(nil)
fmt.Println(traffic.GetName()) // "traffic"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_paths` | `[]any` | No | Paths most requested by AI crawlers. |
| `crawler_tokens` | `[]any` | No | Most frequent crawler tokens. |
| `daily` | `[]any` | Yes | Per-day counts. |
| `distinct_mcp_or_report_callers` | `int` | No | Distinct callers of MCP or the report endpoint. |
| `human_referrers` | `[]any` | No | Top human referrers. |
| `human_src_tags` | `[]any` | No | Top ?src= tags on human visits. |
| `mcp_clients` | `[]any` | No | MCP clients seen. |
| `note` | `string` | No | Explains the traffic classes (human, bot, search, ai, self). |
| `since` | `string` | Yes | First day covered (YYYY-MM-DD). |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Traffic(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TrafficEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

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

```go
client := sdk.NewAgentAccessIndexSDK(map[string]any{
    "feature": map[string]any{
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
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

