# AgentAccessIndex SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

AgentAccessIndexUtility.registrar = ->(u) {
  u.clean = AgentAccessIndexUtilities::Clean
  u.clean_add = AgentAccessIndexUtilities::CleanAdd
  u.clean_explain = AgentAccessIndexUtilities::CleanExplain
  u.done = AgentAccessIndexUtilities::Done
  u.make_error = AgentAccessIndexUtilities::MakeError
  u.feature_add = AgentAccessIndexUtilities::FeatureAdd
  u.feature_hook = AgentAccessIndexUtilities::FeatureHook
  u.feature_init = AgentAccessIndexUtilities::FeatureInit
  u.fetcher = AgentAccessIndexUtilities::Fetcher
  u.make_fetch_def = AgentAccessIndexUtilities::MakeFetchDef
  u.make_context = AgentAccessIndexUtilities::MakeContext
  u.make_options = AgentAccessIndexUtilities::MakeOptions
  u.make_request = AgentAccessIndexUtilities::MakeRequest
  u.make_response = AgentAccessIndexUtilities::MakeResponse
  u.make_result = AgentAccessIndexUtilities::MakeResult
  u.make_point = AgentAccessIndexUtilities::MakePoint
  u.make_spec = AgentAccessIndexUtilities::MakeSpec
  u.make_url = AgentAccessIndexUtilities::MakeUrl
  u.param = AgentAccessIndexUtilities::Param
  u.prepare_auth = AgentAccessIndexUtilities::PrepareAuth
  u.prepare_body = AgentAccessIndexUtilities::PrepareBody
  u.prepare_headers = AgentAccessIndexUtilities::PrepareHeaders
  u.prepare_method = AgentAccessIndexUtilities::PrepareMethod
  u.prepare_params = AgentAccessIndexUtilities::PrepareParams
  u.prepare_path = AgentAccessIndexUtilities::PreparePath
  u.prepare_query = AgentAccessIndexUtilities::PrepareQuery
  u.graphql_body = AgentAccessIndexUtilities::GraphqlBody
  u.graphql_errors = AgentAccessIndexUtilities::GraphqlErrors
  u.result_basic = AgentAccessIndexUtilities::ResultBasic
  u.result_body = AgentAccessIndexUtilities::ResultBody
  u.result_headers = AgentAccessIndexUtilities::ResultHeaders
  u.transform_request = AgentAccessIndexUtilities::TransformRequest
  u.transform_response = AgentAccessIndexUtilities::TransformResponse
}
