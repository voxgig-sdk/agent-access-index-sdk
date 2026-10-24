# AgentAccessIndex SDK exists test

require "minitest/autorun"
require_relative "../AgentAccessIndex_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = AgentAccessIndexSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
