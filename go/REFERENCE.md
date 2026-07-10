# EleringDashboard Golang SDK Reference

Complete API reference for the EleringDashboard Golang SDK.


## EleringDashboardSDK

### Constructor

```go
func NewEleringDashboardSDK(options map[string]any) *EleringDashboardSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *EleringDashboardSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *EleringDashboardSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Balance(data map[string]any) EleringDashboardEntity`

Create a new `Balance` entity instance. Pass `nil` for no initial data.

#### `BalanceController(data map[string]any) EleringDashboardEntity`

Create a new `BalanceController` entity instance. Pass `nil` for no initial data.

#### `Firm(data map[string]any) EleringDashboardEntity`

Create a new `Firm` entity instance. Pass `nil` for no initial data.

#### `FirmCapacityController(data map[string]any) EleringDashboardEntity`

Create a new `FirmCapacityController` entity instance. Pass `nil` for no initial data.

#### `GasBalanceController(data map[string]any) EleringDashboardEntity`

Create a new `GasBalanceController` entity instance. Pass `nil` for no initial data.

#### `GasBorderTradeController(data map[string]any) EleringDashboardEntity`

Create a new `GasBorderTradeController` entity instance. Pass `nil` for no initial data.

#### `GasSystem(data map[string]any) EleringDashboardEntity`

Create a new `GasSystem` entity instance. Pass `nil` for no initial data.

#### `GasSystemController(data map[string]any) EleringDashboardEntity`

Create a new `GasSystemController` entity instance. Pass `nil` for no initial data.

#### `GasTrade(data map[string]any) EleringDashboardEntity`

Create a new `GasTrade` entity instance. Pass `nil` for no initial data.

#### `GasTradeController(data map[string]any) EleringDashboardEntity`

Create a new `GasTradeController` entity instance. Pass `nil` for no initial data.

#### `GasTransmissionController(data map[string]any) EleringDashboardEntity`

Create a new `GasTransmissionController` entity instance. Pass `nil` for no initial data.

#### `GreenController(data map[string]any) EleringDashboardEntity`

Create a new `GreenController` entity instance. Pass `nil` for no initial data.

#### `Interruptible(data map[string]any) EleringDashboardEntity`

Create a new `Interruptible` entity instance. Pass `nil` for no initial data.

#### `InterruptibleCapacityController(data map[string]any) EleringDashboardEntity`

Create a new `InterruptibleCapacityController` entity instance. Pass `nil` for no initial data.

#### `Nomination(data map[string]any) EleringDashboardEntity`

Create a new `Nomination` entity instance. Pass `nil` for no initial data.

#### `NominationsController(data map[string]any) EleringDashboardEntity`

Create a new `NominationsController` entity instance. Pass `nil` for no initial data.

#### `NpsController(data map[string]any) EleringDashboardEntity`

Create a new `NpsController` entity instance. Pass `nil` for no initial data.

#### `Renomination(data map[string]any) EleringDashboardEntity`

Create a new `Renomination` entity instance. Pass `nil` for no initial data.

#### `RenominationsController(data map[string]any) EleringDashboardEntity`

Create a new `RenominationsController` entity instance. Pass `nil` for no initial data.

#### `System(data map[string]any) EleringDashboardEntity`

Create a new `System` entity instance. Pass `nil` for no initial data.

#### `SystemController(data map[string]any) EleringDashboardEntity`

Create a new `SystemController` entity instance. Pass `nil` for no initial data.

#### `TransmissionController(data map[string]any) EleringDashboardEntity`

Create a new `TransmissionController` entity instance. Pass `nil` for no initial data.

#### `UmmGasController(data map[string]any) EleringDashboardEntity`

Create a new `UmmGasController` entity instance. Pass `nil` for no initial data.

#### `UmmRssFeedController(data map[string]any) EleringDashboardEntity`

Create a new `UmmRssFeedController` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## BalanceEntity

```go
balance := client.Balance(nil)
fmt.Println(balance.GetName()) // "balance"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Balance(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BalanceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BalanceControllerEntity

```go
balanceController := client.BalanceController(nil)
fmt.Println(balanceController.GetName()) // "balance_controller"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.BalanceController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BalanceControllerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FirmEntity

```go
firm := client.Firm(nil)
fmt.Println(firm.GetName()) // "firm"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Firm(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FirmEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FirmCapacityControllerEntity

```go
firmCapacityController := client.FirmCapacityController(nil)
fmt.Println(firmCapacityController.GetName()) // "firm_capacity_controller"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.FirmCapacityController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FirmCapacityControllerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GasBalanceControllerEntity

```go
gasBalanceController := client.GasBalanceController(nil)
fmt.Println(gasBalanceController.GetName()) // "gas_balance_controller"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.GasBalanceController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GasBalanceControllerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GasBorderTradeControllerEntity

```go
gasBorderTradeController := client.GasBorderTradeController(nil)
fmt.Println(gasBorderTradeController.GetName()) // "gas_border_trade_controller"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.GasBorderTradeController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GasBorderTradeControllerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GasSystemEntity

```go
gasSystem := client.GasSystem(nil)
fmt.Println(gasSystem.GetName()) // "gas_system"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.GasSystem(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GasSystemEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GasSystemControllerEntity

```go
gasSystemController := client.GasSystemController(nil)
fmt.Println(gasSystemController.GetName()) // "gas_system_controller"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.GasSystemController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GasSystemControllerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GasTradeEntity

```go
gasTrade := client.GasTrade(nil)
fmt.Println(gasTrade.GetName()) // "gas_trade"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.GasTrade(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GasTradeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GasTradeControllerEntity

```go
gasTradeController := client.GasTradeController(nil)
fmt.Println(gasTradeController.GetName()) // "gas_trade_controller"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.GasTradeController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GasTradeControllerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GasTransmissionControllerEntity

```go
gasTransmissionController := client.GasTransmissionController(nil)
fmt.Println(gasTransmissionController.GetName()) // "gas_transmission_controller"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.GasTransmissionController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GasTransmissionControllerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GreenControllerEntity

```go
greenController := client.GreenController(nil)
fmt.Println(greenController.GetName()) // "green_controller"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.GreenController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GreenControllerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InterruptibleEntity

```go
interruptible := client.Interruptible(nil)
fmt.Println(interruptible.GetName()) // "interruptible"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Interruptible(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InterruptibleEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InterruptibleCapacityControllerEntity

```go
interruptibleCapacityController := client.InterruptibleCapacityController(nil)
fmt.Println(interruptibleCapacityController.GetName()) // "interruptible_capacity_controller"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.InterruptibleCapacityController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InterruptibleCapacityControllerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## NominationEntity

```go
nomination := client.Nomination(nil)
fmt.Println(nomination.GetName()) // "nomination"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Nomination(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `NominationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## NominationsControllerEntity

```go
nominationsController := client.NominationsController(nil)
fmt.Println(nominationsController.GetName()) // "nominations_controller"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.NominationsController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `NominationsControllerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## NpsControllerEntity

```go
npsController := client.NpsController(nil)
fmt.Println(npsController.GetName()) // "nps_controller"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.NpsController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `NpsControllerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RenominationEntity

```go
renomination := client.Renomination(nil)
fmt.Println(renomination.GetName()) // "renomination"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Renomination(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RenominationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RenominationsControllerEntity

```go
renominationsController := client.RenominationsController(nil)
fmt.Println(renominationsController.GetName()) // "renominations_controller"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.RenominationsController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RenominationsControllerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SystemEntity

```go
system := client.System(nil)
fmt.Println(system.GetName()) // "system"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.System(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SystemEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SystemControllerEntity

```go
systemController := client.SystemController(nil)
fmt.Println(systemController.GetName()) // "system_controller"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.SystemController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SystemControllerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TransmissionControllerEntity

```go
transmissionController := client.TransmissionController(nil)
fmt.Println(transmissionController.GetName()) // "transmission_controller"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.TransmissionController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TransmissionControllerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UmmGasControllerEntity

```go
ummGasController := client.UmmGasController(nil)
fmt.Println(ummGasController.GetName()) // "umm_gas_controller"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.UmmGasController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UmmGasControllerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UmmRssFeedControllerEntity

```go
ummRssFeedController := client.UmmRssFeedController(nil)
fmt.Println(ummRssFeedController.GetName()) // "umm_rss_feed_controller"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.UmmRssFeedController(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UmmRssFeedControllerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewEleringDashboardSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

