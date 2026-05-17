# EleringDashboard SDK



Available for [Golang](go/) and [Go CLI](go-cli/) and [Lua](lua/) and [PHP](php/) and [Python](py/) and [Ruby](rb/) and [TypeScript](ts/).


## Entities

The API exposes 24 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Balance** |  | `/api/balance` |
| **BalanceController** |  | `/api/balance/commerce/csv` |
| **Firm** |  | `/api/capacity/firm` |
| **FirmCapacityController** |  | `/api/capacity/firm/csv` |
| **GasBalanceController** |  | `/api/gas-balance/price/csv` |
| **GasBorderTradeController** |  | `/api/gas/border-trade/current` |
| **GasSystem** |  | `/api/gas-system` |
| **GasSystemController** |  | `/api/gas-system/csv` |
| **GasTrade** |  | `/api/gas-trade` |
| **GasTradeController** |  | `/api/gas-trade/csv` |
| **GasTransmissionController** |  | `/api/gas-transmission/cross-border/csv` |
| **GreenController** |  | `/api/green/certificates` |
| **Interruptible** |  | `/api/capacity/interruptible` |
| **InterruptibleCapacityController** |  | `/api/capacity/interruptible/csv` |
| **Nomination** |  | `/api/nominations` |
| **NominationsController** |  | `/api/nominations/csv` |
| **NpsController** |  | `/api/nps/price/csv` |
| **Renomination** |  | `/api/nominations/renominations` |
| **RenominationsController** |  | `/api/nominations/renominations/csv` |
| **System** |  | `/api/system` |
| **SystemController** |  | `/api/system/csv` |
| **TransmissionController** |  | `/api/transmission/cross-border-capacity/{group}/csv` |
| **UmmGasController** |  | `/api/umm/gas` |
| **UmmRssFeedController** |  | `/umm/gas/rss` |

Each entity supports the following operations where available: **load**, **list**, **create**,
**update**, and **remove**.


## Architecture

### Entity-operation model

Every SDK call follows the same pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

At each stage a feature hook fires (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), allowing features to inspect or modify the pipeline.

### Features

Features are hook-based middleware that extend SDK behaviour.

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

You can add custom features by passing them in the `extend` option at
construction time.

### Direct and Prepare

For endpoints not covered by the entity model, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`, `headers`,
and `body`.


## Quick start

### Golang

```go
import sdk "github.com/voxgig-sdk/elering-dashboard-sdk/go"

client := sdk.NewEleringDashboardSDK(map[string]any{
    "apikey": os.Getenv("ELERING-DASHBOARD_APIKEY"),
})

```

### Lua

```lua
local sdk = require("elering-dashboard_sdk")

local client = sdk.new({
  apikey = os.getenv("ELERING-DASHBOARD_APIKEY"),
})


-- Load a specific balance
local balance, err = client:Balance(nil):load(
  { id = "example_id" }, nil
)
```

### PHP

```php
<?php
require_once 'eleringdashboard_sdk.php';

$client = new EleringDashboardSDK([
    "apikey" => getenv("ELERING-DASHBOARD_APIKEY"),
]);


// Load a specific balance
[$balance, $err] = $client->Balance(null)->load(
    ["id" => "example_id"], null
);
```

### Python

```python
import os
from eleringdashboard_sdk import EleringDashboardSDK

client = EleringDashboardSDK({
    "apikey": os.environ.get("ELERING-DASHBOARD_APIKEY"),
})


# Load a specific balance
balance, err = client.Balance(None).load(
    {"id": "example_id"}, None
)
```

### Ruby

```ruby
require_relative "EleringDashboard_sdk"

client = EleringDashboardSDK.new({
  "apikey" => ENV["ELERING-DASHBOARD_APIKEY"],
})


# Load a specific balance
balance, err = client.Balance(nil).load(
  { "id" => "example_id" }, nil
)
```

### TypeScript

```ts
import { EleringDashboardSDK } from 'elering-dashboard'

const client = new EleringDashboardSDK({
  apikey: process.env.ELERING-DASHBOARD_APIKEY,
})

```


## Testing

Both SDKs provide a test mode that replaces the HTTP transport with an
in-memory mock, so tests run without a network connection.

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Balance(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Balance(nil):load(
  { id = "test01" }, nil
)
```

### PHP

```php
$client = EleringDashboardSDK::test(null, null);
[$result, $err] = $client->Balance(null)->load(
    ["id" => "test01"], null
);
```

### Python

```python
client = EleringDashboardSDK.test(None, None)
result, err = client.Balance(None).load(
    {"id": "test01"}, None
)
```

### Ruby

```ruby
client = EleringDashboardSDK.test(nil, nil)
result, err = client.Balance(nil).load(
  { "id" => "test01" }, nil
)
```

### TypeScript

```ts
const client = EleringDashboardSDK.test()
const result = await client.Balance().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```


## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```


## Language-specific documentation

- [Golang SDK](go/README.md)
- [Go CLI SDK](go-cli/README.md)
- [Lua SDK](lua/README.md)
- [PHP SDK](php/README.md)
- [Python SDK](py/README.md)
- [Ruby SDK](rb/README.md)
- [TypeScript SDK](ts/README.md)

