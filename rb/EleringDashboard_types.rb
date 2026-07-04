# frozen_string_literal: true

# Typed models for the EleringDashboard SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Balance entity data model.
class Balance
end

# Match filter for Balance#load (any subset of Balance fields).
class BalanceLoadMatch
end

# BalanceController entity data model.
class BalanceController
end

# Match filter for BalanceController#load (any subset of BalanceController fields).
class BalanceControllerLoadMatch
end

# Firm entity data model.
class Firm
end

# Match filter for Firm#load (any subset of Firm fields).
class FirmLoadMatch
end

# FirmCapacityController entity data model.
class FirmCapacityController
end

# Match filter for FirmCapacityController#load (any subset of FirmCapacityController fields).
class FirmCapacityControllerLoadMatch
end

# GasBalanceController entity data model.
class GasBalanceController
end

# Match filter for GasBalanceController#load (any subset of GasBalanceController fields).
class GasBalanceControllerLoadMatch
end

# GasBorderTradeController entity data model.
class GasBorderTradeController
end

# Match filter for GasBorderTradeController#load (any subset of GasBorderTradeController fields).
class GasBorderTradeControllerLoadMatch
end

# GasSystem entity data model.
class GasSystem
end

# Match filter for GasSystem#load (any subset of GasSystem fields).
class GasSystemLoadMatch
end

# GasSystemController entity data model.
class GasSystemController
end

# Match filter for GasSystemController#load (any subset of GasSystemController fields).
class GasSystemControllerLoadMatch
end

# GasTrade entity data model.
class GasTrade
end

# Match filter for GasTrade#load (any subset of GasTrade fields).
class GasTradeLoadMatch
end

# GasTradeController entity data model.
class GasTradeController
end

# Request payload for GasTradeController#load.
#
# @!attribute [rw] group
#   @return [String]
GasTradeControllerLoadMatch = Struct.new(
  :group,
  keyword_init: true
)

# GasTransmissionController entity data model.
class GasTransmissionController
end

# Match filter for GasTransmissionController#load (any subset of GasTransmissionController fields).
class GasTransmissionControllerLoadMatch
end

# GreenController entity data model.
class GreenController
end

# Match filter for GreenController#load (any subset of GreenController fields).
class GreenControllerLoadMatch
end

# Interruptible entity data model.
class Interruptible
end

# Match filter for Interruptible#load (any subset of Interruptible fields).
class InterruptibleLoadMatch
end

# InterruptibleCapacityController entity data model.
class InterruptibleCapacityController
end

# Match filter for InterruptibleCapacityController#load (any subset of InterruptibleCapacityController fields).
class InterruptibleCapacityControllerLoadMatch
end

# Nomination entity data model.
class Nomination
end

# Match filter for Nomination#load (any subset of Nomination fields).
class NominationLoadMatch
end

# NominationsController entity data model.
class NominationsController
end

# Match filter for NominationsController#load (any subset of NominationsController fields).
class NominationsControllerLoadMatch
end

# NpsController entity data model.
class NpsController
end

# Request payload for NpsController#load.
#
# @!attribute [rw] group
#   @return [String]
NpsControllerLoadMatch = Struct.new(
  :group,
  keyword_init: true
)

# Renomination entity data model.
class Renomination
end

# Match filter for Renomination#load (any subset of Renomination fields).
class RenominationLoadMatch
end

# RenominationsController entity data model.
class RenominationsController
end

# Match filter for RenominationsController#load (any subset of RenominationsController fields).
class RenominationsControllerLoadMatch
end

# System entity data model.
class System
end

# Match filter for System#load (any subset of System fields).
class SystemLoadMatch
end

# SystemController entity data model.
class SystemController
end

# Match filter for SystemController#load (any subset of SystemController fields).
class SystemControllerLoadMatch
end

# TransmissionController entity data model.
class TransmissionController
end

# Request payload for TransmissionController#load.
#
# @!attribute [rw] group
#   @return [String]
TransmissionControllerLoadMatch = Struct.new(
  :group,
  keyword_init: true
)

# UmmGasController entity data model.
class UmmGasController
end

# Match filter for UmmGasController#load (any subset of UmmGasController fields).
class UmmGasControllerLoadMatch
end

# UmmRssFeedController entity data model.
class UmmRssFeedController
end

# Match filter for UmmRssFeedController#load (any subset of UmmRssFeedController fields).
class UmmRssFeedControllerLoadMatch
end

