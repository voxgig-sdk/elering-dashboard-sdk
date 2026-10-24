# EleringDashboard SDK utility: prepare_body
require_relative 'media'
module EleringDashboardUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return EleringDashboardUtilities.raw_body(ctx.reqdata) if EleringDashboardUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
