# EleringDashboard SDK

Open data from Estonia's electricity and gas TSO Elering: prices, balance, capacity, nominations and grid messages

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Elering dashboard API documentation

[Elering](https://elering.ee) is Estonia's independent electricity and gas transmission system operator. The [Elering Live dashboard](https://dashboard.elering.ee) publishes near-real-time and historical operational data for the Estonian power grid and gas system, and exposes it through a small public HTTP API at `https://dashboard.elering.ee/api`.

What you typically get from this API:

- Nord Pool Spot day-ahead electricity prices for Estonia (and other Baltic/Nordic bidding zones), e.g. `GET /api/nps/price/EE/current` and `GET /api/nps/price?start=...&end=...` returning prices in EUR/MWh at hourly resolution in UTC.
- Power system status data: balance, generation/consumption, cross-border transmission and renewable (green) shares.
- Gas system data: gas balance, transmission, cross-border trade, nominations and renominations.
- Firm and interruptible capacity allocations for the gas network.
- Urgent Market Messages (UMM) for both gas and the wider grid, available as a controller endpoint and an RSS feed.

Operational notes: the freepublicapis.com community profile reports CORS is disabled and response times of roughly 300 ms. No API key or OAuth flow is documented for the read endpoints, but consumers should cache responses and respect Elering's terms of service.

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

## 30-second quickstart

### TypeScript

```ts
import { EleringDashboardSDK } from 'elering-dashboard'

const client = new EleringDashboardSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

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
| **Balance** | Power system balance figures (generation vs. consumption and balancing energy) for the Estonian grid. | `/api/balance` |
| **BalanceController** | HTTP endpoints under the balance controller that return time-series balance data for the power system. | `/api/balance/commerce/csv` |
| **Firm** | Firm (guaranteed) gas transmission capacity bookings and availability on the Estonian gas network. | `/api/capacity/firm` |
| **FirmCapacityController** | Endpoints exposing firm gas capacity allocations and remaining firm capacity per interconnection point. | `/api/capacity/firm/csv` |
| **GasBalanceController** | Endpoints returning gas system balance data (entries vs. exits, linepack, imbalance). | `/api/gas-balance/price/csv` |
| **GasBorderTradeController** | Endpoints reporting gas flows across Estonia's cross-border interconnection points. | `/api/gas/border-trade/current` |
| **GasSystem** | Operational snapshot of the Estonian gas transmission system. | `/api/gas-system` |
| **GasSystemController** | Endpoints aggregating gas system status, consumption and supply figures. | `/api/gas-system/csv` |
| **GasTrade** | Traded gas volumes within and across the Estonian gas market. | `/api/gas-trade` |
| **GasTradeController** | Endpoints returning gas trade and market data. | `/api/gas-trade/csv` |
| **GasTransmissionController** | Endpoints describing gas transmission flows through the Estonian network. | `/api/gas-transmission/cross-border/csv` |
| **GreenController** | Endpoints for renewable/green energy share and green-certificate-related data in the power system. | `/api/green/certificates` |
| **Interruptible** | Interruptible gas transmission capacity that the TSO may curtail before firm capacity. | `/api/capacity/interruptible` |
| **InterruptibleCapacityController** | Endpoints exposing interruptible gas capacity offers and bookings per interconnection point. | `/api/capacity/interruptible/csv` |
| **Nomination** | Shipper nominations (planned gas volumes) submitted to the gas TSO for a given gas day. | `/api/nominations` |
| **NominationsController** | Endpoints returning aggregated nomination data per interconnection point and gas day. | `/api/nominations/csv` |
| **NpsController** | Nord Pool Spot price endpoints such as `GET /api/nps/price/EE/current` and `GET /api/nps/price?start=...&end=...` returning day-ahead electricity prices per bidding zone in EUR/MWh. | `/api/nps/price/csv` |
| **Renomination** | Revisions to previously submitted gas nominations during the gas day. | `/api/nominations/renominations` |
| **RenominationsController** | Endpoints returning renomination volumes and history for the gas system. | `/api/nominations/renominations/csv` |
| **System** | General Estonian power system state: load, generation mix and transmission overview. | `/api/system` |
| **SystemController** | Endpoints aggregating overall electricity system status and time-series. | `/api/system/csv` |
| **TransmissionController** | Endpoints describing cross-border electricity transmission flows on Estonia's interconnectors. | `/api/transmission/cross-border-capacity/{group}/csv` |
| **UmmGasController** | Urgent Market Messages for the gas system, where the TSO publishes outages and capacity-affecting events. | `/api/umm/gas` |
| **UmmRssFeedController** | RSS feed of Urgent Market Messages for grid and market participants. | `/umm/gas/rss` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from eleringdashboard_sdk import EleringDashboardSDK

client = EleringDashboardSDK({})


# Load a specific balance
balance, err = client.Balance(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'eleringdashboard_sdk.php';

$client = new EleringDashboardSDK([]);


// Load a specific balance
[$balance, $err] = $client->Balance(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/elering-dashboard-sdk/go"

client := sdk.NewEleringDashboardSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "EleringDashboard_sdk"

client = EleringDashboardSDK.new({})


# Load a specific balance
balance, err = client.Balance(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("elering-dashboard_sdk")

local client = sdk.new({})


-- Load a specific balance
local balance, err = client:Balance(nil):load(
  { id = "example_id" }, nil
)
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
client = EleringDashboardSDK.test(None, None)
result, err = client.Balance(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = EleringDashboardSDK::test(null, null);
[$result, $err] = $client->Balance(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Balance(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = EleringDashboardSDK.test(nil, nil)
result, err = client.Balance(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Balance(nil):load(
  { id = "test01" }, nil
)
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

## Using the Elering dashboard API documentation

- Upstream: [https://dashboard.elering.ee](https://dashboard.elering.ee)

- Data is published by Elering AS, the Estonian electricity and gas transmission system operator (TSO).
- The Elering Live dashboard links to a Terms of Service and Privacy Policy; review them before commercial reuse or redistribution.
- Nord Pool Spot price data is sourced from Nord Pool; attribution and Nord Pool's own usage terms may apply.
- No authentication is documented for the public dashboard endpoints, but Elering may rate-limit or change the API without notice.

---

Generated from the Elering dashboard API documentation OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
