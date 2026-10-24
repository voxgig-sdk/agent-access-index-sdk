# AgentAccessIndex SDK utility: make_context
require_relative '../core/context'
module AgentAccessIndexUtilities
  MakeContext = ->(ctxmap, basectx) {
    AgentAccessIndexContext.new(ctxmap, basectx)
  }
end
