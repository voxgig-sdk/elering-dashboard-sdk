# EleringDashboard SDK exists test

require "minitest/autorun"
require_relative "../EleringDashboard_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = EleringDashboardSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
