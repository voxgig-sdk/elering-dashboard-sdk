# EleringDashboard SDK feature factory

from eleringdashboard_sdk.feature.base_feature import EleringDashboardBaseFeature
from eleringdashboard_sdk.feature.ratelimit_feature import EleringDashboardRatelimitFeature
from eleringdashboard_sdk.feature.retry_feature import EleringDashboardRetryFeature
from eleringdashboard_sdk.feature.test_feature import EleringDashboardTestFeature
from eleringdashboard_sdk.feature.timeout_feature import EleringDashboardTimeoutFeature


_FEATURES = {
    "base": lambda: EleringDashboardBaseFeature(),
    "ratelimit": lambda: EleringDashboardRatelimitFeature(),
    "retry": lambda: EleringDashboardRetryFeature(),
    "test": lambda: EleringDashboardTestFeature(),
    "timeout": lambda: EleringDashboardTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
