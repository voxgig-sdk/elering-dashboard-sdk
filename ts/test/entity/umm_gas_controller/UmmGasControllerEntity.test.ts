

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { EleringDashboardSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('UmmGasControllerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ELERING_DASHBOARD_TEST_LIVE=TRUE.
  afterEach(liveDelay('ELERING_DASHBOARD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EleringDashboardSDK.test()
    const ent = testsdk.UmmGasController()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = EleringDashboardSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.UmmGasController().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ELERING_DASHBOARD_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'umm_gas_controller.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"umm_gas_controller","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/umm/gas/messages","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/umm/gas/messages","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"umm"},{"lit":"gas"},{"lit":"messages"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/umm/single/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/umm/single/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"umm"},{"lit":"single"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /api/umm/gas","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"affected_asset_name","or":"affected_asset_name","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"event_duration_date_time_end","or":"event_duration_date_time_end","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"event_duration_date_time_start","or":"event_duration_date_time_start","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"event_status","or":"event_status","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"event_type","or":"event_type","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":5},{"a":true,"k":"query","n":"publication_datetime_start","or":"publication_datetime_start","r":false,"t":"`$STRING`","index$":6},{"a":true,"ex":"publicationDateTimeDesc","k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":7},{"a":true,"ex":"current","k":"query","n":"status","or":"status","r":false,"t":"`$STRING`","index$":8},{"a":true,"k":"query","n":"unavailability_type","or":"unavailability_type","r":false,"t":"`$STRING`","index$":9}]},"k":"http","m":"GET","o":"/api/umm/gas","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"umm"},{"lit":"gas"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"umm_gas_controller","name__orig":"umm_gas_controller","Name":"UmmGasController","name_":"umm_gas_controller","name-":"umm-gas-controller","NAME":"UMM_GAS_CONTROLLER","index$":22}, {"active":true,"entity":"umm_gas_controller","key$":"BasicUmmGasControllerFlow","kind":"basic","name":"BasicUmmGasControllerFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"umm_gas_controller_ref01","srcdatavar":"umm_gas_controller_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-umm_gas_controller_ref01"}}],"index$":0}]}, 'UmmGasController', {"GET /api/umm/gas/messages":{"protocol":"http","parameters":[{"name":"id","in":"query","description":"event id","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/umm/single/{id}":{"protocol":"http","parameters":[{"name":"id","in":"query","required":true,"schema":{"type":"integer","format":"int64"},"index$":0}]},"GET /api/umm/gas":{"protocol":"http","parameters":[{"name":"status","in":"query","description":"message statususes to fetch","required":false,"schema":{"type":"string","default":"current","enum":["current","outdated"]},"index$":0},{"name":"event_status","in":"query","description":"message event statuses to fetch","required":false,"schema":{"type":"string","enum":["active","inactive","dismissed"]},"index$":1},{"name":"event_type","in":"query","description":"message event types to fetch","required":false,"schema":{"type":"string","enum":["Offshore_pipeline_unavailability","Transmission_system_unavailability","Storage_unavailability","Injection_unavailability","Withdrawal_unavailability","Gas_treatment_plant_unavailability","Regasification_plant_unavailability","Compressor_station_unavailability","Gas_production_field_unavailability","Import_contract_curtailment","Consumption_unavailability","Other_unavailability"]},"index$":2},{"name":"unavailability_type","in":"query","description":"message unavailability types to fetch","required":false,"schema":{"type":"string","enum":["planned","unplanned"]},"index$":3},{"name":"affected_asset_name","in":"query","description":"message affected assets names to fetch","required":false,"schema":{"type":"string"},"index$":4},{"name":"event_duration_date_time_start","in":"query","description":"message event duration date time start to include in response","required":false,"schema":{"type":"string","format":"date-time"},"index$":5},{"name":"event_duration_date_time_end","in":"query","description":"message event duration date time end to include in response","required":false,"schema":{"type":"string","format":"date-time"},"index$":6},{"name":"publication_datetime_start","in":"query","description":"message publication datetime start to include in response","required":false,"schema":{"type":"string","format":"date-time"},"index$":7},{"name":"page","in":"query","required":false,"schema":{"type":"integer","format":"int32","default":1},"index$":8},{"name":"sort","in":"query","required":false,"schema":{"type":"string","default":"publicationDateTimeDesc","enum":["publicationDateTimeDesc","publicationDateTimeAsc","eventStartDesc","eventStartAsc","eventStopDesc","eventStopAsc"]},"index$":9}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let umm_gas_controller_ref01_data = Object.values(setup.data.existing.umm_gas_controller)[0] as any

    // LOAD
    const umm_gas_controller_ref01_ent = client.UmmGasController()
    const umm_gas_controller_ref01_match_dt0: any = {}
    umm_gas_controller_ref01_match_dt0.id = umm_gas_controller_ref01_data.id
    const umm_gas_controller_ref01_data_dt0 = (await umm_gas_controller_ref01_ent.load(umm_gas_controller_ref01_match_dt0)).data()
    assert(umm_gas_controller_ref01_data_dt0.id === umm_gas_controller_ref01_data.id)


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
  
