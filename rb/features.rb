# AgentAccessIndex SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module AgentAccessIndexFeatures
  def self.make_feature(name)
    case name
    when "base"
      AgentAccessIndexBaseFeature.new
    when "ratelimit"
      AgentAccessIndexRatelimitFeature.new
    when "retry"
      AgentAccessIndexRetryFeature.new
    when "test"
      AgentAccessIndexTestFeature.new
    when "timeout"
      AgentAccessIndexTimeoutFeature.new
    else
      AgentAccessIndexBaseFeature.new
    end
  end
end
