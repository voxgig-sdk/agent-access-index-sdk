
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AgentAccessIndexSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = AgentAccessIndexSDK.test()
    equal(testsdk instanceof AgentAccessIndexSDK, true,
      'AgentAccessIndexSDK.test() must return a client synchronously')
  })

})
