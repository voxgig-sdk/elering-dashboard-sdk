# ProjectName SDK exists test

import pytest
from eleringdashboard_sdk import EleringDashboardSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = EleringDashboardSDK.test(None, None)
        assert testsdk is not None
