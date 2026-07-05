# EleringDashboard TypeScript SDK



The TypeScript SDK for the EleringDashboard API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Balance()` — each with a small set of operations (`load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/elering-dashboard-sdk/releases](https://github.com/voxgig-sdk/elering-dashboard-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { EleringDashboardSDK } from '@voxgig-sdk/elering-dashboard'

const client = new EleringDashboardSDK()
```

### 3. Load a balance

`load()` returns the entity directly and throws on failure:

```ts
try {
  const balance = await client.Balance().load()
  console.log(balance)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const balance = await client.Balance().load()
  console.log(balance)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = EleringDashboardSDK.test()

const balance = await client.Balance().load()
// balance is a bare entity populated with mock response data
console.log(balance)
```

You can also use the instance method:

```ts
const client = new EleringDashboardSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Balance()

// First call runs the operation and stores its result
await entity.load()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new EleringDashboardSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
ELERING_DASHBOARD_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### EleringDashboardSDK

#### Constructor

```ts
new EleringDashboardSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Balance(data?)` | `BalanceEntity` | Create a Balance entity instance. |
| `BalanceController(data?)` | `BalanceControllerEntity` | Create a BalanceController entity instance. |
| `Firm(data?)` | `FirmEntity` | Create a Firm entity instance. |
| `FirmCapacityController(data?)` | `FirmCapacityControllerEntity` | Create a FirmCapacityController entity instance. |
| `GasBalanceController(data?)` | `GasBalanceControllerEntity` | Create a GasBalanceController entity instance. |
| `GasBorderTradeController(data?)` | `GasBorderTradeControllerEntity` | Create a GasBorderTradeController entity instance. |
| `GasSystem(data?)` | `GasSystemEntity` | Create a GasSystem entity instance. |
| `GasSystemController(data?)` | `GasSystemControllerEntity` | Create a GasSystemController entity instance. |
| `GasTrade(data?)` | `GasTradeEntity` | Create a GasTrade entity instance. |
| `GasTradeController(data?)` | `GasTradeControllerEntity` | Create a GasTradeController entity instance. |
| `GasTransmissionController(data?)` | `GasTransmissionControllerEntity` | Create a GasTransmissionController entity instance. |
| `GreenController(data?)` | `GreenControllerEntity` | Create a GreenController entity instance. |
| `Interruptible(data?)` | `InterruptibleEntity` | Create an Interruptible entity instance. |
| `InterruptibleCapacityController(data?)` | `InterruptibleCapacityControllerEntity` | Create an InterruptibleCapacityController entity instance. |
| `Nomination(data?)` | `NominationEntity` | Create a Nomination entity instance. |
| `NominationsController(data?)` | `NominationsControllerEntity` | Create a NominationsController entity instance. |
| `NpsController(data?)` | `NpsControllerEntity` | Create a NpsController entity instance. |
| `Renomination(data?)` | `RenominationEntity` | Create a Renomination entity instance. |
| `RenominationsController(data?)` | `RenominationsControllerEntity` | Create a RenominationsController entity instance. |
| `System(data?)` | `SystemEntity` | Create a System entity instance. |
| `SystemController(data?)` | `SystemControllerEntity` | Create a SystemController entity instance. |
| `TransmissionController(data?)` | `TransmissionControllerEntity` | Create a TransmissionController entity instance. |
| `UmmGasController(data?)` | `UmmGasControllerEntity` | Create an UmmGasController entity instance. |
| `UmmRssFeedController(data?)` | `UmmRssFeedControllerEntity` | Create an UmmRssFeedController entity instance. |
| `tester(testopts?, sdkopts?)` | `EleringDashboardSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `EleringDashboardSDK.test(testopts?, sdkopts?)` | `EleringDashboardSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): EleringDashboardSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Balance

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/balance`

#### BalanceController

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/balance/commerce/csv`

#### Firm

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/capacity/firm`

#### FirmCapacityController

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/capacity/firm/csv`

#### GasBalanceController

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/gas-balance/price/csv`

#### GasBorderTradeController

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/gas/border-trade/current`

#### GasSystem

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/gas-system`

#### GasSystemController

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/gas-system/csv`

#### GasTrade

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/gas-trade`

#### GasTradeController

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/gas-trade/csv`

#### GasTransmissionController

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/gas-transmission/cross-border/csv`

#### GreenController

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/green/certificates`

#### Interruptible

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/capacity/interruptible`

#### InterruptibleCapacityController

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/capacity/interruptible/csv`

#### Nomination

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/nominations`

#### NominationsController

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/nominations/csv`

#### NpsController

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/nps/price/csv`

#### Renomination

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/nominations/renominations`

#### RenominationsController

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/nominations/renominations/csv`

#### System

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/system`

#### SystemController

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/system/csv`

#### TransmissionController

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/transmission/cross-border-capacity/{group}/csv`

#### UmmGasController

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/umm/gas`

#### UmmRssFeedController

| Field | Description |
| --- | --- |

Operations: load.

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
const balance = await client.Balance().load()
```


### BalanceController

Create an instance: `const balance_controller = client.BalanceController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const balance_controller = await client.BalanceController().load()
```


### Firm

Create an instance: `const firm = client.Firm()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const firm = await client.Firm().load()
```


### FirmCapacityController

Create an instance: `const firm_capacity_controller = client.FirmCapacityController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const firm_capacity_controller = await client.FirmCapacityController().load()
```


### GasBalanceController

Create an instance: `const gas_balance_controller = client.GasBalanceController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const gas_balance_controller = await client.GasBalanceController().load()
```


### GasBorderTradeController

Create an instance: `const gas_border_trade_controller = client.GasBorderTradeController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const gas_border_trade_controller = await client.GasBorderTradeController().load()
```


### GasSystem

Create an instance: `const gas_system = client.GasSystem()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const gas_system = await client.GasSystem().load()
```


### GasSystemController

Create an instance: `const gas_system_controller = client.GasSystemController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const gas_system_controller = await client.GasSystemController().load()
```


### GasTrade

Create an instance: `const gas_trade = client.GasTrade()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const gas_trade = await client.GasTrade().load()
```


### GasTradeController

Create an instance: `const gas_trade_controller = client.GasTradeController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const gas_trade_controller = await client.GasTradeController().load()
```


### GasTransmissionController

Create an instance: `const gas_transmission_controller = client.GasTransmissionController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const gas_transmission_controller = await client.GasTransmissionController().load()
```


### GreenController

Create an instance: `const green_controller = client.GreenController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const green_controller = await client.GreenController().load()
```


### Interruptible

Create an instance: `const interruptible = client.Interruptible()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const interruptible = await client.Interruptible().load()
```


### InterruptibleCapacityController

Create an instance: `const interruptible_capacity_controller = client.InterruptibleCapacityController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const interruptible_capacity_controller = await client.InterruptibleCapacityController().load()
```


### Nomination

Create an instance: `const nomination = client.Nomination()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const nomination = await client.Nomination().load()
```


### NominationsController

Create an instance: `const nominations_controller = client.NominationsController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const nominations_controller = await client.NominationsController().load()
```


### NpsController

Create an instance: `const nps_controller = client.NpsController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const nps_controller = await client.NpsController().load()
```


### Renomination

Create an instance: `const renomination = client.Renomination()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const renomination = await client.Renomination().load()
```


### RenominationsController

Create an instance: `const renominations_controller = client.RenominationsController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const renominations_controller = await client.RenominationsController().load()
```


### System

Create an instance: `const system = client.System()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const system = await client.System().load()
```


### SystemController

Create an instance: `const system_controller = client.SystemController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const system_controller = await client.SystemController().load()
```


### TransmissionController

Create an instance: `const transmission_controller = client.TransmissionController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const transmission_controller = await client.TransmissionController().load()
```


### UmmGasController

Create an instance: `const umm_gas_controller = client.UmmGasController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const umm_gas_controller = await client.UmmGasController().load()
```


### UmmRssFeedController

Create an instance: `const umm_rss_feed_controller = client.UmmRssFeedController()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const umm_rss_feed_controller = await client.UmmRssFeedController().load()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
elering-dashboard/
├── src/
│   ├── EleringDashboardSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { EleringDashboardSDK } from '@voxgig-sdk/elering-dashboard'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const balance = client.Balance()
await balance.load()

// balance.data() now returns the balance data from the last `load`
// balance.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
