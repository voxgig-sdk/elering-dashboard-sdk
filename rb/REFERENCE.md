# EleringDashboard Ruby SDK Reference

Complete API reference for the EleringDashboard Ruby SDK.


## EleringDashboardSDK

### Constructor

```ruby
require_relative 'EleringDashboard_sdk'

client = EleringDashboardSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `EleringDashboardSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = EleringDashboardSDK.test
```


### Instance Methods

#### `Balance(data = nil)`

Create a new `Balance` entity instance. Pass `nil` for no initial data.

#### `BalanceController(data = nil)`

Create a new `BalanceController` entity instance. Pass `nil` for no initial data.

#### `Firm(data = nil)`

Create a new `Firm` entity instance. Pass `nil` for no initial data.

#### `FirmCapacityController(data = nil)`

Create a new `FirmCapacityController` entity instance. Pass `nil` for no initial data.

#### `GasBalanceController(data = nil)`

Create a new `GasBalanceController` entity instance. Pass `nil` for no initial data.

#### `GasBorderTradeController(data = nil)`

Create a new `GasBorderTradeController` entity instance. Pass `nil` for no initial data.

#### `GasSystem(data = nil)`

Create a new `GasSystem` entity instance. Pass `nil` for no initial data.

#### `GasSystemController(data = nil)`

Create a new `GasSystemController` entity instance. Pass `nil` for no initial data.

#### `GasTrade(data = nil)`

Create a new `GasTrade` entity instance. Pass `nil` for no initial data.

#### `GasTradeController(data = nil)`

Create a new `GasTradeController` entity instance. Pass `nil` for no initial data.

#### `GasTransmissionController(data = nil)`

Create a new `GasTransmissionController` entity instance. Pass `nil` for no initial data.

#### `GreenController(data = nil)`

Create a new `GreenController` entity instance. Pass `nil` for no initial data.

#### `Interruptible(data = nil)`

Create a new `Interruptible` entity instance. Pass `nil` for no initial data.

#### `InterruptibleCapacityController(data = nil)`

Create a new `InterruptibleCapacityController` entity instance. Pass `nil` for no initial data.

#### `Nomination(data = nil)`

Create a new `Nomination` entity instance. Pass `nil` for no initial data.

#### `NominationsController(data = nil)`

Create a new `NominationsController` entity instance. Pass `nil` for no initial data.

#### `NpsController(data = nil)`

Create a new `NpsController` entity instance. Pass `nil` for no initial data.

#### `Renomination(data = nil)`

Create a new `Renomination` entity instance. Pass `nil` for no initial data.

#### `RenominationsController(data = nil)`

Create a new `RenominationsController` entity instance. Pass `nil` for no initial data.

#### `System(data = nil)`

Create a new `System` entity instance. Pass `nil` for no initial data.

#### `SystemController(data = nil)`

Create a new `SystemController` entity instance. Pass `nil` for no initial data.

#### `TransmissionController(data = nil)`

Create a new `TransmissionController` entity instance. Pass `nil` for no initial data.

#### `UmmGasController(data = nil)`

Create a new `UmmGasController` entity instance. Pass `nil` for no initial data.

#### `UmmRssFeedController(data = nil)`

Create a new `UmmRssFeedController` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## BalanceEntity

```ruby
balance = client.Balance
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Balance.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BalanceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BalanceControllerEntity

```ruby
balance_controller = client.BalanceController
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.BalanceController.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BalanceControllerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FirmEntity

```ruby
firm = client.Firm
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Firm.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FirmEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FirmCapacityControllerEntity

```ruby
firm_capacity_controller = client.FirmCapacityController
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.FirmCapacityController.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FirmCapacityControllerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GasBalanceControllerEntity

```ruby
gas_balance_controller = client.GasBalanceController
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.GasBalanceController.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GasBalanceControllerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GasBorderTradeControllerEntity

```ruby
gas_border_trade_controller = client.GasBorderTradeController
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.GasBorderTradeController.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GasBorderTradeControllerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GasSystemEntity

```ruby
gas_system = client.GasSystem
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.GasSystem.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GasSystemEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GasSystemControllerEntity

```ruby
gas_system_controller = client.GasSystemController
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.GasSystemController.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GasSystemControllerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GasTradeEntity

```ruby
gas_trade = client.GasTrade
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.GasTrade.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GasTradeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GasTradeControllerEntity

```ruby
gas_trade_controller = client.GasTradeController
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.GasTradeController.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GasTradeControllerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GasTransmissionControllerEntity

```ruby
gas_transmission_controller = client.GasTransmissionController
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.GasTransmissionController.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GasTransmissionControllerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GreenControllerEntity

```ruby
green_controller = client.GreenController
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.GreenController.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GreenControllerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## InterruptibleEntity

```ruby
interruptible = client.Interruptible
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Interruptible.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `InterruptibleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## InterruptibleCapacityControllerEntity

```ruby
interruptible_capacity_controller = client.InterruptibleCapacityController
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.InterruptibleCapacityController.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `InterruptibleCapacityControllerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## NominationEntity

```ruby
nomination = client.Nomination
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Nomination.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `NominationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## NominationsControllerEntity

```ruby
nominations_controller = client.NominationsController
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.NominationsController.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `NominationsControllerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## NpsControllerEntity

```ruby
nps_controller = client.NpsController
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.NpsController.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `NpsControllerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RenominationEntity

```ruby
renomination = client.Renomination
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Renomination.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RenominationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RenominationsControllerEntity

```ruby
renominations_controller = client.RenominationsController
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.RenominationsController.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RenominationsControllerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SystemEntity

```ruby
system = client.System
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.System.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SystemEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SystemControllerEntity

```ruby
system_controller = client.SystemController
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.SystemController.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SystemControllerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TransmissionControllerEntity

```ruby
transmission_controller = client.TransmissionController
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.TransmissionController.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TransmissionControllerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UmmGasControllerEntity

```ruby
umm_gas_controller = client.UmmGasController
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.UmmGasController.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UmmGasControllerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UmmRssFeedControllerEntity

```ruby
umm_rss_feed_controller = client.UmmRssFeedController
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.UmmRssFeedController.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UmmRssFeedControllerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = EleringDashboardSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

