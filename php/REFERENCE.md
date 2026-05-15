# EleringDashboard PHP SDK Reference

Complete API reference for the EleringDashboard PHP SDK.


## EleringDashboardSDK

### Constructor

```php
require_once __DIR__ . '/elering-dashboard_sdk.php';

$client = new EleringDashboardSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `EleringDashboardSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = EleringDashboardSDK::test();
```


### Instance Methods

#### `Balance($data = null)`

Create a new `BalanceEntity` instance. Pass `null` for no initial data.

#### `BalanceController($data = null)`

Create a new `BalanceControllerEntity` instance. Pass `null` for no initial data.

#### `Firm($data = null)`

Create a new `FirmEntity` instance. Pass `null` for no initial data.

#### `FirmCapacityController($data = null)`

Create a new `FirmCapacityControllerEntity` instance. Pass `null` for no initial data.

#### `GasBalanceController($data = null)`

Create a new `GasBalanceControllerEntity` instance. Pass `null` for no initial data.

#### `GasBorderTradeController($data = null)`

Create a new `GasBorderTradeControllerEntity` instance. Pass `null` for no initial data.

#### `GasSystem($data = null)`

Create a new `GasSystemEntity` instance. Pass `null` for no initial data.

#### `GasSystemController($data = null)`

Create a new `GasSystemControllerEntity` instance. Pass `null` for no initial data.

#### `GasTrade($data = null)`

Create a new `GasTradeEntity` instance. Pass `null` for no initial data.

#### `GasTradeController($data = null)`

Create a new `GasTradeControllerEntity` instance. Pass `null` for no initial data.

#### `GasTransmissionController($data = null)`

Create a new `GasTransmissionControllerEntity` instance. Pass `null` for no initial data.

#### `GreenController($data = null)`

Create a new `GreenControllerEntity` instance. Pass `null` for no initial data.

#### `Interruptible($data = null)`

Create a new `InterruptibleEntity` instance. Pass `null` for no initial data.

#### `InterruptibleCapacityController($data = null)`

Create a new `InterruptibleCapacityControllerEntity` instance. Pass `null` for no initial data.

#### `Nomination($data = null)`

Create a new `NominationEntity` instance. Pass `null` for no initial data.

#### `NominationsController($data = null)`

Create a new `NominationsControllerEntity` instance. Pass `null` for no initial data.

#### `NpsController($data = null)`

Create a new `NpsControllerEntity` instance. Pass `null` for no initial data.

#### `Renomination($data = null)`

Create a new `RenominationEntity` instance. Pass `null` for no initial data.

#### `RenominationsController($data = null)`

Create a new `RenominationsControllerEntity` instance. Pass `null` for no initial data.

#### `System($data = null)`

Create a new `SystemEntity` instance. Pass `null` for no initial data.

#### `SystemController($data = null)`

Create a new `SystemControllerEntity` instance. Pass `null` for no initial data.

#### `TransmissionController($data = null)`

Create a new `TransmissionControllerEntity` instance. Pass `null` for no initial data.

#### `UmmGasController($data = null)`

Create a new `UmmGasControllerEntity` instance. Pass `null` for no initial data.

#### `UmmRssFeedController($data = null)`

Create a new `UmmRssFeedControllerEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

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

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## BalanceEntity

```php
$balance = $client->Balance();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Balance()->load(["id" => "balance_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): BalanceEntity`

Create a new `BalanceEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## BalanceControllerEntity

```php
$balance_controller = $client->BalanceController();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->BalanceController()->load(["id" => "balance_controller_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): BalanceControllerEntity`

Create a new `BalanceControllerEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## FirmEntity

```php
$firm = $client->Firm();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Firm()->load(["id" => "firm_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): FirmEntity`

Create a new `FirmEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## FirmCapacityControllerEntity

```php
$firm_capacity_controller = $client->FirmCapacityController();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->FirmCapacityController()->load(["id" => "firm_capacity_controller_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): FirmCapacityControllerEntity`

Create a new `FirmCapacityControllerEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GasBalanceControllerEntity

```php
$gas_balance_controller = $client->GasBalanceController();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->GasBalanceController()->load(["id" => "gas_balance_controller_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GasBalanceControllerEntity`

Create a new `GasBalanceControllerEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GasBorderTradeControllerEntity

```php
$gas_border_trade_controller = $client->GasBorderTradeController();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->GasBorderTradeController()->load(["id" => "gas_border_trade_controller_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GasBorderTradeControllerEntity`

Create a new `GasBorderTradeControllerEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GasSystemEntity

```php
$gas_system = $client->GasSystem();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->GasSystem()->load(["id" => "gas_system_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GasSystemEntity`

Create a new `GasSystemEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GasSystemControllerEntity

```php
$gas_system_controller = $client->GasSystemController();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->GasSystemController()->load(["id" => "gas_system_controller_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GasSystemControllerEntity`

Create a new `GasSystemControllerEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GasTradeEntity

```php
$gas_trade = $client->GasTrade();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->GasTrade()->load(["id" => "gas_trade_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GasTradeEntity`

Create a new `GasTradeEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GasTradeControllerEntity

```php
$gas_trade_controller = $client->GasTradeController();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->GasTradeController()->load(["id" => "gas_trade_controller_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GasTradeControllerEntity`

Create a new `GasTradeControllerEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GasTransmissionControllerEntity

```php
$gas_transmission_controller = $client->GasTransmissionController();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->GasTransmissionController()->load(["id" => "gas_transmission_controller_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GasTransmissionControllerEntity`

Create a new `GasTransmissionControllerEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GreenControllerEntity

```php
$green_controller = $client->GreenController();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->GreenController()->load(["id" => "green_controller_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GreenControllerEntity`

Create a new `GreenControllerEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## InterruptibleEntity

```php
$interruptible = $client->Interruptible();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Interruptible()->load(["id" => "interruptible_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): InterruptibleEntity`

Create a new `InterruptibleEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## InterruptibleCapacityControllerEntity

```php
$interruptible_capacity_controller = $client->InterruptibleCapacityController();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->InterruptibleCapacityController()->load(["id" => "interruptible_capacity_controller_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): InterruptibleCapacityControllerEntity`

Create a new `InterruptibleCapacityControllerEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## NominationEntity

```php
$nomination = $client->Nomination();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Nomination()->load(["id" => "nomination_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): NominationEntity`

Create a new `NominationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## NominationsControllerEntity

```php
$nominations_controller = $client->NominationsController();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->NominationsController()->load(["id" => "nominations_controller_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): NominationsControllerEntity`

Create a new `NominationsControllerEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## NpsControllerEntity

```php
$nps_controller = $client->NpsController();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->NpsController()->load(["id" => "nps_controller_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): NpsControllerEntity`

Create a new `NpsControllerEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RenominationEntity

```php
$renomination = $client->Renomination();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Renomination()->load(["id" => "renomination_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RenominationEntity`

Create a new `RenominationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RenominationsControllerEntity

```php
$renominations_controller = $client->RenominationsController();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->RenominationsController()->load(["id" => "renominations_controller_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RenominationsControllerEntity`

Create a new `RenominationsControllerEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SystemEntity

```php
$system = $client->System();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->System()->load(["id" => "system_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SystemEntity`

Create a new `SystemEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SystemControllerEntity

```php
$system_controller = $client->SystemController();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->SystemController()->load(["id" => "system_controller_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SystemControllerEntity`

Create a new `SystemControllerEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## TransmissionControllerEntity

```php
$transmission_controller = $client->TransmissionController();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->TransmissionController()->load(["id" => "transmission_controller_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): TransmissionControllerEntity`

Create a new `TransmissionControllerEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## UmmGasControllerEntity

```php
$umm_gas_controller = $client->UmmGasController();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->UmmGasController()->load(["id" => "umm_gas_controller_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): UmmGasControllerEntity`

Create a new `UmmGasControllerEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## UmmRssFeedControllerEntity

```php
$umm_rss_feed_controller = $client->UmmRssFeedController();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->UmmRssFeedController()->load(["id" => "umm_rss_feed_controller_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): UmmRssFeedControllerEntity`

Create a new `UmmRssFeedControllerEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new EleringDashboardSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

