# Typed models for the EleringDashboard SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Balance(TypedDict):
    pass


class BalanceLoadMatch(TypedDict, total=False):
    end: str
    start: str


class BalanceController(TypedDict):
    pass


class BalanceControllerLoadMatch(TypedDict, total=False):
    end: str
    field: list
    start: str


class Firm(TypedDict):
    pass


class FirmLoadMatch(TypedDict, total=False):
    end: str
    start: str


class FirmCapacityController(TypedDict):
    pass


class FirmCapacityControllerLoadMatch(TypedDict, total=False):
    end: str
    field: list
    start: str


class GasBalanceController(TypedDict):
    pass


class GasBalanceControllerLoadMatch(TypedDict, total=False):
    end: str
    start: str


class GasBorderTradeController(TypedDict):
    pass


class GasBorderTradeControllerLoadMatch(TypedDict):
    pass


class GasSystem(TypedDict):
    pass


class GasSystemLoadMatch(TypedDict, total=False):
    end: str
    start: str


class GasSystemController(TypedDict):
    pass


class GasSystemControllerLoadMatch(TypedDict, total=False):
    end: str
    field: list
    start: str


class GasTrade(TypedDict):
    pass


class GasTradeLoadMatch(TypedDict, total=False):
    end: str
    start: str


class GasTradeController(TypedDict):
    pass


class GasTradeControllerLoadMatch(TypedDict, total=False):
    end: str
    field: list
    start: str


class GasTransmissionController(TypedDict):
    pass


class GasTransmissionControllerLoadMatch(TypedDict, total=False):
    end: str
    start: str


class GreenController(TypedDict):
    pass


class GreenControllerLoadMatch(TypedDict, total=False):
    fuel: str
    technology: str
    type: str


class Interruptible(TypedDict):
    pass


class InterruptibleLoadMatch(TypedDict, total=False):
    end: str
    start: str


class InterruptibleCapacityController(TypedDict):
    pass


class InterruptibleCapacityControllerLoadMatch(TypedDict, total=False):
    end: str
    field: list
    start: str


class Nomination(TypedDict):
    pass


class NominationLoadMatch(TypedDict, total=False):
    end: str
    start: str


class NominationsController(TypedDict):
    pass


class NominationsControllerLoadMatch(TypedDict, total=False):
    end: str
    field: list
    start: str


class NpsController(TypedDict):
    pass


class NpsControllerLoadMatch(TypedDict, total=False):
    end: str
    start: str


class Renomination(TypedDict):
    pass


class RenominationLoadMatch(TypedDict, total=False):
    end: str
    start: str


class RenominationsController(TypedDict):
    pass


class RenominationsControllerLoadMatch(TypedDict, total=False):
    end: str
    field: list
    start: str


class System(TypedDict):
    pass


class SystemLoadMatch(TypedDict, total=False):
    end: str
    start: str


class SystemController(TypedDict):
    pass


class SystemControllerLoadMatch(TypedDict, total=False):
    end: str
    field: list
    start: str


class TransmissionController(TypedDict):
    pass


class TransmissionControllerLoadMatchRequired(TypedDict):
    group: str


class TransmissionControllerLoadMatch(TransmissionControllerLoadMatchRequired, total=False):
    end: str
    start: str


class UmmGasController(TypedDict):
    pass


class UmmGasControllerLoadMatch(TypedDict):
    id: int


class UmmRssFeedController(TypedDict):
    pass


class UmmRssFeedControllerLoadMatch(TypedDict):
    pass
