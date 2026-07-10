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

# Request payload for Balance#load.
class BalanceLoadMatch
end

# BalanceController entity data model.
class BalanceController
end

# Request payload for BalanceController#load.
class BalanceControllerLoadMatch
end

# Firm entity data model.
class Firm
end

# Request payload for Firm#load.
class FirmLoadMatch
end

# FirmCapacityController entity data model.
class FirmCapacityController
end

# Request payload for FirmCapacityController#load.
class FirmCapacityControllerLoadMatch
end

# GasBalanceController entity data model.
class GasBalanceController
end

# Request payload for GasBalanceController#load.
class GasBalanceControllerLoadMatch
end

# GasBorderTradeController entity data model.
class GasBorderTradeController
end

# Request payload for GasBorderTradeController#load.
class GasBorderTradeControllerLoadMatch
end

# GasSystem entity data model.
class GasSystem
end

# Request payload for GasSystem#load.
class GasSystemLoadMatch
end

# GasSystemController entity data model.
class GasSystemController
end

# Request payload for GasSystemController#load.
class GasSystemControllerLoadMatch
end

# GasTrade entity data model.
class GasTrade
end

# Request payload for GasTrade#load.
class GasTradeLoadMatch
end

# GasTradeController entity data model.
class GasTradeController
end

# Request payload for GasTradeController#load.
#
# @!attribute [rw] group
#   @return [String, nil]
GasTradeControllerLoadMatch = Struct.new(
  :group,
  keyword_init: true
)

# GasTransmissionController entity data model.
class GasTransmissionController
end

# Request payload for GasTransmissionController#load.
class GasTransmissionControllerLoadMatch
end

# GreenController entity data model.
class GreenController
end

# Request payload for GreenController#load.
class GreenControllerLoadMatch
end

# Interruptible entity data model.
class Interruptible
end

# Request payload for Interruptible#load.
class InterruptibleLoadMatch
end

# InterruptibleCapacityController entity data model.
class InterruptibleCapacityController
end

# Request payload for InterruptibleCapacityController#load.
class InterruptibleCapacityControllerLoadMatch
end

# Nomination entity data model.
class Nomination
end

# Request payload for Nomination#load.
class NominationLoadMatch
end

# NominationsController entity data model.
class NominationsController
end

# Request payload for NominationsController#load.
class NominationsControllerLoadMatch
end

# NpsController entity data model.
class NpsController
end

# Request payload for NpsController#load.
#
# @!attribute [rw] group
#   @return [String, nil]
NpsControllerLoadMatch = Struct.new(
  :group,
  keyword_init: true
)

# Renomination entity data model.
class Renomination
end

# Request payload for Renomination#load.
class RenominationLoadMatch
end

# RenominationsController entity data model.
class RenominationsController
end

# Request payload for RenominationsController#load.
class RenominationsControllerLoadMatch
end

# System entity data model.
class System
end

# Request payload for System#load.
class SystemLoadMatch
end

# SystemController entity data model.
class SystemController
end

# Request payload for SystemController#load.
class SystemControllerLoadMatch
end

# TransmissionController entity data model.
class TransmissionController
end

# Request payload for TransmissionController#load.
#
# @!attribute [rw] group
#   @return [String, nil]
TransmissionControllerLoadMatch = Struct.new(
  :group,
  keyword_init: true
)

# UmmGasController entity data model.
class UmmGasController
end

# Request payload for UmmGasController#load.
class UmmGasControllerLoadMatch
end

# UmmRssFeedController entity data model.
class UmmRssFeedController
end

# Request payload for UmmRssFeedController#load.
class UmmRssFeedControllerLoadMatch
end

