# EleringDashboard SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module EleringDashboardFeatures
  def self.make_feature(name)
    case name
    when "base"
      EleringDashboardBaseFeature.new
    when "ratelimit"
      EleringDashboardRatelimitFeature.new
    when "retry"
      EleringDashboardRetryFeature.new
    when "test"
      EleringDashboardTestFeature.new
    when "timeout"
      EleringDashboardTimeoutFeature.new
    else
      EleringDashboardBaseFeature.new
    end
  end
end
