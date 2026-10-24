

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { AgentAccessIndexSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('TrafficEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AGENT_ACCESS_INDEX_TEST_LIVE=TRUE.
  afterEach(liveDelay('AGENT_ACCESS_INDEX_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AgentAccessIndexSDK.test()
    const ent = testsdk.Traffic()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('traffic hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of AgentAccessIndexSDK.test(offline).Traffic().stream('list')) { }
    }, /offline/)

    for await (const _item of AgentAccessIndexSDK.test(offline).Traffic()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = AgentAccessIndexSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Traffic().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of AgentAccessIndexSDK.test().Traffic().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new AgentAccessIndexSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Traffic().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Traffic().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = AgentAccessIndexSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Traffic().list({"day":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AGENT_ACCESS_INDEX_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'traffic.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ai_paths":{"a":true,"h":"Ai Paths","n":"ai_paths","r":false,"sh":"Paths most requested by AI crawlers.","t":"`$ARRAY`","key$":"ai_paths","index$":0},"crawler_tokens":{"a":true,"h":"Crawler Tokens","n":"crawler_tokens","r":false,"sh":"Most frequent crawler tokens.","t":"`$ARRAY`","key$":"crawler_tokens","index$":1},"daily":{"a":true,"h":"Daily","n":"daily","r":true,"sh":"Per-day counts.","t":"`$ARRAY`","key$":"daily","index$":2},"distinct_mcp_or_report_callers":{"a":true,"h":"Distinct Mcp Or Report Callers","n":"distinct_mcp_or_report_callers","r":false,"sh":"Distinct callers of MCP or the report endpoint.","t":"`$INTEGER`","key$":"distinct_mcp_or_report_callers","index$":3},"human_referrers":{"a":true,"h":"Human Referrers","n":"human_referrers","r":false,"sh":"Top human referrers.","t":"`$ARRAY`","key$":"human_referrers","index$":4},"human_src_tags":{"a":true,"h":"Human Src Tags","n":"human_src_tags","r":false,"sh":"Top ?src= tags on human visits.","t":"`$ARRAY`","key$":"human_src_tags","index$":5},"mcp_clients":{"a":true,"h":"Mcp Clients","n":"mcp_clients","r":false,"sh":"MCP clients seen.","t":"`$ARRAY`","key$":"mcp_clients","index$":6},"note":{"a":true,"h":"Note","n":"note","r":false,"sh":"Explains the traffic classes (human, bot, search, ai, self).","t":"`$STRING`","key$":"note","index$":7},"since":{"a":true,"fo":"date","h":"Since","n":"since","r":true,"sh":"First day covered (YYYY-MM-DD).","t":"`$STRING`","key$":"since","index$":8}},"name":"traffic","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/traffic","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":14,"k":"query","n":"day","or":"days","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/traffic","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"traffic"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"traffic","name__orig":"traffic","Name":"Traffic","name_":"traffic","name-":"traffic","NAME":"TRAFFIC","index$":4}, {"active":true,"entity":"traffic","key$":"BasicTrafficFlow","kind":"basic","name":"BasicTrafficFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"traffic_ref01"}}],"index$":0}]}, 'Traffic', {"GET /api/traffic":{"protocol":"http","parameters":[{"name":"days","in":"query","description":"Number of days to cover (data starts 2026-10-09).","required":false,"schema":{"type":"integer","minimum":1},"example":14,"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let traffic_ref01_data = Object.values(setup.data.existing.traffic)[0] as any

    // LIST
    const traffic_ref01_ent = client.Traffic()
    const traffic_ref01_match: any = {}

    const traffic_ref01_list = (await traffic_ref01_ent.list(traffic_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/traffic/TrafficTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AgentAccessIndexSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['traffic01','traffic02','traffic03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AGENT_ACCESS_INDEX_TEST_TRAFFIC_ENTID': idmap,
    'AGENT_ACCESS_INDEX_TEST_LIVE': 'FALSE',
    'AGENT_ACCESS_INDEX_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AGENT_ACCESS_INDEX_TEST_TRAFFIC_ENTID']

  const live = 'TRUE' === env.AGENT_ACCESS_INDEX_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AGENT_ACCESS_INDEX_TEST_TRAFFIC_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new AgentAccessIndexSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
