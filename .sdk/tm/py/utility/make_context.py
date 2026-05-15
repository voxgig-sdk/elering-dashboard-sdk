# EleringDashboard SDK utility: make_context

from core.context import EleringDashboardContext


def make_context_util(ctxmap, basectx):
    return EleringDashboardContext(ctxmap, basectx)
