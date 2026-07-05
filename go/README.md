# EleringDashboard Golang SDK



The Golang SDK for the EleringDashboard API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Balance(nil)` — each with the same small set of operations (`Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/elering-dashboard-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/elering-dashboard-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/elering-dashboard-sdk/go=../elering-dashboard-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/elering-dashboard-sdk/go"
)

func main() {
    client := sdk.New()

    // Load a single balance — the value is the loaded record.
    balance, err := client.Balance(nil).Load(nil, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(balance)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
balance, err := client.Balance(nil).Load(nil, nil)
if err != nil {
    // handle err
    return
}
_ = balance
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

balance, err := client.Balance(nil).Load(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(balance) // the returned mock data
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
ELERING_DASHBOARD_TEST_LIVE=TRUE
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
| `Interruptible` | `(data map[string]any) EleringDashboardEntity` | Create an Interruptible entity instance. |
| `InterruptibleCapacityController` | `(data map[string]any) EleringDashboardEntity` | Create an InterruptibleCapacityController entity instance. |
| `Nomination` | `(data map[string]any) EleringDashboardEntity` | Create a Nomination entity instance. |
| `NominationsController` | `(data map[string]any) EleringDashboardEntity` | Create a NominationsController entity instance. |
| `NpsController` | `(data map[string]any) EleringDashboardEntity` | Create a NpsController entity instance. |
| `Renomination` | `(data map[string]any) EleringDashboardEntity` | Create a Renomination entity instance. |
| `RenominationsController` | `(data map[string]any) EleringDashboardEntity` | Create a RenominationsController entity instance. |
| `System` | `(data map[string]any) EleringDashboardEntity` | Create a System entity instance. |
| `SystemController` | `(data map[string]any) EleringDashboardEntity` | Create a SystemController entity instance. |
| `TransmissionController` | `(data map[string]any) EleringDashboardEntity` | Create a TransmissionController entity instance. |
| `UmmGasController` | `(data map[string]any) EleringDashboardEntity` | Create an UmmGasController entity instance. |
| `UmmRssFeedController` | `(data map[string]any) EleringDashboardEntity` | Create an UmmRssFeedController entity instance. |

### Entity interface (EleringDashboardEntity)

All entities implement the `EleringDashboardEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    balance, err := client.Balance(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // balance is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

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
balance, err := client.Balance(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(balance) // the loaded record
```


### BalanceController

Create an instance: `balance_controller := client.BalanceController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
balance_controller, err := client.BalanceController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(balance_controller) // the loaded record
```


### Firm

Create an instance: `firm := client.Firm(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
firm, err := client.Firm(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(firm) // the loaded record
```


### FirmCapacityController

Create an instance: `firm_capacity_controller := client.FirmCapacityController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
firm_capacity_controller, err := client.FirmCapacityController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(firm_capacity_controller) // the loaded record
```


### GasBalanceController

Create an instance: `gas_balance_controller := client.GasBalanceController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
gas_balance_controller, err := client.GasBalanceController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(gas_balance_controller) // the loaded record
```


### GasBorderTradeController

Create an instance: `gas_border_trade_controller := client.GasBorderTradeController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
gas_border_trade_controller, err := client.GasBorderTradeController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(gas_border_trade_controller) // the loaded record
```


### GasSystem

Create an instance: `gas_system := client.GasSystem(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
gas_system, err := client.GasSystem(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(gas_system) // the loaded record
```


### GasSystemController

Create an instance: `gas_system_controller := client.GasSystemController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
gas_system_controller, err := client.GasSystemController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(gas_system_controller) // the loaded record
```


### GasTrade

Create an instance: `gas_trade := client.GasTrade(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
gas_trade, err := client.GasTrade(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(gas_trade) // the loaded record
```


### GasTradeController

Create an instance: `gas_trade_controller := client.GasTradeController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
gas_trade_controller, err := client.GasTradeController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(gas_trade_controller) // the loaded record
```


### GasTransmissionController

Create an instance: `gas_transmission_controller := client.GasTransmissionController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
gas_transmission_controller, err := client.GasTransmissionController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(gas_transmission_controller) // the loaded record
```


### GreenController

Create an instance: `green_controller := client.GreenController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
green_controller, err := client.GreenController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(green_controller) // the loaded record
```


### Interruptible

Create an instance: `interruptible := client.Interruptible(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
interruptible, err := client.Interruptible(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(interruptible) // the loaded record
```


### InterruptibleCapacityController

Create an instance: `interruptible_capacity_controller := client.InterruptibleCapacityController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
interruptible_capacity_controller, err := client.InterruptibleCapacityController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(interruptible_capacity_controller) // the loaded record
```


### Nomination

Create an instance: `nomination := client.Nomination(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
nomination, err := client.Nomination(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(nomination) // the loaded record
```


### NominationsController

Create an instance: `nominations_controller := client.NominationsController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
nominations_controller, err := client.NominationsController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(nominations_controller) // the loaded record
```


### NpsController

Create an instance: `nps_controller := client.NpsController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
nps_controller, err := client.NpsController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(nps_controller) // the loaded record
```


### Renomination

Create an instance: `renomination := client.Renomination(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
renomination, err := client.Renomination(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(renomination) // the loaded record
```


### RenominationsController

Create an instance: `renominations_controller := client.RenominationsController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
renominations_controller, err := client.RenominationsController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(renominations_controller) // the loaded record
```


### System

Create an instance: `system := client.System(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
system, err := client.System(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(system) // the loaded record
```


### SystemController

Create an instance: `system_controller := client.SystemController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
system_controller, err := client.SystemController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(system_controller) // the loaded record
```


### TransmissionController

Create an instance: `transmission_controller := client.TransmissionController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
transmission_controller, err := client.TransmissionController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(transmission_controller) // the loaded record
```


### UmmGasController

Create an instance: `umm_gas_controller := client.UmmGasController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
umm_gas_controller, err := client.UmmGasController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(umm_gas_controller) // the loaded record
```


### UmmRssFeedController

Create an instance: `umm_rss_feed_controller := client.UmmRssFeedController(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
umm_rss_feed_controller, err := client.UmmRssFeedController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(umm_rss_feed_controller) // the loaded record
```


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
github.com/voxgig-sdk/elering-dashboard-sdk/go/
├── elering-dashboard.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/elering-dashboard-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
balance := client.Balance(nil)
balance.Load(nil, nil)

// balance.Data() now returns the balance data from the last load
// balance.Match() returns the last match criteria
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
