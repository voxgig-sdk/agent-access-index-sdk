# AgentAccessIndex SDK utility: make_context

from projectname_sdk.core.context import AgentAccessIndexContext


def make_context_util(ctxmap, basectx):
    return AgentAccessIndexContext(ctxmap, basectx)
