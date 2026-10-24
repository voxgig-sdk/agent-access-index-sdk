-- AgentAccessIndex SDK exists test

local sdk = require("agent-access-index_sdk")

describe("AgentAccessIndexSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
