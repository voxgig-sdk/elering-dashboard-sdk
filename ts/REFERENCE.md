# EleringDashboard TypeScript SDK Reference

Complete API reference for the EleringDashboard TypeScript SDK.


## EleringDashboardSDK

### Constructor

```ts
new EleringDashboardSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `EleringDashboardSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = EleringDashboardSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `EleringDashboardSDK` instance in test mode.


### Instance Methods

#### `Balance(data?: object)`

Create a new `Balance` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BalanceEntity` instance.

#### `BalanceController(data?: object)`

Create a new `BalanceController` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BalanceControllerEntity` instance.

#### `Firm(data?: object)`

Create a new `Firm` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FirmEntity` instance.

#### `FirmCapacityController(data?: object)`

Create a new `FirmCapacityController` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FirmCapacityControllerEntity` instance.

#### `GasBalanceController(data?: object)`

Create a new `GasBalanceController` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GasBalanceControllerEntity` instance.

#### `GasBorderTradeController(data?: object)`

Create a new `GasBorderTradeController` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GasBorderTradeControllerEntity` instance.

#### `GasSystem(data?: object)`

Create a new `GasSystem` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GasSystemEntity` instance.

#### `GasSystemController(data?: object)`

Create a new `GasSystemController` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GasSystemControllerEntity` instance.

#### `GasTrade(data?: object)`

Create a new `GasTrade` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GasTradeEntity` instance.

#### `GasTradeController(data?: object)`

Create a new `GasTradeController` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GasTradeControllerEntity` instance.

#### `GasTransmissionController(data?: object)`

Create a new `GasTransmissionController` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GasTransmissionControllerEntity` instance.

#### `GreenController(data?: object)`

Create a new `GreenController` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GreenControllerEntity` instance.

#### `Interruptible(data?: object)`

Create a new `Interruptible` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InterruptibleEntity` instance.

#### `InterruptibleCapacityController(data?: object)`

Create a new `InterruptibleCapacityController` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InterruptibleCapacityControllerEntity` instance.

#### `Nomination(data?: object)`

Create a new `Nomination` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NominationEntity` instance.

#### `NominationsController(data?: object)`

Create a new `NominationsController` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NominationsControllerEntity` instance.

#### `NpsController(data?: object)`

Create a new `NpsController` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NpsControllerEntity` instance.

#### `Renomination(data?: object)`

Create a new `Renomination` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RenominationEntity` instance.

#### `RenominationsController(data?: object)`

Create a new `RenominationsController` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RenominationsControllerEntity` instance.

#### `System(data?: object)`

Create a new `System` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SystemEntity` instance.

#### `SystemController(data?: object)`

Create a new `SystemController` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SystemControllerEntity` instance.

#### `TransmissionController(data?: object)`

Create a new `TransmissionController` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TransmissionControllerEntity` instance.

#### `UmmGasController(data?: object)`

Create a new `UmmGasController` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UmmGasControllerEntity` instance.

#### `UmmRssFeedController(data?: object)`

Create a new `UmmRssFeedController` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UmmRssFeedControllerEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `EleringDashboardSDK.test()`.

**Returns:** `EleringDashboardSDK` instance in test mode.


---

## BalanceEntity

```ts
const balance = client.Balance()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Balance().load({ id: 'balance_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BalanceEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BalanceControllerEntity

```ts
const balance_controller = client.BalanceController()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.BalanceController().load({ id: 'balance_controller_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BalanceControllerEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FirmEntity

```ts
const firm = client.Firm()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Firm().load({ id: 'firm_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FirmEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FirmCapacityControllerEntity

```ts
const firm_capacity_controller = client.FirmCapacityController()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.FirmCapacityController().load({ id: 'firm_capacity_controller_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FirmCapacityControllerEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GasBalanceControllerEntity

```ts
const gas_balance_controller = client.GasBalanceController()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GasBalanceController().load({ id: 'gas_balance_controller_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GasBalanceControllerEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GasBorderTradeControllerEntity

```ts
const gas_border_trade_controller = client.GasBorderTradeController()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GasBorderTradeController().load({ id: 'gas_border_trade_controller_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GasBorderTradeControllerEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GasSystemEntity

```ts
const gas_system = client.GasSystem()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GasSystem().load({ id: 'gas_system_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GasSystemEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GasSystemControllerEntity

```ts
const gas_system_controller = client.GasSystemController()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GasSystemController().load({ id: 'gas_system_controller_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GasSystemControllerEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GasTradeEntity

```ts
const gas_trade = client.GasTrade()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GasTrade().load({ id: 'gas_trade_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GasTradeEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GasTradeControllerEntity

```ts
const gas_trade_controller = client.GasTradeController()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GasTradeController().load({ id: 'gas_trade_controller_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GasTradeControllerEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GasTransmissionControllerEntity

```ts
const gas_transmission_controller = client.GasTransmissionController()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GasTransmissionController().load({ id: 'gas_transmission_controller_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GasTransmissionControllerEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GreenControllerEntity

```ts
const green_controller = client.GreenController()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GreenController().load({ id: 'green_controller_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GreenControllerEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InterruptibleEntity

```ts
const interruptible = client.Interruptible()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Interruptible().load({ id: 'interruptible_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InterruptibleEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InterruptibleCapacityControllerEntity

```ts
const interruptible_capacity_controller = client.InterruptibleCapacityController()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.InterruptibleCapacityController().load({ id: 'interruptible_capacity_controller_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InterruptibleCapacityControllerEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NominationEntity

```ts
const nomination = client.Nomination()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Nomination().load({ id: 'nomination_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NominationEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NominationsControllerEntity

```ts
const nominations_controller = client.NominationsController()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.NominationsController().load({ id: 'nominations_controller_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NominationsControllerEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NpsControllerEntity

```ts
const nps_controller = client.NpsController()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.NpsController().load({ id: 'nps_controller_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NpsControllerEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RenominationEntity

```ts
const renomination = client.Renomination()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Renomination().load({ id: 'renomination_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RenominationEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RenominationsControllerEntity

```ts
const renominations_controller = client.RenominationsController()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.RenominationsController().load({ id: 'renominations_controller_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RenominationsControllerEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SystemEntity

```ts
const system = client.System()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.System().load({ id: 'system_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SystemEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SystemControllerEntity

```ts
const system_controller = client.SystemController()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.SystemController().load({ id: 'system_controller_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SystemControllerEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TransmissionControllerEntity

```ts
const transmission_controller = client.TransmissionController()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.TransmissionController().load({ id: 'transmission_controller_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TransmissionControllerEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UmmGasControllerEntity

```ts
const umm_gas_controller = client.UmmGasController()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.UmmGasController().load({ id: 'umm_gas_controller_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UmmGasControllerEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UmmRssFeedControllerEntity

```ts
const umm_rss_feed_controller = client.UmmRssFeedController()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.UmmRssFeedController().load({ id: 'umm_rss_feed_controller_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UmmRssFeedControllerEntity` instance with the same client and
options.

#### `client()`

Return the parent `EleringDashboardSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new EleringDashboardSDK({
  feature: {
    test: { active: true },
  }
})
```

