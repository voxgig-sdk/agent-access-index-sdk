# AgentAccessIndex SDK feature factory

from agentaccessindex_sdk.feature.base_feature import AgentAccessIndexBaseFeature
from agentaccessindex_sdk.feature.ratelimit_feature import AgentAccessIndexRatelimitFeature
from agentaccessindex_sdk.feature.retry_feature import AgentAccessIndexRetryFeature
from agentaccessindex_sdk.feature.test_feature import AgentAccessIndexTestFeature
from agentaccessindex_sdk.feature.timeout_feature import AgentAccessIndexTimeoutFeature


_FEATURES = {
    "base": lambda: AgentAccessIndexBaseFeature(),
    "ratelimit": lambda: AgentAccessIndexRatelimitFeature(),
    "retry": lambda: AgentAccessIndexRetryFeature(),
    "test": lambda: AgentAccessIndexTestFeature(),
    "timeout": lambda: AgentAccessIndexTimeoutFeature(),
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
