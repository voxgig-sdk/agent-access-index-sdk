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
(0, node_test_1.describe)('IndexStatEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when AGENT_ACCESS_INDEX_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('AGENT_ACCESS_INDEX_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AgentAccessIndexSDK.test();
        const ent = testsdk.IndexStat();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.AgentAccessIndexSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.IndexStat().load({ "note": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.AGENT_ACCESS_INDEX_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'index_stat.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "by_family": { "a": true, "h": "By Family", "n": "by_family", "r": false, "sh": "Platform count keyed by family.", "t": "`$OBJECT`", "key$": "by_family", "index$": 0 }, "by_gate": { "a": true, "h": "By Gate", "n": "by_gate", "r": false, "sh": "Platform count keyed by gate code.", "t": "`$OBJECT`", "key$": "by_gate", "index$": 1 }, "note": { "a": true, "h": "Note", "n": "note", "r": false, "sh": "Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof.", "t": "`$STRING`", "key$": "note", "index$": 2 }, "shelves": { "a": true, "h": "Shelves", "n": "shelves", "r": true, "sh": "Number of platforms in the index.", "t": "`$INTEGER`", "key$": "shelves", "index$": 3 } }, "name": "index_stat", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/stats", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/stats", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "stats" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "index_stat", "name__orig": "index_stat", "Name": "IndexStat", "name_": "index_stat", "name-": "index-stat", "NAME": "INDEX_STAT", "index$": 1 }, { "active": true, "entity": "index_stat", "key$": "BasicIndexStatFlow", "kind": "basic", "name": "BasicIndexStatFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "index_stat_ref01", "srcdatavar": "index_stat_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-index_stat_ref01" } }], "index$": 0 }] }, 'IndexStat', { "GET /api/stats": { "protocol": "http", "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let index_stat_ref01_data = Object.values(setup.data.existing.index_stat)[0];
        // LOAD
        const index_stat_ref01_ent = client.IndexStat();
        const index_stat_ref01_match_dt0 = {};
        const index_stat_ref01_data_dt0 = (await index_stat_ref01_ent.load(index_stat_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != index_stat_ref01_data_dt0);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/index_stat/IndexStatTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AgentAccessIndexSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['index_stat01', 'index_stat02', 'index_stat03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'AGENT_ACCESS_INDEX_TEST_INDEX_STAT_ENTID': idmap,
        'AGENT_ACCESS_INDEX_TEST_LIVE': 'FALSE',
        'AGENT_ACCESS_INDEX_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['AGENT_ACCESS_INDEX_TEST_INDEX_STAT_ENTID'];
    const live = 'TRUE' === env.AGENT_ACCESS_INDEX_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['AGENT_ACCESS_INDEX_TEST_INDEX_STAT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.AgentAccessIndexSDK(merge([
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
        explain: 'TRUE' === env.AGENT_ACCESS_INDEX_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=IndexStatEntity.test.js.map