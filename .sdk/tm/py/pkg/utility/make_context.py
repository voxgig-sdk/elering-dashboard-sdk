# EleringDashboard SDK utility: make_context

from projectname_sdk.core.context import EleringDashboardContext


def make_context_util(ctxmap, basectx):
    return EleringDashboardContext(ctxmap, basectx)
