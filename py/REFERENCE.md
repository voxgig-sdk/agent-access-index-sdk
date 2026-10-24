# AgentAccessIndex Python SDK Reference

Complete API reference for the AgentAccessIndex Python SDK.


## AgentAccessIndexSDK

### Constructor

```python
from agentaccessindex_sdk import AgentAccessIndexSDK

client = AgentAccessIndexSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AgentAccessIndexSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = AgentAccessIndexSDK.test()
```


### Instance Methods

#### `Dataset(data=None)`

Create a new `DatasetEntity` instance. Pass `None` for no initial data.

#### `IndexStat(data=None)`

Create a new `IndexStatEntity` instance. Pass `None` for no initial data.

#### `Lab(data=None)`

Create a new `LabEntity` instance. Pass `None` for no initial data.

#### `Shelf(data=None)`

Create a new `ShelfEntity` instance. Pass `None` for no initial data.

#### `Traffic(data=None)`

Create a new `TrafficEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## DatasetEntity

```python
dataset = client.Dataset()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_can_register` | `str` | Yes | Verdict on whether an AI agent can register. |
| `agent_reports` | `dict` | No | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `str` | No | Plain-English answer. |
| `checked_at` | `str` | No | Date of the census check (YYYY-MM-DD). |
| `error` | `str` | No | Census error for this platform; null in every probed record (type unverified). |
| `family` | `str` | Yes | Platform family. |
| `family_title` | `str` | No | Human-readable family title. |
| `final_url` | `str` | No | URL reached after redirects; null when unreachable. |
| `fingerprint` | `str` | No | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `str` | No | Gate measured on the first pass, before a re-check. |
| `front_door` | `dict` | No | What the census saw on the sign-up page. |
| `gate` | `str` | Yes | Measured sign-up gate code, e.g. |
| `gate_label` | `str` | No | Human-readable gate description. |
| `http_status` | `int` | No | HTTP status of the sign-up page; null when unreachable. |
| `id` | `str` | Yes | Platform (shelf) id, e.g. |
| `manual` | `dict` | No | Manual override note. |
| `name` | `str` | Yes | Platform name. |
| `note` | `str` | No | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `str` | No | Site path of the platform page, e.g. |
| `page_title` | `str` | No | Title of the sign-up page; null when unreachable. |
| `question` | `str` | No | The question answered, e.g. |
| `reese_account` | `dict` | No | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `dict` | No | Desk research on the platform's AI policy. |
| `rules_mentions` | `dict` | No | Flags found in the platform's rules pages. |
| `rules_pages` | `list` | No | Rules/terms page URLs that were read. |
| `rules_quotes` | `list` | No | Quotes supporting the rules flags. |
| `signup_url` | `str` | No | Sign-up URL that was tested. |
| `stepped` | `list` | No | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `str` | No | Display tone of the verdict: ok, mid, warn or bad. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[DatasetEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Dataset().list()
for dataset in results:
    print(dataset.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DatasetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IndexStatEntity

```python
index_stat = client.IndexStat()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `by_family` | `dict` | No | Platform count keyed by family. |
| `by_gate` | `dict` | No | Platform count keyed by gate code. |
| `note` | `str` | No | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `shelves` | `int` | Yes | Number of platforms in the index. |

### Operations

#### `load(reqmatch, ctrl=None) -> IndexStatEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.IndexStat().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IndexStatEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LabEntity

```python
lab = client.Lab()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | `list` | No | Earlier attempts and their verdicts. |
| `experiments` | `list` | No | Pre-registered experiments. |
| `updated` | `str` | No | Ledger update date (YYYY-MM-DD). |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[LabEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Lab().list()
for lab in results:
    print(lab.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LabEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ShelfEntity

```python
shelf = client.Shelf()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_can_register` | `str` | Yes | Verdict on whether an AI agent can register. |
| `agent_reports` | `dict` | No | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `str` | No | Plain-English answer. |
| `checked_at` | `str` | No | Date of the census check (YYYY-MM-DD). |
| `error` | `str` | No | Census error for this platform; null in every probed record (type unverified). |
| `family` | `str` | Yes | Platform family. |
| `family_title` | `str` | No | Human-readable family title. |
| `final_url` | `str` | No | URL reached after redirects; null when unreachable. |
| `fingerprint` | `str` | No | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `str` | No | Gate measured on the first pass, before a re-check. |
| `front_door` | `dict` | No | What the census saw on the sign-up page. |
| `gate` | `str` | Yes | Measured sign-up gate code, e.g. |
| `gate_label` | `str` | No | Human-readable gate description. |
| `http_status` | `int` | No | HTTP status of the sign-up page; null when unreachable. |
| `id` | `str` | Yes | Platform (shelf) id, e.g. |
| `manual` | `dict` | No | Manual override note. |
| `name` | `str` | Yes | Platform name. |
| `note` | `str` | No | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `str` | No | Site path of the platform page, e.g. |
| `page_title` | `str` | No | Title of the sign-up page; null when unreachable. |
| `question` | `str` | No | The question answered, e.g. |
| `reese_account` | `dict` | No | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `dict` | No | Desk research on the platform's AI policy. |
| `rules_mentions` | `dict` | No | Flags found in the platform's rules pages. |
| `rules_pages` | `list` | No | Rules/terms page URLs that were read. |
| `rules_quotes` | `list` | No | Quotes supporting the rules flags. |
| `signup_url` | `str` | No | Sign-up URL that was tested. |
| `stepped` | `list` | No | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `str` | No | Display tone of the verdict: ok, mid, warn or bad. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ShelfEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Shelf().list()
for shelf in results:
    print(shelf.data_get())
```

#### `load(reqmatch, ctrl=None) -> ShelfEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Shelf().load({"id": "shelf_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ShelfEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TrafficEntity

```python
traffic = client.Traffic()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_paths` | `list` | No | Paths most requested by AI crawlers. |
| `crawler_tokens` | `list` | No | Most frequent crawler tokens. |
| `daily` | `list` | Yes | Per-day counts. |
| `distinct_mcp_or_report_callers` | `int` | No | Distinct callers of MCP or the report endpoint. |
| `human_referrers` | `list` | No | Top human referrers. |
| `human_src_tags` | `list` | No | Top ?src= tags on human visits. |
| `mcp_clients` | `list` | No | MCP clients seen. |
| `note` | `str` | No | Explains the traffic classes (human, bot, search, ai, self). |
| `since` | `str` | Yes | First day covered (YYYY-MM-DD). |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[TrafficEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Traffic().list()
for traffic in results:
    print(traffic.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TrafficEntity` instance with the same options.

#### `get_name() -> str`

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

```python
client = AgentAccessIndexSDK({
    "feature": {
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

