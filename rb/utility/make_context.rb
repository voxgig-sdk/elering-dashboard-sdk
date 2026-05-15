# EleringDashboard SDK utility: make_context
require_relative '../core/context'
module EleringDashboardUtilities
  MakeContext = ->(ctxmap, basectx) {
    EleringDashboardContext.new(ctxmap, basectx)
  }
end
