# AgentAccessIndex PHP SDK Reference

Complete API reference for the AgentAccessIndex PHP SDK.


## AgentAccessIndexSDK

### Constructor

```php
require_once __DIR__ . '/agentaccessindex_sdk.php';

$client = new AgentAccessIndexSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AgentAccessIndexSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = AgentAccessIndexSDK::test();
```


### Instance Methods

#### `Dataset($data = null)`

Create a new `DatasetEntity` instance. Pass `null` for no initial data.

#### `IndexStat($data = null)`

Create a new `IndexStatEntity` instance. Pass `null` for no initial data.

#### `Lab($data = null)`

Create a new `LabEntity` instance. Pass `null` for no initial data.

#### `Shelf($data = null)`

Create a new `ShelfEntity` instance. Pass `null` for no initial data.

#### `Traffic($data = null)`

Create a new `TrafficEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): AgentAccessIndexUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## DatasetEntity

```php
$dataset = $client->Dataset();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_can_register` | `string` | Yes | Verdict on whether an AI agent can register. |
| `agent_reports` | `array` | No | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `string` | No | Plain-English answer. |
| `checked_at` | `string` | No | Date of the census check (YYYY-MM-DD). |
| `error` | `string` | No | Census error for this platform; null in every probed record (type unverified). |
| `family` | `string` | Yes | Platform family. |
| `family_title` | `string` | No | Human-readable family title. |
| `final_url` | `string` | No | URL reached after redirects; null when unreachable. |
| `fingerprint` | `string` | No | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `string` | No | Gate measured on the first pass, before a re-check. |
| `front_door` | `array` | No | What the census saw on the sign-up page. |
| `gate` | `string` | Yes | Measured sign-up gate code, e.g. |
| `gate_label` | `string` | No | Human-readable gate description. |
| `http_status` | `int` | No | HTTP status of the sign-up page; null when unreachable. |
| `id` | `string` | Yes | Platform (shelf) id, e.g. |
| `manual` | `array` | No | Manual override note. |
| `name` | `string` | Yes | Platform name. |
| `note` | `string` | No | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `string` | No | Site path of the platform page, e.g. |
| `page_title` | `string` | No | Title of the sign-up page; null when unreachable. |
| `question` | `string` | No | The question answered, e.g. |
| `reese_account` | `array` | No | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `array` | No | Desk research on the platform's AI policy. |
| `rules_mentions` | `array` | No | Flags found in the platform's rules pages. |
| `rules_pages` | `array` | No | Rules/terms page URLs that were read. |
| `rules_quotes` | `array` | No | Quotes supporting the rules flags. |
| `signup_url` | `string` | No | Sign-up URL that was tested. |
| `stepped` | `array` | No | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `string` | No | Display tone of the verdict: ok, mid, warn or bad. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Dataset()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DatasetEntity`

Create a new `DatasetEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IndexStatEntity

```php
$index_stat = $client->IndexStat();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `by_family` | `array` | No | Platform count keyed by family. |
| `by_gate` | `array` | No | Platform count keyed by gate code. |
| `note` | `string` | No | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `shelves` | `int` | Yes | Number of platforms in the index. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->IndexStat()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IndexStatEntity`

Create a new `IndexStatEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LabEntity

```php
$lab = $client->Lab();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | `array` | No | Earlier attempts and their verdicts. |
| `experiments` | `array` | No | Pre-registered experiments. |
| `updated` | `string` | No | Ledger update date (YYYY-MM-DD). |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Lab()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LabEntity`

Create a new `LabEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ShelfEntity

```php
$shelf = $client->Shelf();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agent_can_register` | `string` | Yes | Verdict on whether an AI agent can register. |
| `agent_reports` | `array` | No | Agent-reported outcomes (unverified, shown next to the measurement). |
| `answer` | `string` | No | Plain-English answer. |
| `checked_at` | `string` | No | Date of the census check (YYYY-MM-DD). |
| `error` | `string` | No | Census error for this platform; null in every probed record (type unverified). |
| `family` | `string` | Yes | Platform family. |
| `family_title` | `string` | No | Human-readable family title. |
| `final_url` | `string` | No | URL reached after redirects; null when unreachable. |
| `fingerprint` | `string` | No | Browser fingerprint used on a re-check. |
| `first_pass_gate` | `string` | No | Gate measured on the first pass, before a re-check. |
| `front_door` | `array` | No | What the census saw on the sign-up page. |
| `gate` | `string` | Yes | Measured sign-up gate code, e.g. |
| `gate_label` | `string` | No | Human-readable gate description. |
| `http_status` | `int` | No | HTTP status of the sign-up page; null when unreachable. |
| `id` | `string` | Yes | Platform (shelf) id, e.g. |
| `manual` | `array` | No | Manual override note. |
| `name` | `string` | Yes | Platform name. |
| `note` | `string` | No | Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof. |
| `page` | `string` | No | Site path of the platform page, e.g. |
| `page_title` | `string` | No | Title of the sign-up page; null when unreachable. |
| `question` | `string` | No | The question answered, e.g. |
| `reese_account` | `array` | No | Present when the measuring agent (Reese) holds an account on the platform. |
| `research` | `array` | No | Desk research on the platform's AI policy. |
| `rules_mentions` | `array` | No | Flags found in the platform's rules pages. |
| `rules_pages` | `array` | No | Rules/terms page URLs that were read. |
| `rules_quotes` | `array` | No | Quotes supporting the rules flags. |
| `signup_url` | `string` | No | Sign-up URL that was tested. |
| `stepped` | `array` | No | Button labels the census clicked through to reach the form; null when none. |
| `tone` | `string` | No | Display tone of the verdict: ok, mid, warn or bad. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Shelf()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Shelf()->load(["id" => "shelf_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ShelfEntity`

Create a new `ShelfEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TrafficEntity

```php
$traffic = $client->Traffic();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_paths` | `array` | No | Paths most requested by AI crawlers. |
| `crawler_tokens` | `array` | No | Most frequent crawler tokens. |
| `daily` | `array` | Yes | Per-day counts. |
| `distinct_mcp_or_report_callers` | `int` | No | Distinct callers of MCP or the report endpoint. |
| `human_referrers` | `array` | No | Top human referrers. |
| `human_src_tags` | `array` | No | Top ?src= tags on human visits. |
| `mcp_clients` | `array` | No | MCP clients seen. |
| `note` | `string` | No | Explains the traffic classes (human, bot, search, ai, self). |
| `since` | `string` | Yes | First day covered (YYYY-MM-DD). |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Traffic()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TrafficEntity`

Create a new `TrafficEntity` instance with the same client and
options.

#### `get_name(): string`

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

```php
$client = new AgentAccessIndexSDK([
  "feature" => [
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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

