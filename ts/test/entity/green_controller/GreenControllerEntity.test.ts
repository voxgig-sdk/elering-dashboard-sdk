

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


describe('GreenControllerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ELERING_DASHBOARD_TEST_LIVE=TRUE.
  afterEach(liveDelay('ELERING_DASHBOARD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EleringDashboardSDK.test()
    const ent = testsdk.GreenController()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ELERING_DASHBOARD_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'green_controller.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"green_controller","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/green/certificates","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"Kõik kütused","k":"query","n":"fuel","or":"fuel","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"Kõik tehnoloogiad","k":"query","n":"technology","or":"technology","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"TRANSACTION","k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/green/certificates","q":{"exist":["fuel","technology","type"]},"r":{},"s":[{"lit":"api"},{"lit":"green"},{"lit":"certificates"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"green_controller","name__orig":"green_controller","Name":"GreenController","name_":"green_controller","name-":"green-controller","NAME":"GREEN_CONTROLLER","index$":11}, {"active":true,"entity":"green_controller","key$":"BasicGreenControllerFlow","kind":"basic","name":"BasicGreenControllerFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"green_controller_ref01","srcdatavar":"green_controller_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-green_controller_ref01"}}],"index$":0}]}, 'GreenController', {"GET /api/green/certificates":{"protocol":"http","operationId":"getCertificates","responses":{"200":{"description":"OK","content":{"*/*":{"schema":{"x-ref":"#/components/schemas/ApiCollectionResponseGreenResponseDto"}}}}},"parameters":[{"name":"technology","in":"query","description":"technology fields","required":false,"schema":{"type":"string","default":"Kõik tehnoloogiad"},"index$":0},{"name":"fuel","in":"query","description":"fuel fields","required":false,"schema":{"type":"string","default":"Kõik kütused"},"index$":1},{"name":"type","in":"query","description":"transaction type fields","required":false,"schema":{"type":"string","default":"TRANSACTION","enum":["TRANSACTION","PRODUCTION"]},"index$":2}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let green_controller_ref01_data = Object.values(setup.data.existing.green_controller)[0] as any

    // LOAD
    const green_controller_ref01_ent = client.GreenController()
    const green_controller_ref01_match_dt0: any = {}
    const green_controller_ref01_data_dt0 = (await green_controller_ref01_ent.load(green_controller_ref01_match_dt0)).data()
    assert(null != green_controller_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/green_controller/GreenControllerTestData.json')

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
    ['green_controller01','green_controller02','green_controller03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ELERING_DASHBOARD_TEST_GREEN_CONTROLLER_ENTID': idmap,
    'ELERING_DASHBOARD_TEST_LIVE': 'FALSE',
    'ELERING_DASHBOARD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ELERING_DASHBOARD_TEST_GREEN_CONTROLLER_ENTID']

  const live = 'TRUE' === env.ELERING_DASHBOARD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ELERING_DASHBOARD_TEST_GREEN_CONTROLLER_ENTID']
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
  
