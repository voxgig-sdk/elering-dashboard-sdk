# EleringDashboard SDK

Elering dashboard API documentation client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## Try it

**TypeScript**
```bash
npm install elering-dashboard
```

**Python**
```bash
pip install elering-dashboard-sdk
```

**PHP**
```bash
composer require voxgig/elering-dashboard-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/elering-dashboard-sdk/go
```

**Ruby**
```bash
gem install elering-dashboard-sdk
```

**Lua**
```bash
luarocks install elering-dashboard-sdk
```

## Quickstart

### TypeScript

```ts
import { EleringDashboardSDK } from 'elering-dashboard'

const client = new EleringDashboardSDK({
  apikey: process.env.ELERING-DASHBOARD_APIKEY,
})

// Load balance data
const balance = await client.Balance().load({})
console.log(balance.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o elering-dashboard-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "elering-dashboard": {
      "command": "/abs/path/to/elering-dashboard-mcp"
    }
  }
}
```

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

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from eleringdashboard_sdk import EleringDashboardSDK

client = EleringDashboardSDK({
    "apikey": os.environ.get("ELERING-DASHBOARD_APIKEY"),
})


# Load a specific balance
balance, err = client.Balance().load({"id": "example_id"})
print(balance)
```

### PHP

```php
<?php
require_once 'eleringdashboard_sdk.php';

$client = new EleringDashboardSDK([
    "apikey" => getenv("ELERING-DASHBOARD_APIKEY"),
]);


// Load a specific balance
[$balance, $err] = $client->Balance()->load(["id" => "example_id"]);
print_r($balance);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/elering-dashboard-sdk/go"

client := sdk.NewEleringDashboardSDK(map[string]any{
    "apikey": os.Getenv("ELERING-DASHBOARD_APIKEY"),
})

// Load balance data
balance, err := client.Balance(nil).Load(map[string]any{}, nil)
fmt.Println(balance)
```

### Ruby

```ruby
require_relative "EleringDashboard_sdk"

client = EleringDashboardSDK.new({
  "apikey" => ENV["ELERING-DASHBOARD_APIKEY"],
})


# Load a specific balance
balance, err = client.Balance().load({ "id" => "example_id" })
puts balance
```

### Lua

```lua
local sdk = require("elering-dashboard_sdk")

local client = sdk.new({
  apikey = os.getenv("ELERING-DASHBOARD_APIKEY"),
})


-- Load a specific balance
local balance, err = client:Balance():load({ id = "example_id" })
print(balance)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = EleringDashboardSDK.test()
const result = await client.Balance().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = EleringDashboardSDK.test()
result, err = client.Balance().load({"id": "test01"})
```

### PHP

```php
$client = EleringDashboardSDK::test();
[$result, $err] = $client->Balance()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Balance(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = EleringDashboardSDK.test
result, err = client.Balance().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Balance():load({ id = "test01" })
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
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

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
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

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

---

Generated from the Elering dashboard API documentation OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
