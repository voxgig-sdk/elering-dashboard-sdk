"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
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
        "cookies": [],
        "responseMedia": [
            "*/*"
        ],
        "query": [
            "start",
            "end"
        ],
        "queryArgs": [
            {
                "name": "end",
                "wire": "end"
            },
            {
                "name": "start",
                "wire": "start"
            }
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
        "cookies": [],
        "responseMedia": [
            "*/*"
        ],
        "query": [
            "start",
            "end"
        ],
        "queryArgs": [
            {
                "name": "end",
                "wire": "end"
            },
            {
                "name": "start",
                "wire": "start"
            }
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
        "cookies": [],
        "query": [
            "start",
            "end",
            "fields"
        ],
        "queryArgs": [
            {
                "name": "end",
                "wire": "end"
            },
            {
                "name": "field",
                "wire": "fields"
            },
            {
                "name": "start",
                "wire": "start"
            }
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
        "cookies": [],
        "responseMedia": [
            "*/*"
        ],
        "query": [],
        "queryArgs": [],
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
        "cookies": [],
        "responseMedia": [
            "*/*"
        ],
        "query": [
            "start",
            "end"
        ],
        "queryArgs": [
            {
                "name": "end",
                "wire": "end"
            },
            {
                "name": "start",
                "wire": "start"
            }
        ],
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
        "cookies": [],
        "responseMedia": [
            "*/*"
        ],
        "query": [
            "start",
            "end"
        ],
        "queryArgs": [
            {
                "name": "end",
                "wire": "end"
            },
            {
                "name": "start",
                "wire": "start"
            }
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
        "cookies": [],
        "responseMedia": [
            "*/*"
        ],
        "query": [],
        "queryArgs": [],
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
        "cookies": [],
        "query": [
            "start",
            "end",
            "fields"
        ],
        "queryArgs": [
            {
                "name": "end",
                "wire": "end"
            },
            {
                "name": "field",
                "wire": "fields"
            },
            {
                "name": "start",
                "wire": "start"
            }
        ],
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
            "fuel": "Kõik kütused",
            "technology": "Kõik tehnoloogiad",
            "type": "TRANSACTION"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "*/*"
        ],
        "query": [
            "technology",
            "fuel",
            "type"
        ],
        "queryArgs": [
            {
                "name": "fuel",
                "wire": "fuel"
            },
            {
                "name": "technology",
                "wire": "technology"
            },
            {
                "name": "type",
                "wire": "type"
            }
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
        "cookies": [],
        "responseMedia": [
            "*/*"
        ],
        "query": [
            "start",
            "end"
        ],
        "queryArgs": [
            {
                "name": "end",
                "wire": "end"
            },
            {
                "name": "start",
                "wire": "start"
            }
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
        "cookies": [],
        "query": [
            "start",
            "end",
            "fields"
        ],
        "queryArgs": [
            {
                "name": "end",
                "wire": "end"
            },
            {
                "name": "field",
                "wire": "fields"
            },
            {
                "name": "start",
                "wire": "start"
            }
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
        "cookies": [],
        "responseMedia": [
            "*/*"
        ],
        "query": [
            "start",
            "end"
        ],
        "queryArgs": [
            {
                "name": "end",
                "wire": "end"
            },
            {
                "name": "start",
                "wire": "start"
            }
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
        "cookies": [],
        "query": [
            "start",
            "end",
            "fields"
        ],
        "queryArgs": [
            {
                "name": "end",
                "wire": "end"
            },
            {
                "name": "field",
                "wire": "fields"
            },
            {
                "name": "start",
                "wire": "start"
            }
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
        "cookies": [],
        "responseMedia": [
            "*/*"
        ],
        "query": [
            "start",
            "end"
        ],
        "queryArgs": [
            {
                "name": "end",
                "wire": "end"
            },
            {
                "name": "start",
                "wire": "start"
            }
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
        "cookies": [],
        "query": [
            "start",
            "end",
            "fields"
        ],
        "queryArgs": [
            {
                "name": "end",
                "wire": "end"
            },
            {
                "name": "field",
                "wire": "fields"
            },
            {
                "name": "start",
                "wire": "start"
            }
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
        "cookies": [],
        "responseMedia": [
            "*/*"
        ],
        "query": [
            "start",
            "end"
        ],
        "queryArgs": [
            {
                "name": "end",
                "wire": "end"
            },
            {
                "name": "start",
                "wire": "start"
            }
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
            "page": 1,
            "publication_datetime_start": "v1",
            "sort": "publicationDateTimeDesc",
            "status": "current",
            "unavailability_type": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "*/*"
        ],
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
        "queryArgs": [
            {
                "name": "affected_asset_name",
                "wire": "affected_asset_name"
            },
            {
                "name": "event_duration_date_time_end",
                "wire": "event_duration_date_time_end"
            },
            {
                "name": "event_duration_date_time_start",
                "wire": "event_duration_date_time_start"
            },
            {
                "name": "event_status",
                "wire": "event_status"
            },
            {
                "name": "event_type",
                "wire": "event_type"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "publication_datetime_start",
                "wire": "publication_datetime_start"
            },
            {
                "name": "sort",
                "wire": "sort"
            },
            {
                "name": "status",
                "wire": "status"
            },
            {
                "name": "unavailability_type",
                "wire": "unavailability_type"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map