# AgentAccessIndex SDK utility: prepare_body
require_relative 'media'
module AgentAccessIndexUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return AgentAccessIndexUtilities.raw_body(ctx.reqdata) if AgentAccessIndexUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
