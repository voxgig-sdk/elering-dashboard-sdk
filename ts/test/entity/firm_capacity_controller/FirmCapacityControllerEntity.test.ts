

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


describe('FirmCapacityControllerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ELERING_DASHBOARD_TEST_LIVE=TRUE.
  afterEach(liveDelay('ELERING_DASHBOARD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EleringDashboardSDK.test()
    const ent = testsdk.FirmCapacityController()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ELERING_DASHBOARD_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'firm_capacity_controller.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"firm_capacity_controller","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/capacity/firm/csv","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"2020-05-31T20:59:59.999Z","k":"query","n":"end","or":"end","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":["[\"narva_technical_entry\"","\"narva_booked_entry\"","\"narva_available_entry\"","\"varska_technical_entry\"","\"varska_booked_entry\"","\"varska_available_entry\"","\"varska_technical_exit\"","\"varska_booked_exit\"","\"varska_available_exit\"","\"balticconnector_technical_entry\"","\"balticconnector_booked_entry\"","\"balticconnector_available_entry\"","\"balticconnector_technical_exit\"","\"balticconnector_booked_exit\"","\"balticconnector_available_exit\"","\"production_technical\"","\"production_booked\"","\"production_available\"]"],"k":"query","n":"field","or":"fields","r":false,"t":"`$ARRAY`","index$":1},{"a":true,"ex":"2020-05-31T20:59:59.999Z","k":"query","n":"start","or":"start","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/capacity/firm/csv","q":{"exist":["end","field","start"]},"r":{},"s":[{"lit":"api"},{"lit":"capacity"},{"lit":"firm"},{"lit":"csv"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"firm_capacity_controller","name__orig":"firm_capacity_controller","Name":"FirmCapacityController","name_":"firm_capacity_controller","name-":"firm-capacity-controller","NAME":"FIRM_CAPACITY_CONTROLLER","index$":3}, {"active":true,"entity":"firm_capacity_controller","key$":"BasicFirmCapacityControllerFlow","kind":"basic","name":"BasicFirmCapacityControllerFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"firm_capacity_controller_ref01","srcdatavar":"firm_capacity_controller_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-firm_capacity_controller_ref01"}}],"index$":0}]}, 'FirmCapacityController', {"GET /api/capacity/firm/csv":{"protocol":"http","parameters":[{"name":"start","in":"query","description":"start time for data","required":false,"allowEmptyValue":true,"schema":{"type":"string","format":"date-time"},"example":"2020-05-31T20:59:59.999Z","index$":0},{"name":"end","in":"query","description":"end time for data","required":false,"allowEmptyValue":true,"schema":{"type":"string","format":"date-time"},"example":"2020-05-31T20:59:59.999Z","index$":1},{"name":"fields","in":"query","description":"Data fields to include in response","required":false,"schema":{"type":"array","default":["[\"narva_technical_entry\"","\"narva_booked_entry\"","\"narva_available_entry\"","\"varska_technical_entry\"","\"varska_booked_entry\"","\"varska_available_entry\"","\"varska_technical_exit\"","\"varska_booked_exit\"","\"varska_available_exit\"","\"balticconnector_technical_entry\"","\"balticconnector_booked_entry\"","\"balticconnector_available_entry\"","\"balticconnector_technical_exit\"","\"balticconnector_booked_exit\"","\"balticconnector_available_exit\"","\"production_technical\"","\"production_booked\"","\"production_available\"]"],"items":{"type":"string"}},"index$":2}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let firm_capacity_controller_ref01_data = Object.values(setup.data.existing.firm_capacity_controller)[0] as any

    // LOAD
    const firm_capacity_controller_ref01_ent = client.FirmCapacityController()
    const firm_capacity_controller_ref01_match_dt0: any = {}
    const firm_capacity_controller_ref01_data_dt0 = (await firm_capacity_controller_ref01_ent.load(firm_capacity_controller_ref01_match_dt0)).data()
    assert(null != firm_capacity_controller_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/firm_capacity_controller/FirmCapacityControllerTestData.json')

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
    ['firm_capacity_controller01','firm_capacity_controller02','firm_capacity_controller03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ELERING_DASHBOARD_TEST_FIRM_CAPACITY_CONTROLLER_ENTID': idmap,
    'ELERING_DASHBOARD_TEST_LIVE': 'FALSE',
    'ELERING_DASHBOARD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ELERING_DASHBOARD_TEST_FIRM_CAPACITY_CONTROLLER_ENTID']

  const live = 'TRUE' === env.ELERING_DASHBOARD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ELERING_DASHBOARD_TEST_FIRM_CAPACITY_CONTROLLER_ENTID']
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
  
