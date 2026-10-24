# AgentAccessIndex Golang SDK



The Golang SDK for the AgentAccessIndex API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Dataset(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/agent-access-index-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/agent-access-index-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/agent-access-index-sdk/go=../agent-access-index-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/agent-access-index-sdk/go"
)

func main() {
    client := sdk.New()

    // List dataset records — the value is a []any of entities, one per record.
    datasets, err := client.Dataset(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range datasets.([]any) {
        fmt.Println(item.(sdk.Entity).Data())
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
traffics, err := client.Traffic(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = traffics
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

traffics, err := client.Traffic(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
// A []any of entities, one per mock record.
for _, item := range traffics.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewAgentAccessIndexSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewAgentAccessIndexSDK

```go
func NewAgentAccessIndexSDK(options map[string]any) *AgentAccessIndexSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *AgentAccessIndexSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### AgentAccessIndexSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Dataset` | `(data map[string]any) AgentAccessIndexEntity` | Create a Dataset entity instance. |
| `IndexStat` | `(data map[string]any) AgentAccessIndexEntity` | Create an IndexStat entity instance. |
| `Lab` | `(data map[string]any) AgentAccessIndexEntity` | Create a Lab entity instance. |
| `Shelf` | `(data map[string]any) AgentAccessIndexEntity` | Create a Shelf entity instance. |
| `Traffic` | `(data map[string]any) AgentAccessIndexEntity` | Create a Traffic entity instance. |

### Entity interface (AgentAccessIndexEntity)

All entities implement the `AgentAccessIndexEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    dataset, err := client.Dataset(nil).List(nil, nil)
    if err != nil { /* handle */ }
    // dataset is a []any of entities, one per record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Dataset

| Field | Description |
| --- | --- |
| `"agent_can_register"` | Verdict on whether an AI agent can register. |
| `"agent_reports"` | Agent-reported outcomes (unverified, shown next to the measurement). |
| `"answer"` | Plain-English answer. |
| `"checked_at"` | Date of the census check (YYYY-MM-DD). |
| `"error"` | Census error for this platform; null in every probed record (type unverified). |
| `"family"` | Platform family. |
| `"family_title"` | Human-readable family title. |
| `"final_url"` | URL reached after redirects; null when unreachable. |
| `"fingerprint"` | Browser fingerprint used on a re-check. |
| `"first_pass_gate"` | Gate measured on the first pass, before a re-check. |
| `"front_door"` | What the census saw on the sign-up page. |
| `"gate"` | Measured sign-up gate code, e.g. |
| `"gate_label"` | Human-readable gate description. |
| `"http_status"` | HTTP status of the sign-up page; null when unreachable. |
| `"id"` | Platform (shelf) id, e.g. |
| `"manual"` | Manual override note. |
| `"name"` | Platform name. |
| `"note"` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `"page"` | Site path of the platform page, e.g. |
| `"page_title"` | Title of the sign-up page; null when unreachable. |
| `"question"` | The question answered, e.g. |
| `"reese_account"` | Present when the measuring agent (Reese) holds an account on the platform. |
| `"research"` | Desk research on the platform's AI policy. |
| `"rules_mentions"` | Flags found in the platform's rules pages. |
| `"rules_pages"` | Rules/terms page URLs that were read. |
| `"rules_quotes"` | Quotes supporting the rules flags. |
| `"signup_url"` | Sign-up URL that was tested. |
| `"stepped"` | Button labels the census clicked through to reach the form; null when none. |
| `"tone"` | Display tone of the verdict: ok, mid, warn or bad. |

Operations: List.

API path: `/data/shelves.json`

#### IndexStat

| Field | Description |
| --- | --- |
| `"by_family"` | Platform count keyed by family. |
| `"by_gate"` | Platform count keyed by gate code. |
| `"note"` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `"shelves"` | Number of platforms in the index. |

Operations: Load.

API path: `/api/stats`

#### Lab

| Field | Description |
| --- | --- |
| `"before"` | Earlier attempts and their verdicts. |
| `"experiments"` | Pre-registered experiments. |
| `"updated"` | Ledger update date (YYYY-MM-DD). |

Operations: List.

API path: `/data/lab.json`

#### Shelf

| Field | Description |
| --- | --- |
| `"agent_can_register"` | Verdict on whether an AI agent can register. |
| `"agent_reports"` | Agent-reported outcomes (unverified, shown next to the measurement). |
| `"answer"` | Plain-English answer. |
| `"checked_at"` | Date of the census check (YYYY-MM-DD). |
| `"error"` | Census error for this platform; null in every probed record (type unverified). |
| `"family"` | Platform family. |
| `"family_title"` | Human-readable family title. |
| `"final_url"` | URL reached after redirects; null when unreachable. |
| `"fingerprint"` | Browser fingerprint used on a re-check. |
| `"first_pass_gate"` | Gate measured on the first pass, before a re-check. |
| `"front_door"` | What the census saw on the sign-up page. |
| `"gate"` | Measured sign-up gate code, e.g. |
| `"gate_label"` | Human-readable gate description. |
| `"http_status"` | HTTP status of the sign-up page; null when unreachable. |
| `"id"` | Platform (shelf) id, e.g. |
| `"manual"` | Manual override note. |
| `"name"` | Platform name. |
| `"note"` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `"page"` | Site path of the platform page, e.g. |
| `"page_title"` | Title of the sign-up page; null when unreachable. |
| `"question"` | The question answered, e.g. |
| `"reese_account"` | Present when the measuring agent (Reese) holds an account on the platform. |
| `"research"` | Desk research on the platform's AI policy. |
| `"rules_mentions"` | Flags found in the platform's rules pages. |
| `"rules_pages"` | Rules/terms page URLs that were read. |
| `"rules_quotes"` | Quotes supporting the rules flags. |
| `"signup_url"` | Sign-up URL that was tested. |
| `"stepped"` | Button labels the census clicked through to reach the form; null when none. |
| `"tone"` | Display tone of the verdict: ok, mid, warn or bad. |

Operations: List, Load.

API path: `/api/shelves`

#### Traffic

| Field | Description |
| --- | --- |
| `"ai_paths"` | Paths most requested by AI crawlers. |
| `"crawler_tokens"` | Most frequent crawler tokens. |
| `"daily"` | Per-day counts. |
| `"distinct_mcp_or_report_callers"` | Distinct callers of MCP or the report endpoint. |
| `"human_referrers"` | Top human referrers. |
| `"human_src_tags"` | Top ?src= tags on human visits. |
| `"mcp_clients"` | MCP clients seen. |
| `"note"` | Explains the traffic classes (human, bot, search, ai, self). |
| `"since"` | First day covered (YYYY-MM-DD). |

Operations: List.

API path: `/api/traffic`



## Entities


### Dataset

Create an instance: `dataset := client.Dataset(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_can_register` | `string` | Verdict on whether an AI agent can register. |
| `agent_reports` | `map[string]any` | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `string` | Plain-English answer. |
| `checked_at` | `string` | Date of the census check (YYYY-MM-DD). |
| `error` | `string` | Census error for this platform; null in every probed record (type unverified). |
| `family` | `string` | Platform family. |
| `family_title` | `string` | Human-readable family title. |
| `final_url` | `string` | URL reached after redirects; null when unreachable. |
| `fingerprint` | `string` | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `string` | Gate measured on the first pass, before a re-check. |
| `front_door` | `map[string]any` | What the census saw on the sign-up page. |
| `gate` | `string` | Measured sign-up gate code, e.g. |
| `gate_label` | `string` | Human-readable gate description. |
| `http_status` | `int` | HTTP status of the sign-up page; null when unreachable. |
| `id` | `string` | Platform (shelf) id, e.g. |
| `manual` | `map[string]any` | Manual override note. |
| `name` | `string` | Platform name. |
| `note` | `string` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `string` | Site path of the platform page, e.g. |
| `page_title` | `string` | Title of the sign-up page; null when unreachable. |
| `question` | `string` | The question answered, e.g. |
| `reese_account` | `map[string]any` | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `map[string]any` | Desk research on the platform's AI policy. |
| `rules_mentions` | `map[string]any` | Flags found in the platform's rules pages. |
| `rules_pages` | `[]any` | Rules/terms page URLs that were read. |
| `rules_quotes` | `[]any` | Quotes supporting the rules flags. |
| `signup_url` | `string` | Sign-up URL that was tested. |
| `stepped` | `[]any` | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `string` | Display tone of the verdict: ok, mid, warn or bad. |

#### Example: List

```go
datasets, err := client.Dataset(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range datasets.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### IndexStat

Create an instance: `indexStat := client.IndexStat(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `by_family` | `map[string]any` | Platform count keyed by family. |
| `by_gate` | `map[string]any` | Platform count keyed by gate code. |
| `note` | `string` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `shelves` | `int` | Number of platforms in the index. |

#### Example: Load

```go
indexStat, err := client.IndexStat(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(indexStat.(sdk.Entity).Data()) // the loaded entity's record
```


### Lab

Create an instance: `lab := client.Lab(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `before` | `[]any` | Earlier attempts and their verdicts. |
| `experiments` | `[]any` | Pre-registered experiments. |
| `updated` | `string` | Ledger update date (YYYY-MM-DD). |

#### Example: List

```go
labs, err := client.Lab(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range labs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Shelf

Create an instance: `shelf := client.Shelf(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_can_register` | `string` | Verdict on whether an AI agent can register. |
| `agent_reports` | `map[string]any` | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `string` | Plain-English answer. |
| `checked_at` | `string` | Date of the census check (YYYY-MM-DD). |
| `error` | `string` | Census error for this platform; null in every probed record (type unverified). |
| `family` | `string` | Platform family. |
| `family_title` | `string` | Human-readable family title. |
| `final_url` | `string` | URL reached after redirects; null when unreachable. |
| `fingerprint` | `string` | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `string` | Gate measured on the first pass, before a re-check. |
| `front_door` | `map[string]any` | What the census saw on the sign-up page. |
| `gate` | `string` | Measured sign-up gate code, e.g. |
| `gate_label` | `string` | Human-readable gate description. |
| `http_status` | `int` | HTTP status of the sign-up page; null when unreachable. |
| `id` | `string` | Platform (shelf) id, e.g. |
| `manual` | `map[string]any` | Manual override note. |
| `name` | `string` | Platform name. |
| `note` | `string` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `string` | Site path of the platform page, e.g. |
| `page_title` | `string` | Title of the sign-up page; null when unreachable. |
| `question` | `string` | The question answered, e.g. |
| `reese_account` | `map[string]any` | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `map[string]any` | Desk research on the platform's AI policy. |
| `rules_mentions` | `map[string]any` | Flags found in the platform's rules pages. |
| `rules_pages` | `[]any` | Rules/terms page URLs that were read. |
| `rules_quotes` | `[]any` | Quotes supporting the rules flags. |
| `signup_url` | `string` | Sign-up URL that was tested. |
| `stepped` | `[]any` | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `string` | Display tone of the verdict: ok, mid, warn or bad. |

#### Example: Load

```go
shelf, err := client.Shelf(nil).Load(map[string]any{"id": "shelf_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(shelf.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
shelfs, err := client.Shelf(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range shelfs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Traffic

Create an instance: `traffic := client.Traffic(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ai_paths` | `[]any` | Paths most requested by AI crawlers. |
| `crawler_tokens` | `[]any` | Most frequent crawler tokens. |
| `daily` | `[]any` | Per-day counts. |
| `distinct_mcp_or_report_callers` | `int` | Distinct callers of MCP or the report endpoint. |
| `human_referrers` | `[]any` | Top human referrers. |
| `human_src_tags` | `[]any` | Top ?src= tags on human visits. |
| `mcp_clients` | `[]any` | MCP clients seen. |
| `note` | `string` | Explains the traffic classes (human, bot, search, ai, self). |
| `since` | `string` | First day covered (YYYY-MM-DD). |

#### Example: List

```go
traffics, err := client.Traffic(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range traffics.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/agent-access-index-sdk/go/
├── agent-access-index.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/agent-access-index-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
traffic := client.Traffic(nil)
traffic.List(nil, nil)

// traffic.Data() now returns the traffic data from the last list
// traffic.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
