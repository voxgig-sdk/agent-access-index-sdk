# AgentAccessIndex TypeScript SDK Reference

Complete API reference for the AgentAccessIndex TypeScript SDK.


## AgentAccessIndexSDK

### Constructor

```ts
new AgentAccessIndexSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AgentAccessIndexSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = AgentAccessIndexSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `AgentAccessIndexSDK` instance in test mode.


### Instance Methods

#### `Dataset(data?: object)`

Create a new `Dataset` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DatasetEntity` instance.

#### `IndexStat(data?: object)`

Create a new `IndexStat` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IndexStatEntity` instance.

#### `Lab(data?: object)`

Create a new `Lab` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LabEntity` instance.

#### `Shelf(data?: object)`

Create a new `Shelf` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ShelfEntity` instance.

#### `Traffic(data?: object)`

Create a new `Traffic` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TrafficEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `AgentAccessIndexSDK.test()`.

**Returns:** `AgentAccessIndexSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## DatasetEntity

```ts
const dataset = client.Dataset()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_can_register` | `string` | Yes | Verdict on whether an AI agent can register. |
| `agent_reports` | `Record<string, any>` | No | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `string` | No | Plain-English answer. |
| `checked_at` | `string` | No | Date of the census check (YYYY-MM-DD). |
| `error` | `string` | No | Census error for this platform; null in every probed record (type unverified). |
| `family` | `string` | Yes | Platform family. |
| `family_title` | `string` | No | Human-readable family title. |
| `final_url` | `string` | No | URL reached after redirects; null when unreachable. |
| `fingerprint` | `string` | No | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `string` | No | Gate measured on the first pass, before a re-check. |
| `front_door` | `Record<string, any>` | No | What the census saw on the sign-up page. |
| `gate` | `string` | Yes | Measured sign-up gate code, e.g. |
| `gate_label` | `string` | No | Human-readable gate description. |
| `http_status` | `number` | No | HTTP status of the sign-up page; null when unreachable. |
| `id` | `string` | Yes | Platform (shelf) id, e.g. |
| `manual` | `Record<string, any>` | No | Manual override note. |
| `name` | `string` | Yes | Platform name. |
| `note` | `string` | No | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `string` | No | Site path of the platform page, e.g. |
| `page_title` | `string` | No | Title of the sign-up page; null when unreachable. |
| `question` | `string` | No | The question answered, e.g. |
| `reese_account` | `Record<string, any>` | No | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `Record<string, any>` | No | Desk research on the platform's AI policy. |
| `rules_mentions` | `Record<string, any>` | No | Flags found in the platform's rules pages. |
| `rules_pages` | `any[]` | No | Rules/terms page URLs that were read. |
| `rules_quotes` | `any[]` | No | Quotes supporting the rules flags. |
| `signup_url` | `string` | No | Sign-up URL that was tested. |
| `stepped` | `any[]` | No | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `string` | No | Display tone of the verdict: ok, mid, warn or bad. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Dataset().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DatasetEntity` instance with the same client and
options.

#### `client()`

Return the parent `AgentAccessIndexSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IndexStatEntity

```ts
const index_stat = client.IndexStat()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `by_family` | `Record<string, any>` | No | Platform count keyed by family. |
| `by_gate` | `Record<string, any>` | No | Platform count keyed by gate code. |
| `note` | `string` | No | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `shelves` | `number` | Yes | Number of platforms in the index. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.IndexStat().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IndexStatEntity` instance with the same client and
options.

#### `client()`

Return the parent `AgentAccessIndexSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LabEntity

```ts
const lab = client.Lab()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | `any[]` | No | Earlier attempts and their verdicts. |
| `experiments` | `any[]` | No | Pre-registered experiments. |
| `updated` | `string` | No | Ledger update date (YYYY-MM-DD). |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Lab().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LabEntity` instance with the same client and
options.

#### `client()`

Return the parent `AgentAccessIndexSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ShelfEntity

```ts
const shelf = client.Shelf()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_can_register` | `string` | Yes | Verdict on whether an AI agent can register. |
| `agent_reports` | `Record<string, any>` | No | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `string` | No | Plain-English answer. |
| `checked_at` | `string` | No | Date of the census check (YYYY-MM-DD). |
| `error` | `string` | No | Census error for this platform; null in every probed record (type unverified). |
| `family` | `string` | Yes | Platform family. |
| `family_title` | `string` | No | Human-readable family title. |
| `final_url` | `string` | No | URL reached after redirects; null when unreachable. |
| `fingerprint` | `string` | No | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `string` | No | Gate measured on the first pass, before a re-check. |
| `front_door` | `Record<string, any>` | No | What the census saw on the sign-up page. |
| `gate` | `string` | Yes | Measured sign-up gate code, e.g. |
| `gate_label` | `string` | No | Human-readable gate description. |
| `http_status` | `number` | No | HTTP status of the sign-up page; null when unreachable. |
| `id` | `string` | Yes | Platform (shelf) id, e.g. |
| `manual` | `Record<string, any>` | No | Manual override note. |
| `name` | `string` | Yes | Platform name. |
| `note` | `string` | No | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `string` | No | Site path of the platform page, e.g. |
| `page_title` | `string` | No | Title of the sign-up page; null when unreachable. |
| `question` | `string` | No | The question answered, e.g. |
| `reese_account` | `Record<string, any>` | No | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `Record<string, any>` | No | Desk research on the platform's AI policy. |
| `rules_mentions` | `Record<string, any>` | No | Flags found in the platform's rules pages. |
| `rules_pages` | `any[]` | No | Rules/terms page URLs that were read. |
| `rules_quotes` | `any[]` | No | Quotes supporting the rules flags. |
| `signup_url` | `string` | No | Sign-up URL that was tested. |
| `stepped` | `any[]` | No | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `string` | No | Display tone of the verdict: ok, mid, warn or bad. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Shelf().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Shelf().load({ id: 'shelf_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ShelfEntity` instance with the same client and
options.

#### `client()`

Return the parent `AgentAccessIndexSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TrafficEntity

```ts
const traffic = client.Traffic()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_paths` | `any[]` | No | Paths most requested by AI crawlers. |
| `crawler_tokens` | `any[]` | No | Most frequent crawler tokens. |
| `daily` | `any[]` | Yes | Per-day counts. |
| `distinct_mcp_or_report_callers` | `number` | No | Distinct callers of MCP or the report endpoint. |
| `human_referrers` | `any[]` | No | Top human referrers. |
| `human_src_tags` | `any[]` | No | Top ?src= tags on human visits. |
| `mcp_clients` | `any[]` | No | MCP clients seen. |
| `note` | `string` | No | Explains the traffic classes (human, bot, search, ai, self). |
| `since` | `string` | Yes | First day covered (YYYY-MM-DD). |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Traffic().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TrafficEntity` instance with the same client and
options.

#### `client()`

Return the parent `AgentAccessIndexSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ts
const client = new AgentAccessIndexSDK({
  feature: {
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
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

