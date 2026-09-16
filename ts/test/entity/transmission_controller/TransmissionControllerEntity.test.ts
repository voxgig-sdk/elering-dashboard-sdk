

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


describe('TransmissionControllerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ELERING_DASHBOARD_TEST_LIVE=TRUE.
  afterEach(liveDelay('ELERING_DASHBOARD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EleringDashboardSDK.test()
    const ent = testsdk.TransmissionController()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ELERING_DASHBOARD_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'transmission_controller.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"transmission_controller","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"group","orig":"group","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"example":"2020-06-30T20:59:59.999Z","kind":"query","name":"end","orig":"end","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"field","orig":"field","reqd":false,"type":"`$ARRAY`","index$":1},{"active":true,"example":"2020-05-31T20:59:59.999Z","kind":"query","name":"start","orig":"start","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /api/transmission/cross-border-capacity/{group}/csv","json":"{\"operationId\":\"getCrossBorderCapacityByGroupAsCsv\",\"parameters\":[{\"description\":\"start time for data\",\"example\":\"2020-05-31T20:59:59.999Z\",\"in\":\"query\",\"name\":\"start\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"end time for data\",\"example\":\"2020-06-30T20:59:59.999Z\",\"in\":\"query\",\"name\":\"end\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"group to select data for\",\"in\":\"path\",\"name\":\"group\",\"required\":true,\"schema\":{\"enum\":[\"FI\",\"LV\",\"RU\"],\"type\":\"string\"}},{\"description\":\"fields to include in the response\",\"in\":\"query\",\"name\":\"fields\",\"required\":false,\"schema\":{\"items\":{\"enum\":[\"in_atc\",\"in_ntc\",\"out_atc\",\"out_ntc\"],\"type\":\"string\"},\"type\":\"array\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"OK\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/transmission/cross-border-capacity/{group}/csv","segments":[{"lit":"api"},{"lit":"transmission"},{"lit":"cross-border-capacity"},{"var":"group"},{"lit":"csv"}],"select":{"exist":["end","field","group","start"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"example":"2020-06-30T20:59:59.999Z","kind":"query","name":"end","orig":"end","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"field","orig":"field","reqd":false,"type":"`$ARRAY`","index$":1},{"active":true,"example":"2020-05-31T20:59:59.999Z","kind":"query","name":"start","orig":"start","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /api/transmission/cross-border-planned-trade/csv","json":"{\"operationId\":\"getCrossborderPlannedTradeCsv\",\"parameters\":[{\"description\":\"start time for data\",\"example\":\"2020-05-31T20:59:59.999Z\",\"in\":\"query\",\"name\":\"start\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"end time for data\",\"example\":\"2020-06-30T20:59:59.999Z\",\"in\":\"query\",\"name\":\"end\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"fields to include in csv output\",\"in\":\"query\",\"name\":\"fields\",\"required\":false,\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"OK\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/transmission/cross-border-planned-trade/csv","segments":[{"lit":"api"},{"lit":"transmission"},{"lit":"cross-border-planned-trade"},{"lit":"csv"}],"select":{"exist":["end","field","start"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{"query":[{"active":true,"example":"2020-06-30T20:59:59.999Z","kind":"query","name":"end","orig":"end","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"field","orig":"field","reqd":false,"type":"`$ARRAY`","index$":1},{"active":true,"example":"2020-05-31T20:59:59.999Z","kind":"query","name":"start","orig":"start","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /api/transmission/cross-border/csv","json":"{\"operationId\":\"getTransmissionAsCSV\",\"parameters\":[{\"description\":\"start time for data\",\"example\":\"2020-05-31T20:59:59.999Z\",\"in\":\"query\",\"name\":\"start\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"end time for data\",\"example\":\"2020-06-30T20:59:59.999Z\",\"in\":\"query\",\"name\":\"end\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"fields to include in the output\",\"in\":\"query\",\"name\":\"fields\",\"required\":false,\"schema\":{\"items\":{\"enum\":[\"latvia\",\"russia_narva\",\"russia_pihkva\",\"finland\"],\"type\":\"string\"},\"type\":\"array\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"OK\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/transmission/cross-border/csv","segments":[{"lit":"api"},{"lit":"transmission"},{"lit":"cross-border"},{"lit":"csv"}],"select":{"exist":["end","field","start"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2},{"active":true,"args":{"query":[{"active":true,"example":"2020-06-30T20:59:59.999Z","kind":"query","name":"end","orig":"end","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"field","orig":"field","reqd":false,"type":"`$ARRAY`","index$":1},{"active":true,"example":"2020-05-31T20:59:59.999Z","kind":"query","name":"start","orig":"start","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /api/transmission/cross-border/hourly/csv","json":"{\"operationId\":\"getTransmissionHourlyAsCSV\",\"parameters\":[{\"description\":\"start time for data\",\"example\":\"2020-05-31T20:59:59.999Z\",\"in\":\"query\",\"name\":\"start\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"end time for data\",\"example\":\"2020-06-30T20:59:59.999Z\",\"in\":\"query\",\"name\":\"end\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"fields to include in the output\",\"in\":\"query\",\"name\":\"fields\",\"required\":false,\"schema\":{\"items\":{\"enum\":[\"latvia\",\"russia_narva\",\"russia_pihkva\",\"finland\"],\"type\":\"string\"},\"type\":\"array\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"OK\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/transmission/cross-border/hourly/csv","segments":[{"lit":"api"},{"lit":"transmission"},{"lit":"cross-border"},{"lit":"hourly"},{"lit":"csv"}],"select":{"exist":["end","field","start"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":3},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"group","orig":"group","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"example":"2020-06-30T20:59:59.999Z","kind":"query","name":"end","orig":"end","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"2020-05-31T20:59:59.999Z","kind":"query","name":"start","orig":"start","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /api/transmission/cross-border-capacity/{group}","json":"{\"operationId\":\"getCrossBorderCapacityByGroup\",\"parameters\":[{\"description\":\"start time for data\",\"example\":\"2020-05-31T20:59:59.999Z\",\"in\":\"query\",\"name\":\"start\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"end time for data\",\"example\":\"2020-06-30T20:59:59.999Z\",\"in\":\"query\",\"name\":\"end\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"group to select data for\",\"in\":\"path\",\"name\":\"group\",\"required\":true,\"schema\":{\"enum\":[\"FI\",\"LV\",\"RU\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"*/*\":{\"schema\":{}}},\"description\":\"OK\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/transmission/cross-border-capacity/{group}","segments":[{"lit":"api"},{"lit":"transmission"},{"lit":"cross-border-capacity"},{"var":"group"}],"select":{"exist":["end","group","start"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"example":"2020-06-30T20:59:59.999Z","kind":"query","name":"end","orig":"end","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"2020-05-31T20:59:59.999Z","kind":"query","name":"start","orig":"start","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /api/transmission/cross-border","json":"{\"operationId\":\"getCrossBorder\",\"parameters\":[{\"description\":\"start time for data\",\"example\":\"2020-05-31T20:59:59.999Z\",\"in\":\"query\",\"name\":\"start\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"end time for data\",\"example\":\"2020-06-30T20:59:59.999Z\",\"in\":\"query\",\"name\":\"end\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"*/*\":{\"schema\":{}}},\"description\":\"OK\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/transmission/cross-border","segments":[{"lit":"api"},{"lit":"transmission"},{"lit":"cross-border"}],"select":{"exist":["end","start"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":5},{"active":true,"args":{"query":[{"active":true,"example":"2020-06-30T20:59:59.999Z","kind":"query","name":"end","orig":"end","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"2020-05-31T20:59:59.999Z","kind":"query","name":"start","orig":"start","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /api/transmission/cross-border-capacity","json":"{\"operationId\":\"getCrossBorderCapacity\",\"parameters\":[{\"description\":\"start time for data\",\"example\":\"2020-05-31T20:59:59.999Z\",\"in\":\"query\",\"name\":\"start\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"end time for data\",\"example\":\"2020-06-30T20:59:59.999Z\",\"in\":\"query\",\"name\":\"end\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"*/*\":{\"schema\":{}}},\"description\":\"OK\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/transmission/cross-border-capacity","segments":[{"lit":"api"},{"lit":"transmission"},{"lit":"cross-border-capacity"}],"select":{"exist":["end","start"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":6},{"active":true,"args":{"query":[{"active":true,"example":"2020-06-30T20:59:59.999Z","kind":"query","name":"end","orig":"end","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"2020-05-31T20:59:59.999Z","kind":"query","name":"start","orig":"start","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /api/transmission/cross-border-planned-trade","json":"{\"operationId\":\"getCrossborderPlannedTrade\",\"parameters\":[{\"description\":\"start time for data\",\"example\":\"2020-05-31T20:59:59.999Z\",\"in\":\"query\",\"name\":\"start\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"end time for data\",\"example\":\"2020-06-30T20:59:59.999Z\",\"in\":\"query\",\"name\":\"end\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"*/*\":{\"schema\":{}}},\"description\":\"OK\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/transmission/cross-border-planned-trade","segments":[{"lit":"api"},{"lit":"transmission"},{"lit":"cross-border-planned-trade"}],"select":{"exist":["end","start"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":7},{"active":true,"args":{"query":[{"active":true,"example":"2020-06-30T20:59:59.999Z","kind":"query","name":"end","orig":"end","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"2020-05-31T20:59:59.999Z","kind":"query","name":"start","orig":"start","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /api/transmission/cross-border/hourly","json":"{\"operationId\":\"getCrossBorderHourly\",\"parameters\":[{\"description\":\"start time for data\",\"example\":\"2020-05-31T20:59:59.999Z\",\"in\":\"query\",\"name\":\"start\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"end time for data\",\"example\":\"2020-06-30T20:59:59.999Z\",\"in\":\"query\",\"name\":\"end\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"*/*\":{\"schema\":{}}},\"description\":\"OK\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/transmission/cross-border/hourly","segments":[{"lit":"api"},{"lit":"transmission"},{"lit":"cross-border"},{"lit":"hourly"}],"select":{"exist":["end","start"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":8},{"active":true,"args":{},"contract":{"id":"GET /api/transmission/cross-border-planned-trade/latest","json":"{\"operationId\":\"getCrossborderPlannedTradeLatest\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"*/*\":{\"schema\":{}}},\"description\":\"OK\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/transmission/cross-border-planned-trade/latest","segments":[{"lit":"api"},{"lit":"transmission"},{"lit":"cross-border-planned-trade"},{"lit":"latest"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":9},{"active":true,"args":{},"contract":{"id":"GET /api/transmission/cross-border/latest","json":"{\"operationId\":\"getCrossBorderLatest\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json; charset=UTF-8\":{\"schema\":{}},\"application/json;charset=UTF-8\":{\"schema\":{}}},\"description\":\"OK\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/transmission/cross-border/latest","segments":[{"lit":"api"},{"lit":"transmission"},{"lit":"cross-border"},{"lit":"latest"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":10}],"key$":"load"}},"relations":{"ancestors":[["cross_border_capacity"]]},"key$":"transmission_controller","name__orig":"transmission_controller","Name":"TransmissionController","name_":"transmission_controller","name-":"transmission-controller","NAME":"TRANSMISSION_CONTROLLER","index$":21}, {"active":true,"entity":"transmission_controller","key$":"BasicTransmissionControllerFlow","kind":"basic","name":"BasicTransmissionControllerFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"transmission_controller_ref01","srcdatavar":"transmission_controller_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-transmission_controller_ref01"}}],"index$":0}]}, 'TransmissionController')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let transmission_controller_ref01_data = Object.values(setup.data.existing.transmission_controller)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const transmission_controller_ref01_ent = client.TransmissionController()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/transmission_controller/TransmissionControllerTestData.json')

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
    ['transmission_controller01','transmission_controller02','transmission_controller03','cross_border_capacity01','cross_border_capacity02','cross_border_capacity03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ELERING_DASHBOARD_TEST_TRANSMISSION_CONTROLLER_ENTID': idmap,
    'ELERING_DASHBOARD_TEST_LIVE': 'FALSE',
    'ELERING_DASHBOARD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ELERING_DASHBOARD_TEST_TRANSMISSION_CONTROLLER_ENTID']

  const live = 'TRUE' === env.ELERING_DASHBOARD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ELERING_DASHBOARD_TEST_TRANSMISSION_CONTROLLER_ENTID']
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
  
