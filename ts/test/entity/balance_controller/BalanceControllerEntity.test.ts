

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


describe('BalanceControllerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ELERING_DASHBOARD_TEST_LIVE=TRUE.
  afterEach(liveDelay('ELERING_DASHBOARD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EleringDashboardSDK.test()
    const ent = testsdk.BalanceController()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ELERING_DASHBOARD_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'balance_controller.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"balance_controller","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/balance/commerce/csv","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"2020-06-30T20:59:59.999Z","k":"query","n":"end","or":"end","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"field","or":"fields","r":false,"t":"`$ARRAY`","index$":1},{"a":true,"ex":"2020-05-31T20:59:59.999Z","k":"query","n":"start","or":"start","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/balance/commerce/csv","q":{"exist":["end","field","start"]},"r":{},"s":[{"lit":"api"},{"lit":"balance"},{"lit":"commerce"},{"lit":"csv"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/balance/csv","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"2020-05-31T20:59:59.999Z","k":"query","n":"end","or":"end","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"field","or":"fields","r":false,"t":"`$ARRAY`","index$":1},{"a":true,"ex":"2020-05-31T20:59:59.999Z","k":"query","n":"start","or":"start","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/balance/csv","q":{"exist":["end","field","start"]},"r":{},"s":[{"lit":"api"},{"lit":"balance"},{"lit":"csv"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/balance/total/csv","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"2020-06-30T20:59:59.999Z","k":"query","n":"end","or":"end","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"field","or":"fields","r":false,"t":"`$ARRAY`","index$":1},{"a":true,"ex":"2020-05-31T20:59:59.999Z","k":"query","n":"start","or":"start","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/balance/total/csv","q":{"exist":["end","field","start"]},"r":{},"s":[{"lit":"api"},{"lit":"balance"},{"lit":"total"},{"lit":"csv"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /api/balance/total","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"2020-06-30T20:59:59.999Z","k":"query","n":"end","or":"end","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"2020-05-31T20:59:59.999Z","k":"query","n":"field","or":"fields","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/balance/total","q":{"exist":["end","field"]},"r":{},"s":[{"lit":"api"},{"lit":"balance"},{"lit":"total"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"GET /api/balance/commerce","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"2020-06-30T20:59:59.999Z","k":"query","n":"end","or":"end","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"2020-05-31T20:59:59.999Z","k":"query","n":"start","or":"start","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/balance/commerce","q":{"exist":["end","start"]},"r":{},"s":[{"lit":"api"},{"lit":"balance"},{"lit":"commerce"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4},{"a":true,"co":{"id":"GET /api/balance/commerce/latest","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/balance/commerce/latest","q":{},"r":{},"s":[{"lit":"api"},{"lit":"balance"},{"lit":"commerce"},{"lit":"latest"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":5},{"a":true,"co":{"id":"GET /api/balance/total/latest","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/balance/total/latest","q":{},"r":{},"s":[{"lit":"api"},{"lit":"balance"},{"lit":"total"},{"lit":"latest"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":6}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"balance_controller","name__orig":"balance_controller","Name":"BalanceController","name_":"balance_controller","name-":"balance-controller","NAME":"BALANCE_CONTROLLER","index$":1}, {"active":true,"entity":"balance_controller","key$":"BasicBalanceControllerFlow","kind":"basic","name":"BasicBalanceControllerFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"balance_controller_ref01","srcdatavar":"balance_controller_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-balance_controller_ref01"}}],"index$":0}]}, 'BalanceController', {"GET /api/balance/commerce/csv":{"protocol":"http","parameters":[{"name":"start","in":"query","description":"start time for data","required":false,"allowEmptyValue":true,"schema":{"type":"string","format":"date-time"},"example":"2020-05-31T20:59:59.999Z","index$":0},{"name":"end","in":"query","description":"end time for data","required":false,"allowEmptyValue":true,"schema":{"type":"string","format":"date-time"},"example":"2020-06-30T20:59:59.999Z","index$":1},{"name":"fields","in":"query","description":"data fields to include in the csv file","required":false,"allowEmptyValue":true,"schema":{"type":"array","items":{"type":"string","enum":["ess_balance","import_total","import_latvia","import_finland","import_exchange","import_bilateral_contracts","export_total","export_latvia","export_finland","export_exchange","export_bilateral_contracts"]}},"index$":2}]},"GET /api/balance/csv":{"protocol":"http","parameters":[{"name":"start","in":"query","description":"start time for data","required":false,"allowEmptyValue":true,"schema":{"type":"string","format":"date-time"},"example":"2020-05-31T20:59:59.999Z","index$":0},{"name":"end","in":"query","description":"end time for data","required":false,"allowEmptyValue":true,"schema":{"type":"string","format":"date-time"},"example":"2020-05-31T20:59:59.999Z","index$":1},{"name":"fields","in":"query","description":"Data fields to include in response","required":false,"allowEmptyValue":true,"schema":{"type":"array","items":{"type":"string","enum":["imbalance","imbalance_buy_price","imbalance_sell_price","regulate_up","regulate_system_up","regulate_down","regulate_system_down"]}},"index$":2}]},"GET /api/balance/total/csv":{"protocol":"http","parameters":[{"name":"start","in":"query","description":"start time for data","required":false,"allowEmptyValue":true,"schema":{"type":"string","format":"date-time"},"example":"2020-05-31T20:59:59.999Z","index$":0},{"name":"end","in":"query","description":"end time for data","required":false,"allowEmptyValue":true,"schema":{"type":"string","format":"date-time"},"example":"2020-06-30T20:59:59.999Z","index$":1},{"name":"fields","in":"query","description":"data fields to include in the csv file","required":false,"allowEmptyValue":true,"schema":{"type":"array","items":{"type":"string","enum":["input_total","input_local","renewable_total","renewable_wind","renewable_hydro","renewable_bio","nonrenewable_total","output_total","export_total","consumption_local_total","renewable_solar","import_total"]}},"index$":2}]},"GET /api/balance/total":{"protocol":"http","parameters":[{"name":"fields","in":"query","description":"start time for data","required":false,"schema":{"type":"string","format":"date-time"},"example":"2020-05-31T20:59:59.999Z","index$":0},{"name":"end","in":"query","description":"end time for data","required":false,"schema":{"type":"string","format":"date-time"},"example":"2020-06-30T20:59:59.999Z","index$":1}]},"GET /api/balance/commerce":{"protocol":"http","parameters":[{"name":"start","in":"query","description":"start time for data","required":false,"allowEmptyValue":true,"schema":{"type":"string","format":"date-time"},"example":"2020-05-31T20:59:59.999Z","index$":0},{"name":"end","in":"query","description":"end time for data","required":false,"allowEmptyValue":true,"schema":{"type":"string","format":"date-time"},"example":"2020-06-30T20:59:59.999Z","index$":1}]},"GET /api/balance/commerce/latest":{"protocol":"http","parameters":[]},"GET /api/balance/total/latest":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let balance_controller_ref01_data = Object.values(setup.data.existing.balance_controller)[0] as any

    // LOAD
    const balance_controller_ref01_ent = client.BalanceController()
    const balance_controller_ref01_match_dt0: any = {}
    const balance_controller_ref01_data_dt0 = (await balance_controller_ref01_ent.load(balance_controller_ref01_match_dt0)).data()
    assert(null != balance_controller_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/balance_controller/BalanceControllerTestData.json')

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
    ['balance_controller01','balance_controller02','balance_controller03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ELERING_DASHBOARD_TEST_BALANCE_CONTROLLER_ENTID': idmap,
    'ELERING_DASHBOARD_TEST_LIVE': 'FALSE',
    'ELERING_DASHBOARD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ELERING_DASHBOARD_TEST_BALANCE_CONTROLLER_ENTID']

  const live = 'TRUE' === env.ELERING_DASHBOARD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ELERING_DASHBOARD_TEST_BALANCE_CONTROLLER_ENTID']
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
  
