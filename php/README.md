# EleringDashboard PHP SDK

The PHP SDK for the EleringDashboard API. Provides an entity-oriented interface using PHP conventions.


## Install
```bash
composer require voxgig/elering-dashboard-sdk
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'eleringdashboard_sdk.php';

$client = new EleringDashboardSDK([
    "apikey" => getenv("ELERING-DASHBOARD_APIKEY"),
]);
```

### 3. Load a balance

```php
[$result, $err] = $client->Balance(null)->load(["id" => "example_id"], null);
if ($err) { throw new \Exception($err); }
print_r($result);
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
if ($err) { throw new \Exception($err); }

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
}
```

### Prepare a request without sending it

```php
[$fetchdef, $err] = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);
if ($err) { throw new \Exception($err); }

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = EleringDashboardSDK::test(null, null);

[$result, $err] = $client->EleringDashboard(null)->load(
    ["id" => "test01"], null
);
// $result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new EleringDashboardSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
ELERING-DASHBOARD_TEST_LIVE=TRUE
ELERING-DASHBOARD_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### EleringDashboardSDK

```php
require_once 'eleringdashboard_sdk.php';
$client = new EleringDashboardSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = EleringDashboardSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### EleringDashboardSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Balance` | `($data): BalanceEntity` | Create a Balance entity instance. |
| `BalanceController` | `($data): BalanceControllerEntity` | Create a BalanceController entity instance. |
| `Firm` | `($data): FirmEntity` | Create a Firm entity instance. |
| `FirmCapacityController` | `($data): FirmCapacityControllerEntity` | Create a FirmCapacityController entity instance. |
| `GasBalanceController` | `($data): GasBalanceControllerEntity` | Create a GasBalanceController entity instance. |
| `GasBorderTradeController` | `($data): GasBorderTradeControllerEntity` | Create a GasBorderTradeController entity instance. |
| `GasSystem` | `($data): GasSystemEntity` | Create a GasSystem entity instance. |
| `GasSystemController` | `($data): GasSystemControllerEntity` | Create a GasSystemController entity instance. |
| `GasTrade` | `($data): GasTradeEntity` | Create a GasTrade entity instance. |
| `GasTradeController` | `($data): GasTradeControllerEntity` | Create a GasTradeController entity instance. |
| `GasTransmissionController` | `($data): GasTransmissionControllerEntity` | Create a GasTransmissionController entity instance. |
| `GreenController` | `($data): GreenControllerEntity` | Create a GreenController entity instance. |
| `Interruptible` | `($data): InterruptibleEntity` | Create a Interruptible entity instance. |
| `InterruptibleCapacityController` | `($data): InterruptibleCapacityControllerEntity` | Create a InterruptibleCapacityController entity instance. |
| `Nomination` | `($data): NominationEntity` | Create a Nomination entity instance. |
| `NominationsController` | `($data): NominationsControllerEntity` | Create a NominationsController entity instance. |
| `NpsController` | `($data): NpsControllerEntity` | Create a NpsController entity instance. |
| `Renomination` | `($data): RenominationEntity` | Create a Renomination entity instance. |
| `RenominationsController` | `($data): RenominationsControllerEntity` | Create a RenominationsController entity instance. |
| `System` | `($data): SystemEntity` | Create a System entity instance. |
| `SystemController` | `($data): SystemControllerEntity` | Create a SystemController entity instance. |
| `TransmissionController` | `($data): TransmissionControllerEntity` | Create a TransmissionController entity instance. |
| `UmmGasController` | `($data): UmmGasControllerEntity` | Create a UmmGasController entity instance. |
| `UmmRssFeedController` | `($data): UmmRssFeedControllerEntity` | Create a UmmRssFeedController entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return `[$result, $err]`. The first value is an
`array` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Balance

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/balance`

#### BalanceController

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/balance/commerce/csv`

#### Firm

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/capacity/firm`

#### FirmCapacityController

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/capacity/firm/csv`

#### GasBalanceController

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/gas-balance/price/csv`

#### GasBorderTradeController

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/gas/border-trade/current`

#### GasSystem

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/gas-system`

#### GasSystemController

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/gas-system/csv`

#### GasTrade

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/gas-trade`

#### GasTradeController

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/gas-trade/csv`

#### GasTransmissionController

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/gas-transmission/cross-border/csv`

#### GreenController

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/green/certificates`

#### Interruptible

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/capacity/interruptible`

#### InterruptibleCapacityController

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/capacity/interruptible/csv`

#### Nomination

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/nominations`

#### NominationsController

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/nominations/csv`

#### NpsController

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/nps/price/csv`

#### Renomination

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/nominations/renominations`

#### RenominationsController

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/nominations/renominations/csv`

#### System

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/system`

#### SystemController

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/system/csv`

#### TransmissionController

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/transmission/cross-border-capacity/{group}/csv`

#### UmmGasController

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/umm/gas`

#### UmmRssFeedController

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/umm/gas/rss`



## Entities


### Balance

Create an instance: `const balance = client.Balance()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const balance = await client.Balance().load({ id: 'balance_id' })
```


### BalanceController

Create an instance: `const balance_controller = client.BalanceController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const balance_controller = await client.BalanceController().load({ id: 'balance_controller_id' })
```


### Firm

Create an instance: `const firm = client.Firm()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const firm = await client.Firm().load({ id: 'firm_id' })
```


### FirmCapacityController

Create an instance: `const firm_capacity_controller = client.FirmCapacityController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const firm_capacity_controller = await client.FirmCapacityController().load({ id: 'firm_capacity_controller_id' })
```


### GasBalanceController

Create an instance: `const gas_balance_controller = client.GasBalanceController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const gas_balance_controller = await client.GasBalanceController().load({ id: 'gas_balance_controller_id' })
```


### GasBorderTradeController

Create an instance: `const gas_border_trade_controller = client.GasBorderTradeController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const gas_border_trade_controller = await client.GasBorderTradeController().load({ id: 'gas_border_trade_controller_id' })
```


### GasSystem

Create an instance: `const gas_system = client.GasSystem()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const gas_system = await client.GasSystem().load({ id: 'gas_system_id' })
```


### GasSystemController

Create an instance: `const gas_system_controller = client.GasSystemController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const gas_system_controller = await client.GasSystemController().load({ id: 'gas_system_controller_id' })
```


### GasTrade

Create an instance: `const gas_trade = client.GasTrade()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const gas_trade = await client.GasTrade().load({ id: 'gas_trade_id' })
```


### GasTradeController

Create an instance: `const gas_trade_controller = client.GasTradeController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const gas_trade_controller = await client.GasTradeController().load({ id: 'gas_trade_controller_id' })
```


### GasTransmissionController

Create an instance: `const gas_transmission_controller = client.GasTransmissionController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const gas_transmission_controller = await client.GasTransmissionController().load({ id: 'gas_transmission_controller_id' })
```


### GreenController

Create an instance: `const green_controller = client.GreenController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const green_controller = await client.GreenController().load({ id: 'green_controller_id' })
```


### Interruptible

Create an instance: `const interruptible = client.Interruptible()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const interruptible = await client.Interruptible().load({ id: 'interruptible_id' })
```


### InterruptibleCapacityController

Create an instance: `const interruptible_capacity_controller = client.InterruptibleCapacityController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const interruptible_capacity_controller = await client.InterruptibleCapacityController().load({ id: 'interruptible_capacity_controller_id' })
```


### Nomination

Create an instance: `const nomination = client.Nomination()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const nomination = await client.Nomination().load({ id: 'nomination_id' })
```


### NominationsController

Create an instance: `const nominations_controller = client.NominationsController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const nominations_controller = await client.NominationsController().load({ id: 'nominations_controller_id' })
```


### NpsController

Create an instance: `const nps_controller = client.NpsController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const nps_controller = await client.NpsController().load({ id: 'nps_controller_id' })
```


### Renomination

Create an instance: `const renomination = client.Renomination()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const renomination = await client.Renomination().load({ id: 'renomination_id' })
```


### RenominationsController

Create an instance: `const renominations_controller = client.RenominationsController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const renominations_controller = await client.RenominationsController().load({ id: 'renominations_controller_id' })
```


### System

Create an instance: `const system = client.System()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const system = await client.System().load({ id: 'system_id' })
```


### SystemController

Create an instance: `const system_controller = client.SystemController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const system_controller = await client.SystemController().load({ id: 'system_controller_id' })
```


### TransmissionController

Create an instance: `const transmission_controller = client.TransmissionController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const transmission_controller = await client.TransmissionController().load({ id: 'transmission_controller_id' })
```


### UmmGasController

Create an instance: `const umm_gas_controller = client.UmmGasController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const umm_gas_controller = await client.UmmGasController().load({ id: 'umm_gas_controller_id' })
```


### UmmRssFeedController

Create an instance: `const umm_rss_feed_controller = client.UmmRssFeedController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const umm_rss_feed_controller = await client.UmmRssFeedController().load({ id: 'umm_rss_feed_controller_id' })
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── eleringdashboard_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`eleringdashboard_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$moon = $client->Moon();
[$result, $err] = $moon->load(["planet_id" => "earth", "id" => "luna"]);

// $moon->dataGet() now returns the loaded moon data
// $moon->matchGet() returns the last match criteria
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
