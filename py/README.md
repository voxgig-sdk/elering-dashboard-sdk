# EleringDashboard Python SDK

The Python SDK for the EleringDashboard API. Provides an entity-oriented interface following Pythonic conventions.


## Install
```bash
pip install elering-dashboard-sdk
```

Or install from source:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from eleringdashboard_sdk import EleringDashboardSDK

client = EleringDashboardSDK({})
```

### 3. Load a balance

```python
result, err = client.Balance(None).load({"id": "example_id"}, None)
if err:
    raise Exception(err)
print(result)
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
```

### Prepare a request without sending it

```python
fetchdef, err = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = EleringDashboardSDK.test(None, None)

result, err = client.EleringDashboard(None).load(
    {"id": "test01"}, None
)
# result contains mock response data
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

client = EleringDashboardSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
ELERING-DASHBOARD_TEST_LIVE=TRUE
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### EleringDashboardSDK

```python
from eleringdashboard_sdk import EleringDashboardSDK

client = EleringDashboardSDK(options)
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
client = EleringDashboardSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### EleringDashboardSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> (dict, err)` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> (dict, err)` | Build and send an HTTP request. |
| `Balance` | `(data) -> BalanceEntity` | Create a Balance entity instance. |
| `BalanceController` | `(data) -> BalanceControllerEntity` | Create a BalanceController entity instance. |
| `Firm` | `(data) -> FirmEntity` | Create a Firm entity instance. |
| `FirmCapacityController` | `(data) -> FirmCapacityControllerEntity` | Create a FirmCapacityController entity instance. |
| `GasBalanceController` | `(data) -> GasBalanceControllerEntity` | Create a GasBalanceController entity instance. |
| `GasBorderTradeController` | `(data) -> GasBorderTradeControllerEntity` | Create a GasBorderTradeController entity instance. |
| `GasSystem` | `(data) -> GasSystemEntity` | Create a GasSystem entity instance. |
| `GasSystemController` | `(data) -> GasSystemControllerEntity` | Create a GasSystemController entity instance. |
| `GasTrade` | `(data) -> GasTradeEntity` | Create a GasTrade entity instance. |
| `GasTradeController` | `(data) -> GasTradeControllerEntity` | Create a GasTradeController entity instance. |
| `GasTransmissionController` | `(data) -> GasTransmissionControllerEntity` | Create a GasTransmissionController entity instance. |
| `GreenController` | `(data) -> GreenControllerEntity` | Create a GreenController entity instance. |
| `Interruptible` | `(data) -> InterruptibleEntity` | Create a Interruptible entity instance. |
| `InterruptibleCapacityController` | `(data) -> InterruptibleCapacityControllerEntity` | Create a InterruptibleCapacityController entity instance. |
| `Nomination` | `(data) -> NominationEntity` | Create a Nomination entity instance. |
| `NominationsController` | `(data) -> NominationsControllerEntity` | Create a NominationsController entity instance. |
| `NpsController` | `(data) -> NpsControllerEntity` | Create a NpsController entity instance. |
| `Renomination` | `(data) -> RenominationEntity` | Create a Renomination entity instance. |
| `RenominationsController` | `(data) -> RenominationsControllerEntity` | Create a RenominationsController entity instance. |
| `System` | `(data) -> SystemEntity` | Create a System entity instance. |
| `SystemController` | `(data) -> SystemControllerEntity` | Create a SystemController entity instance. |
| `TransmissionController` | `(data) -> TransmissionControllerEntity` | Create a TransmissionController entity instance. |
| `UmmGasController` | `(data) -> UmmGasControllerEntity` | Create a UmmGasController entity instance. |
| `UmmRssFeedController` | `(data) -> UmmRssFeedControllerEntity` | Create a UmmRssFeedController entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> (any, err)` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> (any, err)` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> (any, err)` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> (any, err)` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> (any, err)` | Remove an entity. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return `(any, err)`. The first value is a
`dict` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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
error is returned to the caller as the second element in the return tuple.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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
├── eleringdashboard_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`eleringdashboard_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
moon = client.Moon()
moon.load({"planet_id": "earth", "id": "luna"})

# moon.data_get() now returns the loaded moon data
# moon.match_get() returns the last match criteria
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
