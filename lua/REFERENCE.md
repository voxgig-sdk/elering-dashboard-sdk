# EleringDashboard Lua SDK Reference

Complete API reference for the EleringDashboard Lua SDK.


## EleringDashboardSDK

### Constructor

```lua
local sdk = require("elering-dashboard_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Balance(data)`

Create a new `Balance` entity instance. Pass `nil` for no initial data.

#### `BalanceController(data)`

Create a new `BalanceController` entity instance. Pass `nil` for no initial data.

#### `Firm(data)`

Create a new `Firm` entity instance. Pass `nil` for no initial data.

#### `FirmCapacityController(data)`

Create a new `FirmCapacityController` entity instance. Pass `nil` for no initial data.

#### `GasBalanceController(data)`

Create a new `GasBalanceController` entity instance. Pass `nil` for no initial data.

#### `GasBorderTradeController(data)`

Create a new `GasBorderTradeController` entity instance. Pass `nil` for no initial data.

#### `GasSystem(data)`

Create a new `GasSystem` entity instance. Pass `nil` for no initial data.

#### `GasSystemController(data)`

Create a new `GasSystemController` entity instance. Pass `nil` for no initial data.

#### `GasTrade(data)`

Create a new `GasTrade` entity instance. Pass `nil` for no initial data.

#### `GasTradeController(data)`

Create a new `GasTradeController` entity instance. Pass `nil` for no initial data.

#### `GasTransmissionController(data)`

Create a new `GasTransmissionController` entity instance. Pass `nil` for no initial data.

#### `GreenController(data)`

Create a new `GreenController` entity instance. Pass `nil` for no initial data.

#### `Interruptible(data)`

Create a new `Interruptible` entity instance. Pass `nil` for no initial data.

#### `InterruptibleCapacityController(data)`

Create a new `InterruptibleCapacityController` entity instance. Pass `nil` for no initial data.

#### `Nomination(data)`

Create a new `Nomination` entity instance. Pass `nil` for no initial data.

#### `NominationsController(data)`

Create a new `NominationsController` entity instance. Pass `nil` for no initial data.

#### `NpsController(data)`

Create a new `NpsController` entity instance. Pass `nil` for no initial data.

#### `Renomination(data)`

Create a new `Renomination` entity instance. Pass `nil` for no initial data.

#### `RenominationsController(data)`

Create a new `RenominationsController` entity instance. Pass `nil` for no initial data.

#### `System(data)`

Create a new `System` entity instance. Pass `nil` for no initial data.

#### `SystemController(data)`

Create a new `SystemController` entity instance. Pass `nil` for no initial data.

#### `TransmissionController(data)`

Create a new `TransmissionController` entity instance. Pass `nil` for no initial data.

#### `UmmGasController(data)`

Create a new `UmmGasController` entity instance. Pass `nil` for no initial data.

#### `UmmRssFeedController(data)`

Create a new `UmmRssFeedController` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## BalanceEntity

```lua
local balance = client:Balance(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Balance():load({ id = "balance_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BalanceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BalanceControllerEntity

```lua
local balance_controller = client:BalanceController(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:BalanceController():load({ id = "balance_controller_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BalanceControllerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FirmEntity

```lua
local firm = client:Firm(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Firm():load({ id = "firm_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FirmEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FirmCapacityControllerEntity

```lua
local firm_capacity_controller = client:FirmCapacityController(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:FirmCapacityController():load({ id = "firm_capacity_controller_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FirmCapacityControllerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GasBalanceControllerEntity

```lua
local gas_balance_controller = client:GasBalanceController(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:GasBalanceController():load({ id = "gas_balance_controller_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GasBalanceControllerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GasBorderTradeControllerEntity

```lua
local gas_border_trade_controller = client:GasBorderTradeController(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:GasBorderTradeController():load({ id = "gas_border_trade_controller_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GasBorderTradeControllerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GasSystemEntity

```lua
local gas_system = client:GasSystem(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:GasSystem():load({ id = "gas_system_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GasSystemEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GasSystemControllerEntity

```lua
local gas_system_controller = client:GasSystemController(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:GasSystemController():load({ id = "gas_system_controller_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GasSystemControllerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GasTradeEntity

```lua
local gas_trade = client:GasTrade(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:GasTrade():load({ id = "gas_trade_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GasTradeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GasTradeControllerEntity

```lua
local gas_trade_controller = client:GasTradeController(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:GasTradeController():load({ id = "gas_trade_controller_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GasTradeControllerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GasTransmissionControllerEntity

```lua
local gas_transmission_controller = client:GasTransmissionController(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:GasTransmissionController():load({ id = "gas_transmission_controller_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GasTransmissionControllerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GreenControllerEntity

```lua
local green_controller = client:GreenController(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:GreenController():load({ id = "green_controller_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GreenControllerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## InterruptibleEntity

```lua
local interruptible = client:Interruptible(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Interruptible():load({ id = "interruptible_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InterruptibleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## InterruptibleCapacityControllerEntity

```lua
local interruptible_capacity_controller = client:InterruptibleCapacityController(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:InterruptibleCapacityController():load({ id = "interruptible_capacity_controller_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InterruptibleCapacityControllerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## NominationEntity

```lua
local nomination = client:Nomination(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Nomination():load({ id = "nomination_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NominationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## NominationsControllerEntity

```lua
local nominations_controller = client:NominationsController(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:NominationsController():load({ id = "nominations_controller_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NominationsControllerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## NpsControllerEntity

```lua
local nps_controller = client:NpsController(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:NpsController():load({ id = "nps_controller_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NpsControllerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RenominationEntity

```lua
local renomination = client:Renomination(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Renomination():load({ id = "renomination_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RenominationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RenominationsControllerEntity

```lua
local renominations_controller = client:RenominationsController(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:RenominationsController():load({ id = "renominations_controller_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RenominationsControllerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SystemEntity

```lua
local system = client:System(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:System():load({ id = "system_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SystemEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SystemControllerEntity

```lua
local system_controller = client:SystemController(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:SystemController():load({ id = "system_controller_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SystemControllerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TransmissionControllerEntity

```lua
local transmission_controller = client:TransmissionController(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:TransmissionController():load({ id = "transmission_controller_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TransmissionControllerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UmmGasControllerEntity

```lua
local umm_gas_controller = client:UmmGasController(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:UmmGasController():load({ id = "umm_gas_controller_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UmmGasControllerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UmmRssFeedControllerEntity

```lua
local umm_rss_feed_controller = client:UmmRssFeedController(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:UmmRssFeedController():load({ id = "umm_rss_feed_controller_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UmmRssFeedControllerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

