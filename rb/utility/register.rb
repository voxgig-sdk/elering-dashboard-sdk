# EleringDashboard SDK utility registration
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
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

EleringDashboardUtility.registrar = ->(u) {
  u.clean = EleringDashboardUtilities::Clean
  u.done = EleringDashboardUtilities::Done
  u.make_error = EleringDashboardUtilities::MakeError
  u.feature_add = EleringDashboardUtilities::FeatureAdd
  u.feature_hook = EleringDashboardUtilities::FeatureHook
  u.feature_init = EleringDashboardUtilities::FeatureInit
  u.fetcher = EleringDashboardUtilities::Fetcher
  u.make_fetch_def = EleringDashboardUtilities::MakeFetchDef
  u.make_context = EleringDashboardUtilities::MakeContext
  u.make_options = EleringDashboardUtilities::MakeOptions
  u.make_request = EleringDashboardUtilities::MakeRequest
  u.make_response = EleringDashboardUtilities::MakeResponse
  u.make_result = EleringDashboardUtilities::MakeResult
  u.make_point = EleringDashboardUtilities::MakePoint
  u.make_spec = EleringDashboardUtilities::MakeSpec
  u.make_url = EleringDashboardUtilities::MakeUrl
  u.param = EleringDashboardUtilities::Param
  u.prepare_auth = EleringDashboardUtilities::PrepareAuth
  u.prepare_body = EleringDashboardUtilities::PrepareBody
  u.prepare_headers = EleringDashboardUtilities::PrepareHeaders
  u.prepare_method = EleringDashboardUtilities::PrepareMethod
  u.prepare_params = EleringDashboardUtilities::PrepareParams
  u.prepare_path = EleringDashboardUtilities::PreparePath
  u.prepare_query = EleringDashboardUtilities::PrepareQuery
  u.result_basic = EleringDashboardUtilities::ResultBasic
  u.result_body = EleringDashboardUtilities::ResultBody
  u.result_headers = EleringDashboardUtilities::ResultHeaders
  u.transform_request = EleringDashboardUtilities::TransformRequest
  u.transform_response = EleringDashboardUtilities::TransformResponse
}
