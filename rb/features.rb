# EleringDashboard SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module EleringDashboardFeatures
  def self.make_feature(name)
    case name
    when "base"
      EleringDashboardBaseFeature.new
    when "test"
      EleringDashboardTestFeature.new
    else
      EleringDashboardBaseFeature.new
    end
  end
end
