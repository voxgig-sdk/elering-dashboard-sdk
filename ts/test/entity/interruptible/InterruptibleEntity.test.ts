

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { EleringDashboardSDK, BaseFeature, stdutil } from '../../..'

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


describe('InterruptibleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ELERING_DASHBOARD_TEST_LIVE=TRUE.
  afterEach(liveDelay('ELERING_DASHBOARD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EleringDashboardSDK.test()
    const ent = testsdk.Interruptible()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ELERING_DASHBOARD_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'interruptible.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"interruptible","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/capacity/interruptible","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"2020-06-30T20:59:59.999Z","k":"query","n":"end","or":"end","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"2020-05-31T20:59:59.999Z","k":"query","n":"start","or":"start","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/capacity/interruptible","q":{"exist":["end","start"]},"r":{},"s":[{"lit":"api"},{"lit":"capacity"},{"lit":"interruptible"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"interruptible","name__orig":"interruptible","Name":"Interruptible","name_":"interruptible","name-":"interruptible","NAME":"INTERRUPTIBLE","index$":12}, {"active":true,"entity":"interruptible","key$":"BasicInterruptibleFlow","kind":"basic","name":"BasicInterruptibleFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"interruptible_ref01","srcdatavar":"interruptible_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-interruptible_ref01"}}],"index$":0}]}, 'Interruptible', {"GET /api/capacity/interruptible":{"protocol":"http","parameters":[{"name":"start","in":"query","description":"start time for data","required":false,"allowEmptyValue":true,"schema":{"type":"string","format":"date-time"},"example":"2020-05-31T20:59:59.999Z","index$":0},{"name":"end","in":"query","description":"end time for data","required":false,"allowEmptyValue":true,"schema":{"type":"string","format":"date-time"},"example":"2020-06-30T20:59:59.999Z","index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let interruptible_ref01_data = Object.values(setup.data.existing.interruptible)[0] as any

    // LOAD
    const interruptible_ref01_ent = client.Interruptible()
    const interruptible_ref01_match_dt0: any = {}
    const interruptible_ref01_data_dt0 = (await interruptible_ref01_ent.load(interruptible_ref01_match_dt0)).data()
    assert(null != interruptible_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/interruptible/InterruptibleTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = EleringDashboardSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['interruptible01','interruptible02','interruptible03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ELERING_DASHBOARD_TEST_INTERRUPTIBLE_ENTID': idmap,
    'ELERING_DASHBOARD_TEST_LIVE': 'FALSE',
    'ELERING_DASHBOARD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ELERING_DASHBOARD_TEST_INTERRUPTIBLE_ENTID']

  const live = 'TRUE' === env.ELERING_DASHBOARD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ELERING_DASHBOARD_TEST_INTERRUPTIBLE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new EleringDashboardSDK(merge([
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
    explain: 'TRUE' === env.ELERING_DASHBOARD_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
