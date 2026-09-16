

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('GasTradeControllerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ELERING_DASHBOARD_TEST_LIVE=TRUE.
  afterEach(liveDelay('ELERING_DASHBOARD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EleringDashboardSDK.test()
    const ent = testsdk.GasTradeController()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ELERING_DASHBOARD_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'gas_trade_controller.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"gas_trade_controller","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"2020-06-30T20:59:59.999Z","kind":"query","name":"end","orig":"end","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"field","orig":"field","reqd":false,"type":"`$ARRAY`","index$":1},{"active":true,"example":"2020-05-31T20:59:59.999Z","kind":"query","name":"start","orig":"start","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /api/gas-trade/csv","json":"{\"operationId\":\"getAllAsCSV_1\",\"parameters\":[{\"allowEmptyValue\":true,\"description\":\"start time for data\",\"example\":\"2020-05-31T20:59:59.999Z\",\"in\":\"query\",\"name\":\"start\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"allowEmptyValue\":true,\"description\":\"end time for data\",\"example\":\"2020-06-30T20:59:59.999Z\",\"in\":\"query\",\"name\":\"end\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"Data fields to include in response\",\"in\":\"query\",\"name\":\"fields\",\"required\":false,\"schema\":{\"items\":{\"enum\":[\"common_price\",\"common_quantity\",\"ee_price\",\"ee_quantity\",\"lv_price\",\"lv_quantity\",\"lt_price\",\"lt_quantity\",\"fi_price\"],\"type\":\"string\"},\"type\":\"array\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"OK\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/gas-trade/csv","segments":[{"lit":"api"},{"lit":"gas-trade"},{"lit":"csv"}],"select":{"exist":["end","field","start"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"group","orig":"group","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/gas-trade/{group}/latest","json":"{\"operationId\":\"getGroupLatest\",\"parameters\":[{\"description\":\"group to fetch data for\",\"in\":\"path\",\"name\":\"group\",\"required\":true,\"schema\":{\"enum\":[\"COMMON\",\"LT\",\"LV\",\"EE\",\"FI\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"*/*\":{\"schema\":{}}},\"description\":\"OK\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/gas-trade/{group}/latest","segments":[{"lit":"api"},{"lit":"gas-trade"},{"var":"group"},{"lit":"latest"}],"select":{"exist":["group"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["gas_trade"]]},"key$":"gas_trade_controller","name__orig":"gas_trade_controller","Name":"GasTradeController","name_":"gas_trade_controller","name-":"gas-trade-controller","NAME":"GAS_TRADE_CONTROLLER","index$":9}, {"active":true,"entity":"gas_trade_controller","key$":"BasicGasTradeControllerFlow","kind":"basic","name":"BasicGasTradeControllerFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"gas_trade_controller_ref01","srcdatavar":"gas_trade_controller_ref01_data","suffix":"_dt0"},"match":{"id":"gas_trade_controller01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-gas_trade_controller_ref01"}}],"index$":0}]}, 'GasTradeController')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let gas_trade_controller_ref01_data = Object.values(setup.data.existing.gas_trade_controller)[0] as any

    // LOAD
    const gas_trade_controller_ref01_ent = client.GasTradeController()
    const gas_trade_controller_ref01_match_dt0: any = {}
    const gas_trade_controller_ref01_data_dt0 = (await gas_trade_controller_ref01_ent.load(gas_trade_controller_ref01_match_dt0)).data()
    assert(null != gas_trade_controller_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/gas_trade_controller/GasTradeControllerTestData.json')

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
    ['gas_trade_controller01','gas_trade_controller02','gas_trade_controller03','gas_trade01','gas_trade02','gas_trade03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ELERING_DASHBOARD_TEST_GAS_TRADE_CONTROLLER_ENTID': idmap,
    'ELERING_DASHBOARD_TEST_LIVE': 'FALSE',
    'ELERING_DASHBOARD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ELERING_DASHBOARD_TEST_GAS_TRADE_CONTROLLER_ENTID']

  const live = 'TRUE' === env.ELERING_DASHBOARD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ELERING_DASHBOARD_TEST_GAS_TRADE_CONTROLLER_ENTID']
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
  
