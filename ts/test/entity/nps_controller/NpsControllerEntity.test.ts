

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


describe('NpsControllerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ELERING_DASHBOARD_TEST_LIVE=TRUE.
  afterEach(liveDelay('ELERING_DASHBOARD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EleringDashboardSDK.test()
    const ent = testsdk.NpsController()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ELERING_DASHBOARD_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'nps_controller.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"nps_controller","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/nps/price/csv","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"2020-06-30T20:59:59.999Z","k":"query","n":"end","or":"end","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"field","or":"fields","r":false,"t":"`$ARRAY`","index$":1},{"a":true,"ex":"2020-05-31T20:59:59.999Z","k":"query","n":"start","or":"start","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/nps/price/csv","q":{"exist":["end","field","start"]},"r":{},"s":[{"lit":"api"},{"lit":"nps"},{"lit":"price"},{"lit":"csv"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/nps/turnover/csv","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"2020-06-30T20:59:59.999Z","k":"query","n":"end","or":"end","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"field","or":"fields","r":false,"t":"`$ARRAY`","index$":1},{"a":true,"ex":"2020-05-31T20:59:59.999Z","k":"query","n":"start","or":"start","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/nps/turnover/csv","q":{"exist":["end","field","start"]},"r":{},"s":[{"lit":"api"},{"lit":"nps"},{"lit":"turnover"},{"lit":"csv"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /api/nps/price","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"2020-06-30T20:59:59.999Z","k":"query","n":"end","or":"end","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"2020-05-31T20:59:59.999Z","k":"query","n":"start","or":"start","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/nps/price","q":{"exist":["end","start"]},"r":{},"s":[{"lit":"api"},{"lit":"nps"},{"lit":"price"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/nps/turnover","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"2020-06-30T20:59:59.999Z","k":"query","n":"end","or":"end","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"2020-05-31T20:59:59.999Z","k":"query","n":"start","or":"start","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/nps/turnover","q":{"exist":["end","start"]},"r":{},"s":[{"lit":"api"},{"lit":"nps"},{"lit":"turnover"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"GET /api/nps/price/{group}/current","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"group","or":"group","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/nps/price/{group}/current","q":{"exist":["group"]},"r":{},"s":[{"lit":"api"},{"lit":"nps"},{"lit":"price"},{"var":"group"},{"lit":"current"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4},{"a":true,"co":{"id":"GET /api/nps/price/{group}/latest","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"group","or":"group","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/nps/price/{group}/latest","q":{"exist":["group"]},"r":{},"s":[{"lit":"api"},{"lit":"nps"},{"lit":"price"},{"var":"group"},{"lit":"latest"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":5},{"a":true,"co":{"id":"GET /api/nps/turnover/{group}/latest","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"group","or":"group","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/nps/turnover/{group}/latest","q":{"exist":["group"]},"r":{},"s":[{"lit":"api"},{"lit":"nps"},{"lit":"turnover"},{"var":"group"},{"lit":"latest"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":6}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"nps_controller","name__orig":"nps_controller","Name":"NpsController","name_":"nps_controller","name-":"nps-controller","NAME":"NPS_CONTROLLER","index$":16}, {"active":true,"entity":"nps_controller","key$":"BasicNpsControllerFlow","kind":"basic","name":"BasicNpsControllerFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"nps_controller_ref01","srcdatavar":"nps_controller_ref01_data","suffix":"_dt0"},"m":{"id":"nps_controller01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-nps_controller_ref01"}}],"index$":0}]}, 'NpsController', {"GET /api/nps/price/csv":{"protocol":"http","parameters":[{"name":"start","in":"query","description":"start time for data","required":false,"allowEmptyValue":true,"schema":{"type":"string","format":"date-time"},"example":"2020-05-31T20:59:59.999Z","index$":0},{"name":"end","in":"query","description":"end time for data","required":false,"allowEmptyValue":true,"schema":{"type":"string","format":"date-time"},"example":"2020-06-30T20:59:59.999Z","index$":1},{"name":"fields","in":"query","description":"fields to include in file","required":false,"schema":{"type":"array","items":{"type":"string","enum":["ee","fi","lv","lt"]}},"index$":2}]},"GET /api/nps/turnover/csv":{"protocol":"http","parameters":[{"name":"start","in":"query","description":"start time for data","required":false,"allowEmptyValue":true,"schema":{"type":"string","format":"date-time"},"example":"2020-05-31T20:59:59.999Z","index$":0},{"name":"end","in":"query","description":"end time for data","required":false,"allowEmptyValue":true,"schema":{"type":"string","format":"date-time"},"example":"2020-06-30T20:59:59.999Z","index$":1},{"name":"fields","in":"query","required":false,"schema":{"type":"array","items":{"type":"string","enum":["in","out"]}},"index$":2}]},"GET /api/nps/price":{"protocol":"http","parameters":[{"name":"start","in":"query","description":"start time for data","required":false,"allowEmptyValue":true,"schema":{"type":"string","format":"date-time"},"example":"2020-05-31T20:59:59.999Z","index$":0},{"name":"end","in":"query","description":"end time for data","required":false,"allowEmptyValue":true,"schema":{"type":"string","format":"date-time"},"example":"2020-06-30T20:59:59.999Z","index$":1}]},"GET /api/nps/turnover":{"protocol":"http","parameters":[{"name":"start","in":"query","description":"start time for data","required":false,"allowEmptyValue":true,"schema":{"type":"string","format":"date-time"},"example":"2020-05-31T20:59:59.999Z","index$":0},{"name":"end","in":"query","description":"end time for data","required":false,"allowEmptyValue":true,"schema":{"type":"string","format":"date-time"},"example":"2020-06-30T20:59:59.999Z","index$":1}]},"GET /api/nps/price/{group}/current":{"protocol":"http","parameters":[{"name":"group","in":"path","description":"group to fetch data for","required":true,"schema":{"type":"string","enum":["EE","LT","LV","FI"]},"index$":0}]},"GET /api/nps/price/{group}/latest":{"protocol":"http","parameters":[{"name":"group","in":"path","description":"group to fetch data for","required":true,"schema":{"type":"string","enum":["EE","LT","LV","FI"]},"index$":0}]},"GET /api/nps/turnover/{group}/latest":{"protocol":"http","parameters":[{"name":"group","in":"path","description":"group to fetch data for","required":true,"schema":{"type":"string","enum":["EE","LT","LV","FI"]},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let nps_controller_ref01_data = Object.values(setup.data.existing.nps_controller)[0] as any

    // LOAD
    const nps_controller_ref01_ent = client.NpsController()
    const nps_controller_ref01_match_dt0: any = {}
    const nps_controller_ref01_data_dt0 = (await nps_controller_ref01_ent.load(nps_controller_ref01_match_dt0)).data()
    assert(null != nps_controller_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/nps_controller/NpsControllerTestData.json')

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
    ['nps_controller01','nps_controller02','nps_controller03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ELERING_DASHBOARD_TEST_NPS_CONTROLLER_ENTID': idmap,
    'ELERING_DASHBOARD_TEST_LIVE': 'FALSE',
    'ELERING_DASHBOARD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ELERING_DASHBOARD_TEST_NPS_CONTROLLER_ENTID']

  const live = 'TRUE' === env.ELERING_DASHBOARD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ELERING_DASHBOARD_TEST_NPS_CONTROLLER_ENTID']
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
  
