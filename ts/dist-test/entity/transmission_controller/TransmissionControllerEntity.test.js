"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('TransmissionControllerEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ELERING_DASHBOARD_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ELERING_DASHBOARD_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EleringDashboardSDK.test();
        const ent = testsdk.TransmissionController();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ELERING_DASHBOARD_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'transmission_controller.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "transmission_controller", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/transmission/cross-border-capacity/{group}/csv", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "group", "or": "group", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "2020-06-30T20:59:59.999Z", "k": "query", "n": "end", "or": "end", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "field", "or": "fields", "r": false, "t": "`$ARRAY`", "index$": 1 }, { "a": true, "ex": "2020-05-31T20:59:59.999Z", "k": "query", "n": "start", "or": "start", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/transmission/cross-border-capacity/{group}/csv", "q": { "exist": ["end", "field", "group", "start"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "transmission" }, { "lit": "cross-border-capacity" }, { "var": "group" }, { "lit": "csv" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/transmission/cross-border-planned-trade/csv", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "2020-06-30T20:59:59.999Z", "k": "query", "n": "end", "or": "end", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "field", "or": "fields", "r": false, "t": "`$ARRAY`", "index$": 1 }, { "a": true, "ex": "2020-05-31T20:59:59.999Z", "k": "query", "n": "start", "or": "start", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/transmission/cross-border-planned-trade/csv", "q": { "exist": ["end", "field", "start"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "transmission" }, { "lit": "cross-border-planned-trade" }, { "lit": "csv" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /api/transmission/cross-border/csv", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "2020-06-30T20:59:59.999Z", "k": "query", "n": "end", "or": "end", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "field", "or": "fields", "r": false, "t": "`$ARRAY`", "index$": 1 }, { "a": true, "ex": "2020-05-31T20:59:59.999Z", "k": "query", "n": "start", "or": "start", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/transmission/cross-border/csv", "q": { "exist": ["end", "field", "start"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "transmission" }, { "lit": "cross-border" }, { "lit": "csv" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /api/transmission/cross-border/hourly/csv", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "2020-06-30T20:59:59.999Z", "k": "query", "n": "end", "or": "end", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "field", "or": "fields", "r": false, "t": "`$ARRAY`", "index$": 1 }, { "a": true, "ex": "2020-05-31T20:59:59.999Z", "k": "query", "n": "start", "or": "start", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/transmission/cross-border/hourly/csv", "q": { "exist": ["end", "field", "start"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "transmission" }, { "lit": "cross-border" }, { "lit": "hourly" }, { "lit": "csv" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }, { "a": true, "co": { "id": "GET /api/transmission/cross-border-capacity/{group}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "group", "or": "group", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "2020-06-30T20:59:59.999Z", "k": "query", "n": "end", "or": "end", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2020-05-31T20:59:59.999Z", "k": "query", "n": "start", "or": "start", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/transmission/cross-border-capacity/{group}", "q": { "exist": ["end", "group", "start"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "transmission" }, { "lit": "cross-border-capacity" }, { "var": "group" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/transmission/cross-border", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "2020-06-30T20:59:59.999Z", "k": "query", "n": "end", "or": "end", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2020-05-31T20:59:59.999Z", "k": "query", "n": "start", "or": "start", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/transmission/cross-border", "q": { "exist": ["end", "start"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "transmission" }, { "lit": "cross-border" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 5 }, { "a": true, "co": { "id": "GET /api/transmission/cross-border-capacity", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "2020-06-30T20:59:59.999Z", "k": "query", "n": "end", "or": "end", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2020-05-31T20:59:59.999Z", "k": "query", "n": "start", "or": "start", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/transmission/cross-border-capacity", "q": { "exist": ["end", "start"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "transmission" }, { "lit": "cross-border-capacity" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 6 }, { "a": true, "co": { "id": "GET /api/transmission/cross-border-planned-trade", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "2020-06-30T20:59:59.999Z", "k": "query", "n": "end", "or": "end", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2020-05-31T20:59:59.999Z", "k": "query", "n": "start", "or": "start", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/transmission/cross-border-planned-trade", "q": { "exist": ["end", "start"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "transmission" }, { "lit": "cross-border-planned-trade" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 7 }, { "a": true, "co": { "id": "GET /api/transmission/cross-border/hourly", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "2020-06-30T20:59:59.999Z", "k": "query", "n": "end", "or": "end", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2020-05-31T20:59:59.999Z", "k": "query", "n": "start", "or": "start", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/transmission/cross-border/hourly", "q": { "exist": ["end", "start"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "transmission" }, { "lit": "cross-border" }, { "lit": "hourly" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 8 }, { "a": true, "co": { "id": "GET /api/transmission/cross-border-planned-trade/latest", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/transmission/cross-border-planned-trade/latest", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "transmission" }, { "lit": "cross-border-planned-trade" }, { "lit": "latest" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 9 }, { "a": true, "co": { "id": "GET /api/transmission/cross-border/latest", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/transmission/cross-border/latest", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "transmission" }, { "lit": "cross-border" }, { "lit": "latest" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 10 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "transmission_controller", "name__orig": "transmission_controller", "Name": "TransmissionController", "name_": "transmission_controller", "name-": "transmission-controller", "NAME": "TRANSMISSION_CONTROLLER", "index$": 21 }, { "active": true, "entity": "transmission_controller", "key$": "BasicTransmissionControllerFlow", "kind": "basic", "name": "BasicTransmissionControllerFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "transmission_controller_ref01", "srcdatavar": "transmission_controller_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-transmission_controller_ref01" } }], "index$": 0 }] }, 'TransmissionController', { "GET /api/transmission/cross-border-capacity/{group}/csv": { "protocol": "http", "parameters": [{ "name": "start", "in": "query", "description": "start time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-05-31T20:59:59.999Z", "index$": 0 }, { "name": "end", "in": "query", "description": "end time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-06-30T20:59:59.999Z", "index$": 1 }, { "name": "group", "in": "path", "description": "group to select data for", "required": true, "schema": { "type": "string", "enum": ["FI", "LV", "RU"] }, "index$": 2 }, { "name": "fields", "in": "query", "description": "fields to include in the response", "required": false, "schema": { "type": "array", "items": { "type": "string", "enum": ["in_atc", "in_ntc", "out_atc", "out_ntc"] } }, "index$": 3 }] }, "GET /api/transmission/cross-border-planned-trade/csv": { "protocol": "http", "parameters": [{ "name": "start", "in": "query", "description": "start time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-05-31T20:59:59.999Z", "index$": 0 }, { "name": "end", "in": "query", "description": "end time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-06-30T20:59:59.999Z", "index$": 1 }, { "name": "fields", "in": "query", "description": "fields to include in csv output", "required": false, "schema": { "type": "array", "items": { "type": "string" } }, "index$": 2 }] }, "GET /api/transmission/cross-border/csv": { "protocol": "http", "parameters": [{ "name": "start", "in": "query", "description": "start time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-05-31T20:59:59.999Z", "index$": 0 }, { "name": "end", "in": "query", "description": "end time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-06-30T20:59:59.999Z", "index$": 1 }, { "name": "fields", "in": "query", "description": "fields to include in the output", "required": false, "schema": { "type": "array", "items": { "type": "string", "enum": ["latvia", "russia_narva", "russia_pihkva", "finland"] } }, "index$": 2 }] }, "GET /api/transmission/cross-border/hourly/csv": { "protocol": "http", "parameters": [{ "name": "start", "in": "query", "description": "start time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-05-31T20:59:59.999Z", "index$": 0 }, { "name": "end", "in": "query", "description": "end time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-06-30T20:59:59.999Z", "index$": 1 }, { "name": "fields", "in": "query", "description": "fields to include in the output", "required": false, "schema": { "type": "array", "items": { "type": "string", "enum": ["latvia", "russia_narva", "russia_pihkva", "finland"] } }, "index$": 2 }] }, "GET /api/transmission/cross-border-capacity/{group}": { "protocol": "http", "parameters": [{ "name": "start", "in": "query", "description": "start time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-05-31T20:59:59.999Z", "index$": 0 }, { "name": "end", "in": "query", "description": "end time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-06-30T20:59:59.999Z", "index$": 1 }, { "name": "group", "in": "path", "description": "group to select data for", "required": true, "schema": { "type": "string", "enum": ["FI", "LV", "RU"] }, "index$": 2 }] }, "GET /api/transmission/cross-border": { "protocol": "http", "parameters": [{ "name": "start", "in": "query", "description": "start time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-05-31T20:59:59.999Z", "index$": 0 }, { "name": "end", "in": "query", "description": "end time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-06-30T20:59:59.999Z", "index$": 1 }] }, "GET /api/transmission/cross-border-capacity": { "protocol": "http", "parameters": [{ "name": "start", "in": "query", "description": "start time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-05-31T20:59:59.999Z", "index$": 0 }, { "name": "end", "in": "query", "description": "end time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-06-30T20:59:59.999Z", "index$": 1 }] }, "GET /api/transmission/cross-border-planned-trade": { "protocol": "http", "parameters": [{ "name": "start", "in": "query", "description": "start time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-05-31T20:59:59.999Z", "index$": 0 }, { "name": "end", "in": "query", "description": "end time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-06-30T20:59:59.999Z", "index$": 1 }] }, "GET /api/transmission/cross-border/hourly": { "protocol": "http", "parameters": [{ "name": "start", "in": "query", "description": "start time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-05-31T20:59:59.999Z", "index$": 0 }, { "name": "end", "in": "query", "description": "end time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-06-30T20:59:59.999Z", "index$": 1 }] }, "GET /api/transmission/cross-border-planned-trade/latest": { "protocol": "http", "parameters": [] }, "GET /api/transmission/cross-border/latest": { "protocol": "http", "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let transmission_controller_ref01_data = Object.values(setup.data.existing.transmission_controller)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const transmission_controller_ref01_ent = client.TransmissionController();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/transmission_controller/TransmissionControllerTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EleringDashboardSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['transmission_controller01', 'transmission_controller02', 'transmission_controller03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ELERING_DASHBOARD_TEST_TRANSMISSION_CONTROLLER_ENTID': idmap,
        'ELERING_DASHBOARD_TEST_LIVE': 'FALSE',
        'ELERING_DASHBOARD_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ELERING_DASHBOARD_TEST_TRANSMISSION_CONTROLLER_ENTID'];
    const live = 'TRUE' === env.ELERING_DASHBOARD_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ELERING_DASHBOARD_TEST_TRANSMISSION_CONTROLLER_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.EleringDashboardSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.ELERING_DASHBOARD_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=TransmissionControllerEntity.test.js.map