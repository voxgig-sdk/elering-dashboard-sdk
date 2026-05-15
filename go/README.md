# EleringDashboard Golang SDK

The Golang SDK for the EleringDashboard API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/elering-dashboard-sdk
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/elering-dashboard-sdk=../path/to/github.com/voxgig-sdk/elering-dashboard-sdk
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/elering-dashboard-sdk"
    "github.com/voxgig-sdk/elering-dashboard-sdk/core"
)

func main() {
    client := sdk.NewEleringDashboardSDK(map[string]any{
        "apikey": os.Getenv("ELERING-DASHBOARD_APIKEY"),
    })
```

### 3. Load a balance

```go
    result, err = client.Balance(nil).Load(
        map[string]any{"id": "example_id"}, nil,
    )
    if err != nil {
        panic(err)
    }

    rm = core.ToMapAny(result)
    if rm["ok"] == true {
        fmt.Println(rm["data"])
    }
}
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
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
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

client := sdk.NewEleringDashboardSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
ELERING-DASHBOARD_TEST_LIVE=TRUE
ELERING-DASHBOARD_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewEleringDashboardSDK

```go
func NewEleringDashboardSDK(options map[string]any) *EleringDashboardSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *EleringDashboardSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### EleringDashboardSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Balance` | `(data map[string]any) EleringDashboardEntity` | Create a Balance entity instance. |
| `BalanceController` | `(data map[string]any) EleringDashboardEntity` | Create a BalanceController entity instance. |
| `Firm` | `(data map[string]any) EleringDashboardEntity` | Create a Firm entity instance. |
| `FirmCapacityController` | `(data map[string]any) EleringDashboardEntity` | Create a FirmCapacityController entity instance. |
| `GasBalanceController` | `(data map[string]any) EleringDashboardEntity` | Create a GasBalanceController entity instance. |
| `GasBorderTradeController` | `(data map[string]any) EleringDashboardEntity` | Create a GasBorderTradeController entity instance. |
| `GasSystem` | `(data map[string]any) EleringDashboardEntity` | Create a GasSystem entity instance. |
| `GasSystemController` | `(data map[string]any) EleringDashboardEntity` | Create a GasSystemController entity instance. |
| `GasTrade` | `(data map[string]any) EleringDashboardEntity` | Create a GasTrade entity instance. |
| `GasTradeController` | `(data map[string]any) EleringDashboardEntity` | Create a GasTradeController entity instance. |
| `GasTransmissionController` | `(data map[string]any) EleringDashboardEntity` | Create a GasTransmissionController entity instance. |
| `GreenController` | `(data map[string]any) EleringDashboardEntity` | Create a GreenController entity instance. |
| `Interruptible` | `(data map[string]any) EleringDashboardEntity` | Create a Interruptible entity instance. |
| `InterruptibleCapacityController` | `(data map[string]any) EleringDashboardEntity` | Create a InterruptibleCapacityController entity instance. |
| `Nomination` | `(data map[string]any) EleringDashboardEntity` | Create a Nomination entity instance. |
| `NominationsController` | `(data map[string]any) EleringDashboardEntity` | Create a NominationsController entity instance. |
| `NpsController` | `(data map[string]any) EleringDashboardEntity` | Create a NpsController entity instance. |
| `Renomination` | `(data map[string]any) EleringDashboardEntity` | Create a Renomination entity instance. |
| `RenominationsController` | `(data map[string]any) EleringDashboardEntity` | Create a RenominationsController entity instance. |
| `System` | `(data map[string]any) EleringDashboardEntity` | Create a System entity instance. |
| `SystemController` | `(data map[string]any) EleringDashboardEntity` | Create a SystemController entity instance. |
| `TransmissionController` | `(data map[string]any) EleringDashboardEntity` | Create a TransmissionController entity instance. |
| `UmmGasController` | `(data map[string]any) EleringDashboardEntity` | Create a UmmGasController entity instance. |
| `UmmRssFeedController` | `(data map[string]any) EleringDashboardEntity` | Create a UmmRssFeedController entity instance. |

### Entity interface (EleringDashboardEntity)

All entities implement the `EleringDashboardEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

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

Create an instance: `balance := client.Balance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.Balance(nil).Load(map[string]any{"id": "balance_id"}, nil)
```


### BalanceController

Create an instance: `balance_controller := client.BalanceController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.BalanceController(nil).Load(map[string]any{"id": "balance_controller_id"}, nil)
```


### Firm

Create an instance: `firm := client.Firm(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.Firm(nil).Load(map[string]any{"id": "firm_id"}, nil)
```


### FirmCapacityController

Create an instance: `firm_capacity_controller := client.FirmCapacityController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.FirmCapacityController(nil).Load(map[string]any{"id": "firm_capacity_controller_id"}, nil)
```


### GasBalanceController

Create an instance: `gas_balance_controller := client.GasBalanceController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.GasBalanceController(nil).Load(map[string]any{"id": "gas_balance_controller_id"}, nil)
```


### GasBorderTradeController

Create an instance: `gas_border_trade_controller := client.GasBorderTradeController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.GasBorderTradeController(nil).Load(map[string]any{"id": "gas_border_trade_controller_id"}, nil)
```


### GasSystem

Create an instance: `gas_system := client.GasSystem(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.GasSystem(nil).Load(map[string]any{"id": "gas_system_id"}, nil)
```


### GasSystemController

Create an instance: `gas_system_controller := client.GasSystemController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.GasSystemController(nil).Load(map[string]any{"id": "gas_system_controller_id"}, nil)
```


### GasTrade

Create an instance: `gas_trade := client.GasTrade(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.GasTrade(nil).Load(map[string]any{"id": "gas_trade_id"}, nil)
```


### GasTradeController

Create an instance: `gas_trade_controller := client.GasTradeController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.GasTradeController(nil).Load(map[string]any{"id": "gas_trade_controller_id"}, nil)
```


### GasTransmissionController

Create an instance: `gas_transmission_controller := client.GasTransmissionController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.GasTransmissionController(nil).Load(map[string]any{"id": "gas_transmission_controller_id"}, nil)
```


### GreenController

Create an instance: `green_controller := client.GreenController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.GreenController(nil).Load(map[string]any{"id": "green_controller_id"}, nil)
```


### Interruptible

Create an instance: `interruptible := client.Interruptible(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.Interruptible(nil).Load(map[string]any{"id": "interruptible_id"}, nil)
```


### InterruptibleCapacityController

Create an instance: `interruptible_capacity_controller := client.InterruptibleCapacityController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.InterruptibleCapacityController(nil).Load(map[string]any{"id": "interruptible_capacity_controller_id"}, nil)
```


### Nomination

Create an instance: `nomination := client.Nomination(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.Nomination(nil).Load(map[string]any{"id": "nomination_id"}, nil)
```


### NominationsController

Create an instance: `nominations_controller := client.NominationsController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.NominationsController(nil).Load(map[string]any{"id": "nominations_controller_id"}, nil)
```


### NpsController

Create an instance: `nps_controller := client.NpsController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.NpsController(nil).Load(map[string]any{"id": "nps_controller_id"}, nil)
```


### Renomination

Create an instance: `renomination := client.Renomination(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.Renomination(nil).Load(map[string]any{"id": "renomination_id"}, nil)
```


### RenominationsController

Create an instance: `renominations_controller := client.RenominationsController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.RenominationsController(nil).Load(map[string]any{"id": "renominations_controller_id"}, nil)
```


### System

Create an instance: `system := client.System(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.System(nil).Load(map[string]any{"id": "system_id"}, nil)
```


### SystemController

Create an instance: `system_controller := client.SystemController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.SystemController(nil).Load(map[string]any{"id": "system_controller_id"}, nil)
```


### TransmissionController

Create an instance: `transmission_controller := client.TransmissionController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.TransmissionController(nil).Load(map[string]any{"id": "transmission_controller_id"}, nil)
```


### UmmGasController

Create an instance: `umm_gas_controller := client.UmmGasController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.UmmGasController(nil).Load(map[string]any{"id": "umm_gas_controller_id"}, nil)
```


### UmmRssFeedController

Create an instance: `umm_rss_feed_controller := client.UmmRssFeedController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.UmmRssFeedController(nil).Load(map[string]any{"id": "umm_rss_feed_controller_id"}, nil)
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/elering-dashboard-sdk/
├── elering-dashboard.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/elering-dashboard-sdk`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
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
