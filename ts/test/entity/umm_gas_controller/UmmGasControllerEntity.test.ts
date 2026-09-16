

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


describe('UmmGasControllerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ELERING_DASHBOARD_TEST_LIVE=TRUE.
  afterEach(liveDelay('ELERING_DASHBOARD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EleringDashboardSDK.test()
    const ent = testsdk.UmmGasController()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ELERING_DASHBOARD_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'umm_gas_controller.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"umm_gas_controller","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"affected_asset_name","orig":"affected_asset_name","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"event_duration_date_time_end","orig":"event_duration_date_time_end","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"event_duration_date_time_start","orig":"event_duration_date_time_start","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"event_status","orig":"event_status","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"kind":"query","name":"event_type","orig":"event_type","reqd":false,"type":"`$STRING`","index$":4},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":5},{"active":true,"kind":"query","name":"publication_datetime_start","orig":"publication_datetime_start","reqd":false,"type":"`$STRING`","index$":6},{"active":true,"example":"publicationDateTimeDesc","kind":"query","name":"sort","orig":"sort","reqd":false,"type":"`$STRING`","index$":7},{"active":true,"example":"current","kind":"query","name":"status","orig":"status","reqd":false,"type":"`$STRING`","index$":8},{"active":true,"kind":"query","name":"unavailability_type","orig":"unavailability_type","reqd":false,"type":"`$STRING`","index$":9}]},"contract":{"id":"GET /api/umm/gas","json":"{\"operationId\":\"getAll\",\"parameters\":[{\"description\":\"message statususes to fetch\",\"in\":\"query\",\"name\":\"status\",\"required\":false,\"schema\":{\"default\":\"current\",\"enum\":[\"current\",\"outdated\"],\"type\":\"string\"}},{\"description\":\"message event statuses to fetch\",\"in\":\"query\",\"name\":\"event_status\",\"required\":false,\"schema\":{\"enum\":[\"active\",\"inactive\",\"dismissed\"],\"type\":\"string\"}},{\"description\":\"message event types to fetch\",\"in\":\"query\",\"name\":\"event_type\",\"required\":false,\"schema\":{\"enum\":[\"Offshore_pipeline_unavailability\",\"Transmission_system_unavailability\",\"Storage_unavailability\",\"Injection_unavailability\",\"Withdrawal_unavailability\",\"Gas_treatment_plant_unavailability\",\"Regasification_plant_unavailability\",\"Compressor_station_unavailability\",\"Gas_production_field_unavailability\",\"Import_contract_curtailment\",\"Consumption_unavailability\",\"Other_unavailability\"],\"type\":\"string\"}},{\"description\":\"message unavailability types to fetch\",\"in\":\"query\",\"name\":\"unavailability_type\",\"required\":false,\"schema\":{\"enum\":[\"planned\",\"unplanned\"],\"type\":\"string\"}},{\"description\":\"message affected assets names to fetch\",\"in\":\"query\",\"name\":\"affected_asset_name\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"message event duration date time start to include in response\",\"in\":\"query\",\"name\":\"event_duration_date_time_start\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"message event duration date time end to include in response\",\"in\":\"query\",\"name\":\"event_duration_date_time_end\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"message publication datetime start to include in response\",\"in\":\"query\",\"name\":\"publication_datetime_start\",\"required\":false,\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"format\":\"int32\",\"type\":\"integer\"}},{\"in\":\"query\",\"name\":\"sort\",\"required\":false,\"schema\":{\"default\":\"publicationDateTimeDesc\",\"enum\":[\"publicationDateTimeDesc\",\"publicationDateTimeAsc\",\"eventStartDesc\",\"eventStartAsc\",\"eventStopDesc\",\"eventStopAsc\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"*/*\":{\"schema\":{}}},\"description\":\"OK\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/umm/gas","segments":[{"lit":"api"},{"lit":"umm"},{"lit":"gas"}],"select":{"exist":["affected_asset_name","event_duration_date_time_end","event_duration_date_time_start","event_status","event_type","page","publication_datetime_start","sort","status","unavailability_type"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/umm/gas/messages","json":"{\"operationId\":\"getMessageHistory\",\"parameters\":[{\"description\":\"event id\",\"in\":\"query\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"*/*\":{\"schema\":{}}},\"description\":\"OK\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/umm/gas/messages","segments":[{"lit":"api"},{"lit":"umm"},{"lit":"gas"},{"lit":"messages"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /api/umm/single/{id}","json":"{\"operationId\":\"getSingle\",\"parameters\":[{\"in\":\"query\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"int64\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"*/*\":{\"schema\":{}}},\"description\":\"OK\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/umm/single/{id}","segments":[{"lit":"api"},{"lit":"umm"},{"lit":"single"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"umm_gas_controller","name__orig":"umm_gas_controller","Name":"UmmGasController","name_":"umm_gas_controller","name-":"umm-gas-controller","NAME":"UMM_GAS_CONTROLLER","index$":22}, {"active":true,"entity":"umm_gas_controller","key$":"BasicUmmGasControllerFlow","kind":"basic","name":"BasicUmmGasControllerFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"umm_gas_controller_ref01","srcdatavar":"umm_gas_controller_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-umm_gas_controller_ref01"}}],"index$":0}]}, 'UmmGasController')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let umm_gas_controller_ref01_data = Object.values(setup.data.existing.umm_gas_controller)[0] as any

    // LOAD
    const umm_gas_controller_ref01_ent = client.UmmGasController()
    const umm_gas_controller_ref01_match_dt0: any = {}
    const umm_gas_controller_ref01_data_dt0 = (await umm_gas_controller_ref01_ent.load(umm_gas_controller_ref01_match_dt0)).data()
    assert(null != umm_gas_controller_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/umm_gas_controller/UmmGasControllerTestData.json')

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
    ['umm_gas_controller01','umm_gas_controller02','umm_gas_controller03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ELERING_DASHBOARD_TEST_UMM_GAS_CONTROLLER_ENTID': idmap,
    'ELERING_DASHBOARD_TEST_LIVE': 'FALSE',
    'ELERING_DASHBOARD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ELERING_DASHBOARD_TEST_UMM_GAS_CONTROLLER_ENTID']

  const live = 'TRUE' === env.ELERING_DASHBOARD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ELERING_DASHBOARD_TEST_UMM_GAS_CONTROLLER_ENTID']
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
  
