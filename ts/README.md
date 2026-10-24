# AgentAccessIndex TypeScript SDK



The TypeScript SDK for the AgentAccessIndex API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Dataset()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/agent-access-index-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/agent-access-index-sdk
npm install ./agent-access-index-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { AgentAccessIndexSDK } from '@voxgig-sdk/agent-access-index-sdk'

const client = new AgentAccessIndexSDK()
```

### 2. List dataset records

`list()` resolves to an array of Dataset ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const datasets = await client.Dataset().list()

for (const dataset of datasets) {
  console.log(dataset.data())
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const traffics = await client.Traffic().list()
  console.log(traffics.map((item) => item.data()))
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = AgentAccessIndexSDK.test()

const traffics = await client.Traffic().list()
// traffics is an array of Traffic entities, one per mock record
console.log(traffics.map((traffic) => traffic.data()))
```

You can also use the instance method:

```ts
const client = new AgentAccessIndexSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Traffic()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new AgentAccessIndexSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
AGENT_ACCESS_INDEX_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### AgentAccessIndexSDK

#### Constructor

```ts
new AgentAccessIndexSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Dataset(data?)` | `DatasetEntity` | Create a Dataset entity instance. |
| `IndexStat(data?)` | `IndexStatEntity` | Create an IndexStat entity instance. |
| `Lab(data?)` | `LabEntity` | Create a Lab entity instance. |
| `Shelf(data?)` | `ShelfEntity` | Create a Shelf entity instance. |
| `Traffic(data?)` | `TrafficEntity` | Create a Traffic entity instance. |
| `tester(testopts?, sdkopts?)` | `AgentAccessIndexSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `AgentAccessIndexSDK.test(testopts?, sdkopts?)` | `AgentAccessIndexSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): AgentAccessIndexSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: list.

API path: `/data/shelves.json`

#### IndexStat

| Field | Description |
| --- | --- |
| `by_family` | Platform count keyed by family. |
| `by_gate` | Platform count keyed by gate code. |
| `note` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `shelves` | Number of platforms in the index. |

Operations: load.

API path: `/api/stats`

#### Lab

| Field | Description |
| --- | --- |
| `before` | Earlier attempts and their verdicts. |
| `experiments` | Pre-registered experiments. |
| `updated` | Ledger update date (YYYY-MM-DD). |

Operations: list.

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

Operations: list, load.

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

Operations: list.

API path: `/api/traffic`



## Entities


### Dataset

Create an instance: `const dataset = client.Dataset()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_can_register` | `string` | Verdict on whether an AI agent can register. |
| `agent_reports` | `Record<string, any>` | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `string` | Plain-English answer. |
| `checked_at` | `string` | Date of the census check (YYYY-MM-DD). |
| `error` | `string` | Census error for this platform; null in every probed record (type unverified). |
| `family` | `string` | Platform family. |
| `family_title` | `string` | Human-readable family title. |
| `final_url` | `string` | URL reached after redirects; null when unreachable. |
| `fingerprint` | `string` | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `string` | Gate measured on the first pass, before a re-check. |
| `front_door` | `Record<string, any>` | What the census saw on the sign-up page. |
| `gate` | `string` | Measured sign-up gate code, e.g. |
| `gate_label` | `string` | Human-readable gate description. |
| `http_status` | `number` | HTTP status of the sign-up page; null when unreachable. |
| `id` | `string` | Platform (shelf) id, e.g. |
| `manual` | `Record<string, any>` | Manual override note. |
| `name` | `string` | Platform name. |
| `note` | `string` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `string` | Site path of the platform page, e.g. |
| `page_title` | `string` | Title of the sign-up page; null when unreachable. |
| `question` | `string` | The question answered, e.g. |
| `reese_account` | `Record<string, any>` | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `Record<string, any>` | Desk research on the platform's AI policy. |
| `rules_mentions` | `Record<string, any>` | Flags found in the platform's rules pages. |
| `rules_pages` | `any[]` | Rules/terms page URLs that were read. |
| `rules_quotes` | `any[]` | Quotes supporting the rules flags. |
| `signup_url` | `string` | Sign-up URL that was tested. |
| `stepped` | `any[]` | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `string` | Display tone of the verdict: ok, mid, warn or bad. |

#### Example: List

```ts
const datasets = await client.Dataset().list()
```


### IndexStat

Create an instance: `const index_stat = client.IndexStat()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `by_family` | `Record<string, any>` | Platform count keyed by family. |
| `by_gate` | `Record<string, any>` | Platform count keyed by gate code. |
| `note` | `string` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `shelves` | `number` | Number of platforms in the index. |

#### Example: Load

```ts
const index_stat = await client.IndexStat().load()
```


### Lab

Create an instance: `const lab = client.Lab()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `before` | `any[]` | Earlier attempts and their verdicts. |
| `experiments` | `any[]` | Pre-registered experiments. |
| `updated` | `string` | Ledger update date (YYYY-MM-DD). |

#### Example: List

```ts
const labs = await client.Lab().list()
```


### Shelf

Create an instance: `const shelf = client.Shelf()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agent_can_register` | `string` | Verdict on whether an AI agent can register. |
| `agent_reports` | `Record<string, any>` | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `string` | Plain-English answer. |
| `checked_at` | `string` | Date of the census check (YYYY-MM-DD). |
| `error` | `string` | Census error for this platform; null in every probed record (type unverified). |
| `family` | `string` | Platform family. |
| `family_title` | `string` | Human-readable family title. |
| `final_url` | `string` | URL reached after redirects; null when unreachable. |
| `fingerprint` | `string` | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `string` | Gate measured on the first pass, before a re-check. |
| `front_door` | `Record<string, any>` | What the census saw on the sign-up page. |
| `gate` | `string` | Measured sign-up gate code, e.g. |
| `gate_label` | `string` | Human-readable gate description. |
| `http_status` | `number` | HTTP status of the sign-up page; null when unreachable. |
| `id` | `string` | Platform (shelf) id, e.g. |
| `manual` | `Record<string, any>` | Manual override note. |
| `name` | `string` | Platform name. |
| `note` | `string` | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `string` | Site path of the platform page, e.g. |
| `page_title` | `string` | Title of the sign-up page; null when unreachable. |
| `question` | `string` | The question answered, e.g. |
| `reese_account` | `Record<string, any>` | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `Record<string, any>` | Desk research on the platform's AI policy. |
| `rules_mentions` | `Record<string, any>` | Flags found in the platform's rules pages. |
| `rules_pages` | `any[]` | Rules/terms page URLs that were read. |
| `rules_quotes` | `any[]` | Quotes supporting the rules flags. |
| `signup_url` | `string` | Sign-up URL that was tested. |
| `stepped` | `any[]` | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `string` | Display tone of the verdict: ok, mid, warn or bad. |

#### Example: Load

```ts
const shelf = await client.Shelf().load({ id: 'shelf_id' })
```

#### Example: List

```ts
const shelfs = await client.Shelf().list()
```


### Traffic

Create an instance: `const traffic = client.Traffic()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ai_paths` | `any[]` | Paths most requested by AI crawlers. |
| `crawler_tokens` | `any[]` | Most frequent crawler tokens. |
| `daily` | `any[]` | Per-day counts. |
| `distinct_mcp_or_report_callers` | `number` | Distinct callers of MCP or the report endpoint. |
| `human_referrers` | `any[]` | Top human referrers. |
| `human_src_tags` | `any[]` | Top ?src= tags on human visits. |
| `mcp_clients` | `any[]` | MCP clients seen. |
| `note` | `string` | Explains the traffic classes (human, bot, search, ai, self). |
| `since` | `string` | First day covered (YYYY-MM-DD). |

#### Example: List

```ts
const traffics = await client.Traffic().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
agent-access-index/
├── src/
│   ├── AgentAccessIndexSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { AgentAccessIndexSDK } from '@voxgig-sdk/agent-access-index-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const traffic = client.Traffic()
await traffic.list()

// traffic.data() now returns the traffic data from the last `list`
// traffic.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
