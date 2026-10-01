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
(0, node_test_1.describe)('SystemControllerEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ELERING_DASHBOARD_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ELERING_DASHBOARD_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EleringDashboardSDK.test();
        const ent = testsdk.SystemController();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ELERING_DASHBOARD_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'system_controller.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "system_controller", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/system/csv", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "2020-06-30T20:59:59.999Z", "k": "query", "n": "end", "or": "end", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "field", "or": "fields", "r": false, "t": "`$ARRAY`", "index$": 1 }, { "a": true, "ex": "2020-05-31T20:59:59.999Z", "k": "query", "n": "start", "or": "start", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/system/csv", "q": { "exist": ["end", "field", "start"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "system" }, { "lit": "csv" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/system/with-plan/csv", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "2020-06-30T20:59:59.999Z", "k": "query", "n": "end", "or": "end", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "field", "or": "fields", "r": false, "t": "`$ARRAY`", "index$": 1 }, { "a": true, "ex": "2020-05-31T20:59:59.999Z", "k": "query", "n": "start", "or": "start", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/system/with-plan/csv", "q": { "exist": ["end", "field", "start"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "system" }, { "lit": "with-plan" }, { "lit": "csv" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /api/system/with-plan", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "2020-06-30T20:59:59.999Z", "k": "query", "n": "end", "or": "end", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2020-05-31T20:59:59.999Z", "k": "query", "n": "start", "or": "start", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/system/with-plan", "q": { "exist": ["end", "start"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "system" }, { "lit": "with-plan" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /api/system/latest", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/system/latest", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "system" }, { "lit": "latest" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "system_controller", "name__orig": "system_controller", "Name": "SystemController", "name_": "system_controller", "name-": "system-controller", "NAME": "SYSTEM_CONTROLLER", "index$": 20 }, { "active": true, "entity": "system_controller", "key$": "BasicSystemControllerFlow", "kind": "basic", "name": "BasicSystemControllerFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "system_controller_ref01", "srcdatavar": "system_controller_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-system_controller_ref01" } }], "index$": 0 }] }, 'SystemController', { "GET /api/system/csv": { "protocol": "http", "parameters": [{ "name": "start", "in": "query", "description": "start time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-05-31T20:59:59.999Z", "index$": 0 }, { "name": "end", "in": "query", "description": "end time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-06-30T20:59:59.999Z", "index$": 1 }, { "name": "fields", "in": "query", "description": "data fields to include in the csv file", "required": false, "allowEmptyValue": true, "schema": { "type": "array", "items": { "type": "string", "enum": ["production", "consumption", "renewable_production", "frequency", "system_balance", "solar_energy_production", "ac_balance"] } }, "index$": 2 }] }, "GET /api/system/with-plan/csv": { "protocol": "http", "parameters": [{ "name": "start", "in": "query", "description": "start time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-05-31T20:59:59.999Z", "index$": 0 }, { "name": "end", "in": "query", "description": "end time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-06-30T20:59:59.999Z", "index$": 1 }, { "name": "fields", "in": "query", "description": "data fields to include in the csv file", "required": false, "allowEmptyValue": true, "schema": { "type": "array", "items": { "type": "string", "enum": ["production", "consumption", "renewable_production", "solar_energy_production", "solar_energy_forecast", "solar_energy_forecast_operator", "frequency", "system_balance", "ac_balance", "productionPlan", "consumptionPlan", "renewable_production_plan", "renewable_production_plan_operator", "lossesPlan", "system_balancePlan", "ac_balancePlan"] } }, "index$": 2 }] }, "GET /api/system/with-plan": { "protocol": "http", "parameters": [{ "name": "start", "in": "query", "description": "start time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-05-31T20:59:59.999Z", "index$": 0 }, { "name": "end", "in": "query", "description": "end time for data", "required": false, "schema": { "type": "string", "format": "date-time" }, "example": "2020-06-30T20:59:59.999Z", "index$": 1 }] }, "GET /api/system/latest": { "protocol": "http", "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let system_controller_ref01_data = Object.values(setup.data.existing.system_controller)[0];
        // LOAD
        const system_controller_ref01_ent = client.SystemController();
        const system_controller_ref01_match_dt0 = {};
        const system_controller_ref01_data_dt0 = (await system_controller_ref01_ent.load(system_controller_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != system_controller_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/system_controller/SystemControllerTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EleringDashboardSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['system_controller01', 'system_controller02', 'system_controller03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ELERING_DASHBOARD_TEST_SYSTEM_CONTROLLER_ENTID': idmap,
        'ELERING_DASHBOARD_TEST_LIVE': 'FALSE',
        'ELERING_DASHBOARD_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ELERING_DASHBOARD_TEST_SYSTEM_CONTROLLER_ENTID'];
    const live = 'TRUE' === env.ELERING_DASHBOARD_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ELERING_DASHBOARD_TEST_SYSTEM_CONTROLLER_ENTID'];
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
//# sourceMappingURL=SystemControllerEntity.test.js.map