# Elering dashboard API documentation

This document describes different data sets that Elering Dashboard is providing.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 24 entities and 62 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Balance

Results: OK.

SDK operations: `load`.

### BalanceController

Results: OK.

SDK operations: `load`.

### Firm

Results: OK.

SDK operations: `load`.

### FirmCapacityController

Results: OK.

SDK operations: `load`.

### GasBalanceController

Results: OK.

SDK operations: `load`.

### GasBorderTradeController

Results: OK.

SDK operations: `load`.

### GasSystem

Results: OK.

SDK operations: `load`.

### GasSystemController

Results: OK.

SDK operations: `load`.

### GasTrade

Results: OK.

SDK operations: `load`.

### GasTradeController

Results: OK.

SDK operations: `load`.

### GasTransmissionController

Results: OK.

SDK operations: `load`.

### GreenController

Results: OK.

SDK operations: `load`.

### Interruptible

Results: OK.

SDK operations: `load`.

### InterruptibleCapacityController

Results: OK.

SDK operations: `load`.

### Nomination

Results: OK.

SDK operations: `load`.

### NominationsController

Results: OK.

SDK operations: `load`.

### NpsController

Results: OK.

SDK operations: `load`.

### Renomination

Results: OK.

SDK operations: `load`.

### RenominationsController

Results: OK.

SDK operations: `load`.

### System

Results: OK.

SDK operations: `load`.

### SystemController

Results: OK.

SDK operations: `load`.

### TransmissionController

Results: OK.

SDK operations: `load`.

### UmmGasController

Results: OK.

SDK operations: `load`.

### UmmRssFeedController

Results: OK.

SDK operations: `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Balance | `load` | `GET /api/balance` | See reference |
| BalanceController | `load` | `GET /api/balance/commerce/csv` | See reference |
| BalanceController | `load` | `GET /api/balance/csv` | See reference |
| BalanceController | `load` | `GET /api/balance/total/csv` | See reference |
| BalanceController | `load` | `GET /api/balance/total` | See reference |
| BalanceController | `load` | `GET /api/balance/commerce` | See reference |
| BalanceController | `load` | `GET /api/balance/commerce/latest` | See reference |
| BalanceController | `load` | `GET /api/balance/total/latest` | See reference |
| Firm | `load` | `GET /api/capacity/firm` | See reference |
| FirmCapacityController | `load` | `GET /api/capacity/firm/csv` | See reference |
| GasBalanceController | `load` | `GET /api/gas-balance/price/csv` | See reference |
| GasBalanceController | `load` | `GET /api/gas-balance/price` | See reference |
| GasBorderTradeController | `load` | `GET /api/gas/border-trade/current` | See reference |
| GasSystem | `load` | `GET /api/gas-system` | See reference |
| GasSystemController | `load` | `GET /api/gas-system/csv` | See reference |
| GasSystemController | `load` | `GET /api/gas-system/daily/csv` | See reference |
| GasSystemController | `load` | `GET /api/gas-system/m3/csv` | See reference |
| GasSystemController | `load` | `GET /api/gas-system/daily` | See reference |
| GasSystemController | `load` | `GET /api/gas-system/daily-average` | See reference |
| GasSystemController | `load` | `GET /api/gas-system/m3` | See reference |
| GasSystemController | `load` | `GET /api/gas-system/latest` | See reference |
| GasTrade | `load` | `GET /api/gas-trade` | See reference |
| GasTradeController | `load` | `GET /api/gas-trade/csv` | See reference |
| GasTradeController | `load` | `GET /api/gas-trade/{group}/latest` | See reference |
| GasTransmissionController | `load` | `GET /api/gas-transmission/cross-border/csv` | See reference |
| GasTransmissionController | `load` | `GET /api/gas-transmission/cross-border` | See reference |
| GasTransmissionController | `load` | `GET /api/gas-transmission/cross-border/latest` | See reference |
| GreenController | `load` | `GET /api/green/certificates` | See reference |
| Interruptible | `load` | `GET /api/capacity/interruptible` | See reference |
| InterruptibleCapacityController | `load` | `GET /api/capacity/interruptible/csv` | See reference |
| Nomination | `load` | `GET /api/nominations` | See reference |
| NominationsController | `load` | `GET /api/nominations/csv` | See reference |
| NpsController | `load` | `GET /api/nps/price/csv` | See reference |
| NpsController | `load` | `GET /api/nps/turnover/csv` | See reference |
| NpsController | `load` | `GET /api/nps/price` | See reference |
| NpsController | `load` | `GET /api/nps/turnover` | See reference |
| NpsController | `load` | `GET /api/nps/price/{group}/current` | See reference |
| NpsController | `load` | `GET /api/nps/price/{group}/latest` | See reference |
| NpsController | `load` | `GET /api/nps/turnover/{group}/latest` | See reference |
| Renomination | `load` | `GET /api/nominations/renominations` | See reference |
| RenominationsController | `load` | `GET /api/nominations/renominations/csv` | See reference |
| System | `load` | `GET /api/system` | See reference |
| SystemController | `load` | `GET /api/system/csv` | See reference |
| SystemController | `load` | `GET /api/system/with-plan/csv` | See reference |
| SystemController | `load` | `GET /api/system/with-plan` | See reference |
| SystemController | `load` | `GET /api/system/latest` | See reference |
| TransmissionController | `load` | `GET /api/transmission/cross-border-capacity/{group}/csv` | See reference |
| TransmissionController | `load` | `GET /api/transmission/cross-border-planned-trade/csv` | See reference |
| TransmissionController | `load` | `GET /api/transmission/cross-border/csv` | See reference |
| TransmissionController | `load` | `GET /api/transmission/cross-border/hourly/csv` | See reference |
| TransmissionController | `load` | `GET /api/transmission/cross-border-capacity/{group}` | See reference |
| TransmissionController | `load` | `GET /api/transmission/cross-border` | See reference |
| TransmissionController | `load` | `GET /api/transmission/cross-border-capacity` | See reference |
| TransmissionController | `load` | `GET /api/transmission/cross-border-planned-trade` | See reference |
| TransmissionController | `load` | `GET /api/transmission/cross-border/hourly` | See reference |
| TransmissionController | `load` | `GET /api/transmission/cross-border-planned-trade/latest` | See reference |
| TransmissionController | `load` | `GET /api/transmission/cross-border/latest` | See reference |
| UmmGasController | `load` | `GET /api/umm/gas` | See reference |
| UmmGasController | `load` | `GET /api/umm/gas/messages` | See reference |
| UmmGasController | `load` | `GET /api/umm/single/{id}` | See reference |
| UmmRssFeedController | `load` | `GET /umm/gas/rss` | See reference |
| UmmRssFeedController | `load` | `GET /umm/gas/rss/aris` | See reference |

## Connect to the API

- API server: `https://dashboard.elering.ee`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `elering-dashboard_list`: List records for an entity. No active entity supports this operation.
- `elering-dashboard_load`: Load one record for an entity. Supported entities: `balance`, `balance_controller`, `firm`, `firm_capacity_controller`, `gas_balance_controller`, `gas_border_trade_controller`, `gas_system`, `gas_system_controller`, `gas_trade`, `gas_trade_controller`, `gas_transmission_controller`, `green_controller`, `interruptible`, `interruptible_capacity_controller`, `nomination`, `nominations_controller`, `nps_controller`, `renomination`, `renominations_controller`, `system`, `system_controller`, `transmission_controller`, `umm_gas_controller`, `umm_rss_feed_controller`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

