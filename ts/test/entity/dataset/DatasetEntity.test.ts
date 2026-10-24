

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


describe('DatasetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AGENT_ACCESS_INDEX_TEST_LIVE=TRUE.
  afterEach(liveDelay('AGENT_ACCESS_INDEX_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AgentAccessIndexSDK.test()
    const ent = testsdk.Dataset()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('dataset hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of AgentAccessIndexSDK.test(offline).Dataset().stream('list')) { }
    }, /offline/)

    for await (const _item of AgentAccessIndexSDK.test(offline).Dataset()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = AgentAccessIndexSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Dataset().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of AgentAccessIndexSDK.test().Dataset().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new AgentAccessIndexSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Dataset().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Dataset().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = AgentAccessIndexSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Dataset().list({"agent_can_register":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AGENT_ACCESS_INDEX_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'dataset.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"agent_can_register":{"a":true,"h":"Agent Can Register","n":"agent_can_register","r":true,"sh":"Verdict on whether an AI agent can register.","t":"`$STRING`","key$":"agent_can_register","index$":0},"agent_reports":{"a":true,"h":"Agent Reports","n":"agent_reports","r":false,"sh":"Agent-reported outcomes (unverified, shown next to the measurement).","t":"`$OBJECT`","key$":"agent_reports","index$":1},"answer":{"a":true,"h":"Answer","n":"answer","r":false,"sh":"Plain-English answer.","t":"`$STRING`","key$":"answer","index$":2},"checked_at":{"a":true,"fo":"date","h":"Checked At","n":"checked_at","r":false,"sh":"Date of the census check (YYYY-MM-DD).","t":"`$STRING`","key$":"checked_at","index$":3},"error":{"a":true,"h":"Error","n":"error","r":false,"sh":"Census error for this platform; null in every probed record (type unverified).","t":"`$STRING`","key$":"error","index$":4},"family":{"a":true,"h":"Family","n":"family","r":true,"sh":"Platform family.","t":"`$STRING`","key$":"family","index$":5},"family_title":{"a":true,"h":"Family Title","n":"family_title","r":false,"sh":"Human-readable family title.","t":"`$STRING`","key$":"family_title","index$":6},"final_url":{"a":true,"h":"Final Url","n":"final_url","r":false,"sh":"URL reached after redirects; null when unreachable.","t":"`$STRING`","key$":"final_url","index$":7},"fingerprint":{"a":true,"h":"Fingerprint","n":"fingerprint","r":false,"sh":"Browser fingerprint used on a re-check.","t":"`$STRING`","key$":"fingerprint","index$":8},"first_pass_gate":{"a":true,"h":"First Pass Gate","n":"first_pass_gate","r":false,"sh":"Gate measured on the first pass, before a re-check.","t":"`$STRING`","key$":"first_pass_gate","index$":9},"front_door":{"a":true,"h":"Front Door","n":"front_door","r":false,"sh":"What the census saw on the sign-up page.","t":"`$OBJECT`","key$":"front_door","index$":10},"gate":{"a":true,"h":"Gate","n":"gate","r":true,"sh":"Measured sign-up gate code, e.g.","t":"`$STRING`","key$":"gate","index$":11},"gate_label":{"a":true,"h":"Gate Label","n":"gate_label","r":false,"sh":"Human-readable gate description.","t":"`$STRING`","key$":"gate_label","index$":12},"http_status":{"a":true,"h":"Http Status","n":"http_status","r":false,"sh":"HTTP status of the sign-up page; null when unreachable.","t":"`$INTEGER`","key$":"http_status","index$":13},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Platform (shelf) id, e.g.","t":"`$STRING`","key$":"id","index$":14},"manual":{"a":true,"h":"Manual","n":"manual","r":false,"sh":"Manual override note.","t":"`$OBJECT`","key$":"manual","index$":15},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Platform name.","t":"`$STRING`","key$":"name","index$":16},"note":{"a":true,"h":"Note","n":"note","r":false,"sh":"Caveat: measured by an AI agent; a form with no CAPTCHA before submit is a candidate door, not proof.","t":"`$STRING`","key$":"note","index$":17},"page":{"a":true,"h":"Page","n":"page","r":false,"sh":"Site path of the platform page, e.g.","t":"`$STRING`","key$":"page","index$":18},"page_title":{"a":true,"h":"Page Title","n":"page_title","r":false,"sh":"Title of the sign-up page; null when unreachable.","t":"`$STRING`","key$":"page_title","index$":19},"question":{"a":true,"h":"Question","n":"question","r":false,"sh":"The question answered, e.g.","t":"`$STRING`","key$":"question","index$":20},"reese_account":{"a":true,"h":"Reese Account","n":"reese_account","r":false,"sh":"Present when the measuring agent (Reese) holds an account on the platform.","t":"`$OBJECT`","key$":"reese_account","index$":21},"research":{"a":true,"h":"Research","n":"research","r":false,"sh":"Desk research on the platform's AI policy.","t":"`$OBJECT`","key$":"research","index$":22},"rules_mentions":{"a":true,"h":"Rules Mentions","n":"rules_mentions","r":false,"sh":"Flags found in the platform's rules pages.","t":"`$OBJECT`","key$":"rules_mentions","index$":23},"rules_pages":{"a":true,"h":"Rules Pages","n":"rules_pages","r":false,"sh":"Rules/terms page URLs that were read.","t":"`$ARRAY`","key$":"rules_pages","index$":24},"rules_quotes":{"a":true,"h":"Rules Quotes","n":"rules_quotes","r":false,"sh":"Quotes supporting the rules flags.","t":"`$ARRAY`","key$":"rules_quotes","index$":25},"signup_url":{"a":true,"h":"Signup Url","n":"signup_url","r":false,"sh":"Sign-up URL that was tested.","t":"`$STRING`","key$":"signup_url","index$":26},"stepped":{"a":true,"h":"Stepped","n":"stepped","r":false,"sh":"Button labels the census clicked through to reach the form; null when none.","t":"`$ARRAY`","key$":"stepped","index$":27},"tone":{"a":true,"h":"Tone","n":"tone","r":false,"sh":"Display tone of the verdict: ok, mid, warn or bad.","t":"`$STRING`","key$":"tone","index$":28}},"id":{"field":"id","name":"id"},"name":"dataset","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /data/shelves.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/data/shelves.json","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"data"},{"lit":"shelves.json"}],"t":{"req":"`reqdata`","res":"`body.rows`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"dataset","name__orig":"dataset","Name":"Dataset","name_":"dataset","name-":"dataset","NAME":"DATASET","index$":0}, {"active":true,"entity":"dataset","key$":"BasicDatasetFlow","kind":"basic","name":"BasicDatasetFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"dataset_ref01"}}],"index$":0}]}, 'Dataset', {"GET /data/shelves.json":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let dataset_ref01_data = Object.values(setup.data.existing.dataset)[0] as any

    // LIST
    const dataset_ref01_ent = client.Dataset()
    const dataset_ref01_match: any = {}

    const dataset_ref01_list = (await dataset_ref01_ent.list(dataset_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/dataset/DatasetTestData.json')

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
    ['dataset01','dataset02','dataset03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AGENT_ACCESS_INDEX_TEST_DATASET_ENTID': idmap,
    'AGENT_ACCESS_INDEX_TEST_LIVE': 'FALSE',
    'AGENT_ACCESS_INDEX_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AGENT_ACCESS_INDEX_TEST_DATASET_ENTID']

  const live = 'TRUE' === env.AGENT_ACCESS_INDEX_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AGENT_ACCESS_INDEX_TEST_DATASET_ENTID']
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
  
