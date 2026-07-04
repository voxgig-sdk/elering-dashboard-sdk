# EleringDashboard Python SDK Reference

Complete API reference for the EleringDashboard Python SDK.


## EleringDashboardSDK

### Constructor

```python
from elering-dashboard_sdk import EleringDashboardSDK

client = EleringDashboardSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `EleringDashboardSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = EleringDashboardSDK.test()
```


### Instance Methods

#### `Balance(data=None)`

Create a new `BalanceEntity` instance. Pass `None` for no initial data.

#### `BalanceController(data=None)`

Create a new `BalanceControllerEntity` instance. Pass `None` for no initial data.

#### `Firm(data=None)`

Create a new `FirmEntity` instance. Pass `None` for no initial data.

#### `FirmCapacityController(data=None)`

Create a new `FirmCapacityControllerEntity` instance. Pass `None` for no initial data.

#### `GasBalanceController(data=None)`

Create a new `GasBalanceControllerEntity` instance. Pass `None` for no initial data.

#### `GasBorderTradeController(data=None)`

Create a new `GasBorderTradeControllerEntity` instance. Pass `None` for no initial data.

#### `GasSystem(data=None)`

Create a new `GasSystemEntity` instance. Pass `None` for no initial data.

#### `GasSystemController(data=None)`

Create a new `GasSystemControllerEntity` instance. Pass `None` for no initial data.

#### `GasTrade(data=None)`

Create a new `GasTradeEntity` instance. Pass `None` for no initial data.

#### `GasTradeController(data=None)`

Create a new `GasTradeControllerEntity` instance. Pass `None` for no initial data.

#### `GasTransmissionController(data=None)`

Create a new `GasTransmissionControllerEntity` instance. Pass `None` for no initial data.

#### `GreenController(data=None)`

Create a new `GreenControllerEntity` instance. Pass `None` for no initial data.

#### `Interruptible(data=None)`

Create a new `InterruptibleEntity` instance. Pass `None` for no initial data.

#### `InterruptibleCapacityController(data=None)`

Create a new `InterruptibleCapacityControllerEntity` instance. Pass `None` for no initial data.

#### `Nomination(data=None)`

Create a new `NominationEntity` instance. Pass `None` for no initial data.

#### `NominationsController(data=None)`

Create a new `NominationsControllerEntity` instance. Pass `None` for no initial data.

#### `NpsController(data=None)`

Create a new `NpsControllerEntity` instance. Pass `None` for no initial data.

#### `Renomination(data=None)`

Create a new `RenominationEntity` instance. Pass `None` for no initial data.

#### `RenominationsController(data=None)`

Create a new `RenominationsControllerEntity` instance. Pass `None` for no initial data.

#### `System(data=None)`

Create a new `SystemEntity` instance. Pass `None` for no initial data.

#### `SystemController(data=None)`

Create a new `SystemControllerEntity` instance. Pass `None` for no initial data.

#### `TransmissionController(data=None)`

Create a new `TransmissionControllerEntity` instance. Pass `None` for no initial data.

#### `UmmGasController(data=None)`

Create a new `UmmGasControllerEntity` instance. Pass `None` for no initial data.

#### `UmmRssFeedController(data=None)`

Create a new `UmmRssFeedControllerEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## BalanceEntity

```python
balance = client.balance
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.balance.load({"id": "balance_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BalanceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BalanceControllerEntity

```python
balance_controller = client.balance_controller
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.balance_controller.load({"id": "balance_controller_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BalanceControllerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FirmEntity

```python
firm = client.firm
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.firm.load({"id": "firm_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FirmEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FirmCapacityControllerEntity

```python
firm_capacity_controller = client.firm_capacity_controller
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.firm_capacity_controller.load({"id": "firm_capacity_controller_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FirmCapacityControllerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GasBalanceControllerEntity

```python
gas_balance_controller = client.gas_balance_controller
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.gas_balance_controller.load({"id": "gas_balance_controller_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GasBalanceControllerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GasBorderTradeControllerEntity

```python
gas_border_trade_controller = client.gas_border_trade_controller
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.gas_border_trade_controller.load({"id": "gas_border_trade_controller_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GasBorderTradeControllerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GasSystemEntity

```python
gas_system = client.gas_system
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.gas_system.load({"id": "gas_system_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GasSystemEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GasSystemControllerEntity

```python
gas_system_controller = client.gas_system_controller
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.gas_system_controller.load({"id": "gas_system_controller_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GasSystemControllerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GasTradeEntity

```python
gas_trade = client.gas_trade
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.gas_trade.load({"id": "gas_trade_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GasTradeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GasTradeControllerEntity

```python
gas_trade_controller = client.gas_trade_controller
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.gas_trade_controller.load({"id": "gas_trade_controller_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GasTradeControllerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GasTransmissionControllerEntity

```python
gas_transmission_controller = client.gas_transmission_controller
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.gas_transmission_controller.load({"id": "gas_transmission_controller_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GasTransmissionControllerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GreenControllerEntity

```python
green_controller = client.green_controller
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.green_controller.load({"id": "green_controller_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GreenControllerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InterruptibleEntity

```python
interruptible = client.interruptible
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.interruptible.load({"id": "interruptible_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InterruptibleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InterruptibleCapacityControllerEntity

```python
interruptible_capacity_controller = client.interruptible_capacity_controller
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.interruptible_capacity_controller.load({"id": "interruptible_capacity_controller_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InterruptibleCapacityControllerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NominationEntity

```python
nomination = client.nomination
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.nomination.load({"id": "nomination_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NominationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NominationsControllerEntity

```python
nominations_controller = client.nominations_controller
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.nominations_controller.load({"id": "nominations_controller_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NominationsControllerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NpsControllerEntity

```python
nps_controller = client.nps_controller
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.nps_controller.load({"id": "nps_controller_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NpsControllerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RenominationEntity

```python
renomination = client.renomination
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.renomination.load({"id": "renomination_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RenominationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RenominationsControllerEntity

```python
renominations_controller = client.renominations_controller
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.renominations_controller.load({"id": "renominations_controller_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RenominationsControllerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SystemEntity

```python
system = client.system
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.system.load({"id": "system_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SystemEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SystemControllerEntity

```python
system_controller = client.system_controller
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.system_controller.load({"id": "system_controller_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SystemControllerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TransmissionControllerEntity

```python
transmission_controller = client.transmission_controller
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.transmission_controller.load({"id": "transmission_controller_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TransmissionControllerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UmmGasControllerEntity

```python
umm_gas_controller = client.umm_gas_controller
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.umm_gas_controller.load({"id": "umm_gas_controller_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UmmGasControllerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UmmRssFeedControllerEntity

```python
umm_rss_feed_controller = client.umm_rss_feed_controller
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.umm_rss_feed_controller.load({"id": "umm_rss_feed_controller_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UmmRssFeedControllerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = EleringDashboardSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

