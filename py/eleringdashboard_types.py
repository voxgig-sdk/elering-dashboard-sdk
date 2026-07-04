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


class BalanceLoadMatch(TypedDict):
    pass


class BalanceController(TypedDict):
    pass


class BalanceControllerLoadMatch(TypedDict):
    pass


class Firm(TypedDict):
    pass


class FirmLoadMatch(TypedDict):
    pass


class FirmCapacityController(TypedDict):
    pass


class FirmCapacityControllerLoadMatch(TypedDict):
    pass


class GasBalanceController(TypedDict):
    pass


class GasBalanceControllerLoadMatch(TypedDict):
    pass


class GasBorderTradeController(TypedDict):
    pass


class GasBorderTradeControllerLoadMatch(TypedDict):
    pass


class GasSystem(TypedDict):
    pass


class GasSystemLoadMatch(TypedDict):
    pass


class GasSystemController(TypedDict):
    pass


class GasSystemControllerLoadMatch(TypedDict):
    pass


class GasTrade(TypedDict):
    pass


class GasTradeLoadMatch(TypedDict):
    pass


class GasTradeController(TypedDict):
    pass


class GasTradeControllerLoadMatch(TypedDict):
    group: str


class GasTransmissionController(TypedDict):
    pass


class GasTransmissionControllerLoadMatch(TypedDict):
    pass


class GreenController(TypedDict):
    pass


class GreenControllerLoadMatch(TypedDict):
    pass


class Interruptible(TypedDict):
    pass


class InterruptibleLoadMatch(TypedDict):
    pass


class InterruptibleCapacityController(TypedDict):
    pass


class InterruptibleCapacityControllerLoadMatch(TypedDict):
    pass


class Nomination(TypedDict):
    pass


class NominationLoadMatch(TypedDict):
    pass


class NominationsController(TypedDict):
    pass


class NominationsControllerLoadMatch(TypedDict):
    pass


class NpsController(TypedDict):
    pass


class NpsControllerLoadMatch(TypedDict):
    group: str


class Renomination(TypedDict):
    pass


class RenominationLoadMatch(TypedDict):
    pass


class RenominationsController(TypedDict):
    pass


class RenominationsControllerLoadMatch(TypedDict):
    pass


class System(TypedDict):
    pass


class SystemLoadMatch(TypedDict):
    pass


class SystemController(TypedDict):
    pass


class SystemControllerLoadMatch(TypedDict):
    pass


class TransmissionController(TypedDict):
    pass


class TransmissionControllerLoadMatch(TypedDict):
    group: str


class UmmGasController(TypedDict):
    pass


class UmmGasControllerLoadMatch(TypedDict):
    pass


class UmmRssFeedController(TypedDict):
    pass


class UmmRssFeedControllerLoadMatch(TypedDict):
    pass
