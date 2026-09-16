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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('FirmCapacityControllerEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ELERING_DASHBOARD_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ELERING_DASHBOARD_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EleringDashboardSDK.test();
        const ent = testsdk.FirmCapacityController();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ELERING_DASHBOARD_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'firm_capacity_controller.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "firm_capacity_controller", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "2020-05-31T20:59:59.999Z", "kind": "query", "name": "end", "orig": "end", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": ["[\"narva_technical_entry\"", "\"narva_booked_entry\"", "\"narva_available_entry\"", "\"varska_technical_entry\"", "\"varska_booked_entry\"", "\"varska_available_entry\"", "\"varska_technical_exit\"", "\"varska_booked_exit\"", "\"varska_available_exit\"", "\"balticconnector_technical_entry\"", "\"balticconnector_booked_entry\"", "\"balticconnector_available_entry\"", "\"balticconnector_technical_exit\"", "\"balticconnector_booked_exit\"", "\"balticconnector_available_exit\"", "\"production_technical\"", "\"production_booked\"", "\"production_available\"]"], "kind": "query", "name": "field", "orig": "field", "reqd": false, "type": "`$ARRAY`", "index$": 1 }, { "active": true, "example": "2020-05-31T20:59:59.999Z", "kind": "query", "name": "start", "orig": "start", "reqd": false, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /api/capacity/firm/csv", "json": "{\"operationId\":\"csv_3\",\"parameters\":[{\"allowEmptyValue\":true,\"description\":\"start time for data\",\"example\":\"2020-05-31T20:59:59.999Z\",\"in\":\"query\",\"name\":\"start\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"allowEmptyValue\":true,\"description\":\"end time for data\",\"example\":\"2020-05-31T20:59:59.999Z\",\"in\":\"query\",\"name\":\"end\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"Data fields to include in response\",\"in\":\"query\",\"name\":\"fields\",\"required\":false,\"schema\":{\"default\":[\"[\\\"narva_technical_entry\\\"\",\"\\\"narva_booked_entry\\\"\",\"\\\"narva_available_entry\\\"\",\"\\\"varska_technical_entry\\\"\",\"\\\"varska_booked_entry\\\"\",\"\\\"varska_available_entry\\\"\",\"\\\"varska_technical_exit\\\"\",\"\\\"varska_booked_exit\\\"\",\"\\\"varska_available_exit\\\"\",\"\\\"balticconnector_technical_entry\\\"\",\"\\\"balticconnector_booked_entry\\\"\",\"\\\"balticconnector_available_entry\\\"\",\"\\\"balticconnector_technical_exit\\\"\",\"\\\"balticconnector_booked_exit\\\"\",\"\\\"balticconnector_available_exit\\\"\",\"\\\"production_technical\\\"\",\"\\\"production_booked\\\"\",\"\\\"production_available\\\"]\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"OK\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/capacity/firm/csv", "segments": [{ "lit": "api" }, { "lit": "capacity" }, { "lit": "firm" }, { "lit": "csv" }], "select": { "exist": ["end", "field", "start"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "firm_capacity_controller", "name__orig": "firm_capacity_controller", "Name": "FirmCapacityController", "name_": "firm_capacity_controller", "name-": "firm-capacity-controller", "NAME": "FIRM_CAPACITY_CONTROLLER", "index$": 3 }, { "active": true, "entity": "firm_capacity_controller", "key$": "BasicFirmCapacityControllerFlow", "kind": "basic", "name": "BasicFirmCapacityControllerFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "firm_capacity_controller_ref01", "srcdatavar": "firm_capacity_controller_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-firm_capacity_controller_ref01" } }], "index$": 0 }] }, 'FirmCapacityController');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let firm_capacity_controller_ref01_data = Object.values(setup.data.existing.firm_capacity_controller)[0];
        // LOAD
        const firm_capacity_controller_ref01_ent = client.FirmCapacityController();
        const firm_capacity_controller_ref01_match_dt0 = {};
        const firm_capacity_controller_ref01_data_dt0 = (await firm_capacity_controller_ref01_ent.load(firm_capacity_controller_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != firm_capacity_controller_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/firm_capacity_controller/FirmCapacityControllerTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EleringDashboardSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['firm_capacity_controller01', 'firm_capacity_controller02', 'firm_capacity_controller03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ELERING_DASHBOARD_TEST_FIRM_CAPACITY_CONTROLLER_ENTID': idmap,
        'ELERING_DASHBOARD_TEST_LIVE': 'FALSE',
        'ELERING_DASHBOARD_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ELERING_DASHBOARD_TEST_FIRM_CAPACITY_CONTROLLER_ENTID'];
    const live = 'TRUE' === env.ELERING_DASHBOARD_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ELERING_DASHBOARD_TEST_FIRM_CAPACITY_CONTROLLER_ENTID'];
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
//# sourceMappingURL=FirmCapacityControllerEntity.test.js.map