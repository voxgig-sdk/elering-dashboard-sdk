# Typed models for the EleringDashboard SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Balance:
    pass


@dataclass
class BalanceLoadMatch:
    pass


@dataclass
class BalanceController:
    pass


@dataclass
class BalanceControllerLoadMatch:
    pass


@dataclass
class Firm:
    pass


@dataclass
class FirmLoadMatch:
    pass


@dataclass
class FirmCapacityController:
    pass


@dataclass
class FirmCapacityControllerLoadMatch:
    pass


@dataclass
class GasBalanceController:
    pass


@dataclass
class GasBalanceControllerLoadMatch:
    pass


@dataclass
class GasBorderTradeController:
    pass


@dataclass
class GasBorderTradeControllerLoadMatch:
    pass


@dataclass
class GasSystem:
    pass


@dataclass
class GasSystemLoadMatch:
    pass


@dataclass
class GasSystemController:
    pass


@dataclass
class GasSystemControllerLoadMatch:
    pass


@dataclass
class GasTrade:
    pass


@dataclass
class GasTradeLoadMatch:
    pass


@dataclass
class GasTradeController:
    pass


@dataclass
class GasTradeControllerLoadMatch:
    group: str


@dataclass
class GasTransmissionController:
    pass


@dataclass
class GasTransmissionControllerLoadMatch:
    pass


@dataclass
class GreenController:
    pass


@dataclass
class GreenControllerLoadMatch:
    pass


@dataclass
class Interruptible:
    pass


@dataclass
class InterruptibleLoadMatch:
    pass


@dataclass
class InterruptibleCapacityController:
    pass


@dataclass
class InterruptibleCapacityControllerLoadMatch:
    pass


@dataclass
class Nomination:
    pass


@dataclass
class NominationLoadMatch:
    pass


@dataclass
class NominationsController:
    pass


@dataclass
class NominationsControllerLoadMatch:
    pass


@dataclass
class NpsController:
    pass


@dataclass
class NpsControllerLoadMatch:
    group: str


@dataclass
class Renomination:
    pass


@dataclass
class RenominationLoadMatch:
    pass


@dataclass
class RenominationsController:
    pass


@dataclass
class RenominationsControllerLoadMatch:
    pass


@dataclass
class System:
    pass


@dataclass
class SystemLoadMatch:
    pass


@dataclass
class SystemController:
    pass


@dataclass
class SystemControllerLoadMatch:
    pass


@dataclass
class TransmissionController:
    pass


@dataclass
class TransmissionControllerLoadMatch:
    group: str


@dataclass
class UmmGasController:
    pass


@dataclass
class UmmGasControllerLoadMatch:
    pass


@dataclass
class UmmRssFeedController:
    pass


@dataclass
class UmmRssFeedControllerLoadMatch:
    pass

