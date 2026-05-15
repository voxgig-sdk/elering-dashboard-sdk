# EleringDashboard SDK feature factory

from feature.base_feature import EleringDashboardBaseFeature
from feature.test_feature import EleringDashboardTestFeature


def _make_feature(name):
    features = {
        "base": lambda: EleringDashboardBaseFeature(),
        "test": lambda: EleringDashboardTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
