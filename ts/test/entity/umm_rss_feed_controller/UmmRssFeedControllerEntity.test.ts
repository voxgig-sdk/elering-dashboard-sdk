

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


describe('UmmRssFeedControllerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ELERING_DASHBOARD_TEST_LIVE=TRUE.
  afterEach(liveDelay('ELERING_DASHBOARD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EleringDashboardSDK.test()
    const ent = testsdk.UmmRssFeedController()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ELERING_DASHBOARD_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'umm_rss_feed_controller.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"umm_rss_feed_controller","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /umm/gas/rss","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/umm/gas/rss","q":{},"r":{},"s":[{"lit":"umm"},{"lit":"gas"},{"lit":"rss"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /umm/gas/rss/aris","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/umm/gas/rss/aris","q":{},"r":{},"s":[{"lit":"umm"},{"lit":"gas"},{"lit":"rss"},{"lit":"aris"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"umm_rss_feed_controller","name__orig":"umm_rss_feed_controller","Name":"UmmRssFeedController","name_":"umm_rss_feed_controller","name-":"umm-rss-feed-controller","NAME":"UMM_RSS_FEED_CONTROLLER","index$":23}, {"active":true,"entity":"umm_rss_feed_controller","key$":"BasicUmmRssFeedControllerFlow","kind":"basic","name":"BasicUmmRssFeedControllerFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"umm_rss_feed_controller_ref01","srcdatavar":"umm_rss_feed_controller_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-umm_rss_feed_controller_ref01"}}],"index$":0}]}, 'UmmRssFeedController', {"GET /umm/gas/rss":{"protocol":"http","operationId":"rss","responses":{"200":{"description":"OK","content":{"application/xml":{"schema":{"x-ref":"#/components/schemas/Rss"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /umm/gas/rss/aris":{"protocol":"http","operationId":"arisRss","responses":{"200":{"description":"OK","content":{"application/xml":{"schema":{"x-ref":"#/components/schemas/Rss"}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let umm_rss_feed_controller_ref01_data = Object.values(setup.data.existing.umm_rss_feed_controller)[0] as any

    // LOAD
    const umm_rss_feed_controller_ref01_ent = client.UmmRssFeedController()
    const umm_rss_feed_controller_ref01_match_dt0: any = {}
    const umm_rss_feed_controller_ref01_data_dt0 = (await umm_rss_feed_controller_ref01_ent.load(umm_rss_feed_controller_ref01_match_dt0)).data()
    assert(null != umm_rss_feed_controller_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/umm_rss_feed_controller/UmmRssFeedControllerTestData.json')

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
    ['umm_rss_feed_controller01','umm_rss_feed_controller02','umm_rss_feed_controller03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ELERING_DASHBOARD_TEST_UMM_RSS_FEED_CONTROLLER_ENTID': idmap,
    'ELERING_DASHBOARD_TEST_LIVE': 'FALSE',
    'ELERING_DASHBOARD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ELERING_DASHBOARD_TEST_UMM_RSS_FEED_CONTROLLER_ENTID']

  const live = 'TRUE' === env.ELERING_DASHBOARD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ELERING_DASHBOARD_TEST_UMM_RSS_FEED_CONTROLLER_ENTID']
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
  
