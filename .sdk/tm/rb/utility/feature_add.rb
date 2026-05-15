# EleringDashboard SDK utility: feature_add
module EleringDashboardUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
