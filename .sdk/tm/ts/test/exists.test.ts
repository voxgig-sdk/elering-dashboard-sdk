
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { EleringDashboardSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await EleringDashboardSDK.test()
    equal(null !== testsdk, true)
  })

})
