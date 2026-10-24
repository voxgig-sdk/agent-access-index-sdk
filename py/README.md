# AgentAccessIndex Python SDK



The Python SDK for the AgentAccessIndex API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Dataset()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/agent-access-index-sdk/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from agentaccessindex_sdk import AgentAccessIndexSDK

client = AgentAccessIndexSDK()
```

### 2. List dataset records

`list()` returns a `list` of entities, one per record, and raises on
error; an entity's `data_get()` reads its record (a `dict`).

```python
try:
    datasets = client.Dataset().list()
    for dataset in datasets:
        print(dataset.data_get())
except Exception as err:
    print(f"list failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    traffics = client.Traffic().list()
    print([item.data_get() for item in traffics])
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = AgentAccessIndexSDK.test()

# Entity ops return the entity, and list one per record; they raise on error.
traffic = client.Traffic().list()
# data_get() on an entity reads its mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = AgentAccessIndexSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### AgentAccessIndexSDK

```python
from agentaccessindex_sdk import AgentAccessIndexSDK

client = AgentAccessIndexSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = AgentAccessIndexSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### AgentAccessIndexSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria, one per record. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` a `list` of entities, one
per record; an entity's `data_get()` reads its record (a `dict`). They raise
on error, so wrap calls in `try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `dataset = client.Dataset()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_can_register` | `str` | Verdict on whether an AI agent can register. |
| `agent_reports` | `dict` | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `str` | Plain-English answer. |
| `checked_at` | `str` | Date of the census check (YYYY-MM-DD). |
| `error` | `str` | Census error for this platform; null in every probed record (type unverified). |
| `family` | `str` | Platform family. |
| `family_title` | `str` | Human-readable family title. |
| `final_url` | `str` | URL reached after redirects; null when unreachable. |
| `fingerprint` | `str` | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `str` | Gate measured on the first pass, before a re-check. |
| `front_door` | `dict` | What the census saw on the sign-up page. |
| `gate` | `str` | Measured sign-up gate code, e.g. |
| `gate_label` | `str` | Human-readable gate description. |
| `http_status` | `int` | HTTP status of the sign-up page; null when unreachable. |
| `id` | `str` | Platform (shelf) id, e.g. |
| `manual` | `dict` | Manual override note. |
| `name` | `str` | Platform name. |
| `note` | `str` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `str` | Site path of the platform page, e.g. |
| `page_title` | `str` | Title of the sign-up page; null when unreachable. |
| `question` | `str` | The question answered, e.g. |
| `reese_account` | `dict` | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `dict` | Desk research on the platform's AI policy. |
| `rules_mentions` | `dict` | Flags found in the platform's rules pages. |
| `rules_pages` | `list` | Rules/terms page URLs that were read. |
| `rules_quotes` | `list` | Quotes supporting the rules flags. |
| `signup_url` | `str` | Sign-up URL that was tested. |
| `stepped` | `list` | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `str` | Display tone of the verdict: ok, mid, warn or bad. |

#### Example: List

```python
datasets = client.Dataset().list()
```


### IndexStat

Create an instance: `index_stat = client.IndexStat()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `by_family` | `dict` | Platform count keyed by family. |
| `by_gate` | `dict` | Platform count keyed by gate code. |
| `note` | `str` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `shelves` | `int` | Number of platforms in the index. |

#### Example: Load

```python
index_stat = client.IndexStat().load()
```


### Lab

Create an instance: `lab = client.Lab()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `before` | `list` | Earlier attempts and their verdicts. |
| `experiments` | `list` | Pre-registered experiments. |
| `updated` | `str` | Ledger update date (YYYY-MM-DD). |

#### Example: List

```python
labs = client.Lab().list()
```


### Shelf

Create an instance: `shelf = client.Shelf()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_can_register` | `str` | Verdict on whether an AI agent can register. |
| `agent_reports` | `dict` | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `str` | Plain-English answer. |
| `checked_at` | `str` | Date of the census check (YYYY-MM-DD). |
| `error` | `str` | Census error for this platform; null in every probed record (type unverified). |
| `family` | `str` | Platform family. |
| `family_title` | `str` | Human-readable family title. |
| `final_url` | `str` | URL reached after redirects; null when unreachable. |
| `fingerprint` | `str` | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `str` | Gate measured on the first pass, before a re-check. |
| `front_door` | `dict` | What the census saw on the sign-up page. |
| `gate` | `str` | Measured sign-up gate code, e.g. |
| `gate_label` | `str` | Human-readable gate description. |
| `http_status` | `int` | HTTP status of the sign-up page; null when unreachable. |
| `id` | `str` | Platform (shelf) id, e.g. |
| `manual` | `dict` | Manual override note. |
| `name` | `str` | Platform name. |
| `note` | `str` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `str` | Site path of the platform page, e.g. |
| `page_title` | `str` | Title of the sign-up page; null when unreachable. |
| `question` | `str` | The question answered, e.g. |
| `reese_account` | `dict` | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `dict` | Desk research on the platform's AI policy. |
| `rules_mentions` | `dict` | Flags found in the platform's rules pages. |
| `rules_pages` | `list` | Rules/terms page URLs that were read. |
| `rules_quotes` | `list` | Quotes supporting the rules flags. |
| `signup_url` | `str` | Sign-up URL that was tested. |
| `stepped` | `list` | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `str` | Display tone of the verdict: ok, mid, warn or bad. |

#### Example: Load

```python
shelf = client.Shelf().load({"id": "shelf_id"})
```

#### Example: List

```python
shelfs = client.Shelf().list()
```


### Traffic

Create an instance: `traffic = client.Traffic()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ai_paths` | `list` | Paths most requested by AI crawlers. |
| `crawler_tokens` | `list` | Most frequent crawler tokens. |
| `daily` | `list` | Per-day counts. |
| `distinct_mcp_or_report_callers` | `int` | Distinct callers of MCP or the report endpoint. |
| `human_referrers` | `list` | Top human referrers. |
| `human_src_tags` | `list` | Top ?src= tags on human visits. |
| `mcp_clients` | `list` | MCP clients seen. |
| `note` | `str` | Explains the traffic classes (human, bot, search, ai, self). |
| `since` | `str` | First day covered (YYYY-MM-DD). |

#### Example: List

```python
traffics = client.Traffic().list()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── agentaccessindex_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`agentaccessindex_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
traffic = client.Traffic()
traffic.list()

# traffic.data_get() now returns the traffic data from the last list
# traffic.match_get() returns the last match criteria
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
