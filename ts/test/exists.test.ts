
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { EleringDashboardSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = EleringDashboardSDK.test()
    equal(testsdk instanceof EleringDashboardSDK, true,
      'EleringDashboardSDK.test() must return a client synchronously')
  })

})
