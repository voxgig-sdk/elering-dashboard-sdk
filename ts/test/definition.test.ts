import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "balance",
    "accessor": "Balance",
    "op": "load",
    "method": "GET",
    "path": "/api/balance",
    "args": [],
    "select": {
      "end": "2020-06-30T20:59:59.999Z",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "balance_controller",
    "accessor": "BalanceController",
    "op": "load",
    "method": "GET",
    "path": "/api/balance/total",
    "args": [],
    "select": {
      "end": "2020-06-30T20:59:59.999Z",
      "field": "v1"
    },
    "headers": [],
    "query": [
      "fields",
      "end"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "balance_controller",
    "accessor": "BalanceController",
    "op": "load",
    "method": "GET",
    "path": "/api/balance/commerce",
    "args": [],
    "select": {
      "end": "2020-06-30T20:59:59.999Z",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "firm",
    "accessor": "Firm",
    "op": "load",
    "method": "GET",
    "path": "/api/capacity/firm",
    "args": [],
    "select": {
      "end": "2020-06-30T20:59:59.999Z",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "firm_capacity_controller",
    "accessor": "FirmCapacityController",
    "op": "load",
    "method": "GET",
    "path": "/api/capacity/firm/csv",
    "args": [],
    "select": {
      "end": "2020-05-31T20:59:59.999Z",
      "field": "v1",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end",
      "fields"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "gas_balance_controller",
    "accessor": "GasBalanceController",
    "op": "load",
    "method": "GET",
    "path": "/api/gas-balance/price/csv",
    "args": [],
    "select": {
      "end": "2020-06-30T20:59:59.999Z",
      "field": "v1",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end",
      "fields"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "gas_balance_controller",
    "accessor": "GasBalanceController",
    "op": "load",
    "method": "GET",
    "path": "/api/gas-balance/price",
    "args": [],
    "select": {
      "end": "2020-06-30T20:59:59.999Z",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "gas_border_trade_controller",
    "accessor": "GasBorderTradeController",
    "op": "load",
    "method": "GET",
    "path": "/api/gas/border-trade/current",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "gas_system",
    "accessor": "GasSystem",
    "op": "load",
    "method": "GET",
    "path": "/api/gas-system",
    "args": [],
    "select": {
      "end": "2020-06-30T20:59:59.999Z",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "gas_system_controller",
    "accessor": "GasSystemController",
    "op": "load",
    "method": "GET",
    "path": "/api/gas-system/latest",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "gas_trade",
    "accessor": "GasTrade",
    "op": "load",
    "method": "GET",
    "path": "/api/gas-trade",
    "args": [],
    "select": {
      "end": "2020-06-30T20:59:59.999Z",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "gas_trade_controller",
    "accessor": "GasTradeController",
    "op": "load",
    "method": "GET",
    "path": "/api/gas-trade/csv",
    "args": [],
    "select": {
      "end": "2020-06-30T20:59:59.999Z",
      "field": "v1",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end",
      "fields"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "gas_trade_controller",
    "accessor": "GasTradeController",
    "op": "load",
    "method": "GET",
    "path": "/api/gas-trade/{group}/latest",
    "args": [
      {
        "name": "group",
        "wire": "group",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "gas_transmission_controller",
    "accessor": "GasTransmissionController",
    "op": "load",
    "method": "GET",
    "path": "/api/gas-transmission/cross-border/csv",
    "args": [],
    "select": {
      "end": "2020-06-30T20:59:59.999Z",
      "field": "v1",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end",
      "fields"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "gas_transmission_controller",
    "accessor": "GasTransmissionController",
    "op": "load",
    "method": "GET",
    "path": "/api/gas-transmission/cross-border",
    "args": [],
    "select": {
      "end": "2020-06-30T20:59:59.999Z",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "gas_transmission_controller",
    "accessor": "GasTransmissionController",
    "op": "load",
    "method": "GET",
    "path": "/api/gas-transmission/cross-border/latest",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "green_controller",
    "accessor": "GreenController",
    "op": "load",
    "method": "GET",
    "path": "/api/green/certificates",
    "args": [],
    "select": {
      "fuel": "v1",
      "technology": "v1",
      "type": "v1"
    },
    "headers": [],
    "query": [
      "technology",
      "fuel",
      "type"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "interruptible",
    "accessor": "Interruptible",
    "op": "load",
    "method": "GET",
    "path": "/api/capacity/interruptible",
    "args": [],
    "select": {
      "end": "2020-06-30T20:59:59.999Z",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "interruptible_capacity_controller",
    "accessor": "InterruptibleCapacityController",
    "op": "load",
    "method": "GET",
    "path": "/api/capacity/interruptible/csv",
    "args": [],
    "select": {
      "end": "2020-05-31T20:59:59.999Z",
      "field": "v1",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end",
      "fields"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "nomination",
    "accessor": "Nomination",
    "op": "load",
    "method": "GET",
    "path": "/api/nominations",
    "args": [],
    "select": {
      "end": "2020-06-30T20:59:59.999Z",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "nominations_controller",
    "accessor": "NominationsController",
    "op": "load",
    "method": "GET",
    "path": "/api/nominations/csv",
    "args": [],
    "select": {
      "end": "2020-06-30T20:59:59.999Z",
      "field": "v1",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end",
      "fields"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "renomination",
    "accessor": "Renomination",
    "op": "load",
    "method": "GET",
    "path": "/api/nominations/renominations",
    "args": [],
    "select": {
      "end": "2020-06-30T20:59:59.999Z",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "renominations_controller",
    "accessor": "RenominationsController",
    "op": "load",
    "method": "GET",
    "path": "/api/nominations/renominations/csv",
    "args": [],
    "select": {
      "end": "2020-06-30T20:59:59.999Z",
      "field": "v1",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end",
      "fields"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "system",
    "accessor": "System",
    "op": "load",
    "method": "GET",
    "path": "/api/system",
    "args": [],
    "select": {
      "end": "2020-06-30T20:59:59.999Z",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "system_controller",
    "accessor": "SystemController",
    "op": "load",
    "method": "GET",
    "path": "/api/system/with-plan",
    "args": [],
    "select": {
      "end": "2020-06-30T20:59:59.999Z",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "system_controller",
    "accessor": "SystemController",
    "op": "load",
    "method": "GET",
    "path": "/api/system/latest",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "transmission_controller",
    "accessor": "TransmissionController",
    "op": "load",
    "method": "GET",
    "path": "/api/transmission/cross-border-capacity/{group}/csv",
    "args": [
      {
        "name": "group",
        "wire": "group",
        "value": "p1"
      }
    ],
    "select": {
      "end": "2020-06-30T20:59:59.999Z",
      "field": "v1",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end",
      "fields"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "transmission_controller",
    "accessor": "TransmissionController",
    "op": "load",
    "method": "GET",
    "path": "/api/transmission/cross-border-capacity/{group}",
    "args": [
      {
        "name": "group",
        "wire": "group",
        "value": "p1"
      }
    ],
    "select": {
      "end": "2020-06-30T20:59:59.999Z",
      "start": "2020-05-31T20:59:59.999Z"
    },
    "headers": [],
    "query": [
      "start",
      "end"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "umm_gas_controller",
    "accessor": "UmmGasController",
    "op": "load",
    "method": "GET",
    "path": "/api/umm/gas",
    "args": [],
    "select": {
      "affected_asset_name": "v1",
      "event_duration_date_time_end": "v1",
      "event_duration_date_time_start": "v1",
      "event_status": "v1",
      "event_type": "v1",
      "page": "v1",
      "publication_datetime_start": "v1",
      "sort": "v1",
      "status": "v1",
      "unavailability_type": "v1"
    },
    "headers": [],
    "query": [
      "status",
      "event_status",
      "event_type",
      "unavailability_type",
      "affected_asset_name",
      "event_duration_date_time_start",
      "event_duration_date_time_end",
      "publication_datetime_start",
      "page",
      "sort"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
