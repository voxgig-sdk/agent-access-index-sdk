# AgentAccessIndex SDK exists test

import pytest
from agentaccessindex_sdk import AgentAccessIndexSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = AgentAccessIndexSDK.test(None, None)
        assert testsdk is not None
