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
(0, node_test_1.describe)('GreenControllerEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ELERING_DASHBOARD_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ELERING_DASHBOARD_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EleringDashboardSDK.test();
        const ent = testsdk.GreenController();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ELERING_DASHBOARD_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'green_controller.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "green_controller", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "Kõik kütused", "kind": "query", "name": "fuel", "orig": "fuel", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "Kõik tehnoloogiad", "kind": "query", "name": "technology", "orig": "technology", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": "TRANSACTION", "kind": "query", "name": "type", "orig": "type", "reqd": false, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /api/green/certificates", "json": "{\"operationId\":\"getCertificates\",\"parameters\":[{\"description\":\"technology fields\",\"in\":\"query\",\"name\":\"technology\",\"required\":false,\"schema\":{\"default\":\"Kõik tehnoloogiad\",\"type\":\"string\"}},{\"description\":\"fuel fields\",\"in\":\"query\",\"name\":\"fuel\",\"required\":false,\"schema\":{\"default\":\"Kõik kütused\",\"type\":\"string\"}},{\"description\":\"transaction type fields\",\"in\":\"query\",\"name\":\"type\",\"required\":false,\"schema\":{\"default\":\"TRANSACTION\",\"enum\":[\"TRANSACTION\",\"PRODUCTION\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"*/*\":{\"schema\":{}}},\"description\":\"OK\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/green/certificates", "segments": [{ "lit": "api" }, { "lit": "green" }, { "lit": "certificates" }], "select": { "exist": ["fuel", "technology", "type"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "green_controller", "name__orig": "green_controller", "Name": "GreenController", "name_": "green_controller", "name-": "green-controller", "NAME": "GREEN_CONTROLLER", "index$": 11 }, { "active": true, "entity": "green_controller", "key$": "BasicGreenControllerFlow", "kind": "basic", "name": "BasicGreenControllerFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "green_controller_ref01", "srcdatavar": "green_controller_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-green_controller_ref01" } }], "index$": 0 }] }, 'GreenController');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let green_controller_ref01_data = Object.values(setup.data.existing.green_controller)[0];
        // LOAD
        const green_controller_ref01_ent = client.GreenController();
        const green_controller_ref01_match_dt0 = {};
        const green_controller_ref01_data_dt0 = (await green_controller_ref01_ent.load(green_controller_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != green_controller_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/green_controller/GreenControllerTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EleringDashboardSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['green_controller01', 'green_controller02', 'green_controller03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ELERING_DASHBOARD_TEST_GREEN_CONTROLLER_ENTID': idmap,
        'ELERING_DASHBOARD_TEST_LIVE': 'FALSE',
        'ELERING_DASHBOARD_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ELERING_DASHBOARD_TEST_GREEN_CONTROLLER_ENTID'];
    const live = 'TRUE' === env.ELERING_DASHBOARD_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ELERING_DASHBOARD_TEST_GREEN_CONTROLLER_ENTID'];
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
//# sourceMappingURL=GreenControllerEntity.test.js.map