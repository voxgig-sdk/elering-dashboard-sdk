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
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
BalanceLoadMatch = Struct.new(
  :end,
  :start,
  keyword_init: true
)

# BalanceController entity data model.
class BalanceController
end

# Request payload for BalanceController#load.
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] field
#   @return [Array, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
BalanceControllerLoadMatch = Struct.new(
  :end,
  :field,
  :start,
  keyword_init: true
)

# Firm entity data model.
class Firm
end

# Request payload for Firm#load.
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
FirmLoadMatch = Struct.new(
  :end,
  :start,
  keyword_init: true
)

# FirmCapacityController entity data model.
class FirmCapacityController
end

# Request payload for FirmCapacityController#load.
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] field
#   @return [Array, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
FirmCapacityControllerLoadMatch = Struct.new(
  :end,
  :field,
  :start,
  keyword_init: true
)

# GasBalanceController entity data model.
class GasBalanceController
end

# Request payload for GasBalanceController#load.
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
GasBalanceControllerLoadMatch = Struct.new(
  :end,
  :start,
  keyword_init: true
)

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
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
GasSystemLoadMatch = Struct.new(
  :end,
  :start,
  keyword_init: true
)

# GasSystemController entity data model.
class GasSystemController
end

# Request payload for GasSystemController#load.
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] field
#   @return [Array, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
GasSystemControllerLoadMatch = Struct.new(
  :end,
  :field,
  :start,
  keyword_init: true
)

# GasTrade entity data model.
class GasTrade
end

# Request payload for GasTrade#load.
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
GasTradeLoadMatch = Struct.new(
  :end,
  :start,
  keyword_init: true
)

# GasTradeController entity data model.
class GasTradeController
end

# Request payload for GasTradeController#load.
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] field
#   @return [Array, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
GasTradeControllerLoadMatch = Struct.new(
  :end,
  :field,
  :start,
  keyword_init: true
)

# GasTransmissionController entity data model.
class GasTransmissionController
end

# Request payload for GasTransmissionController#load.
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
GasTransmissionControllerLoadMatch = Struct.new(
  :end,
  :start,
  keyword_init: true
)

# GreenController entity data model.
class GreenController
end

# Request payload for GreenController#load.
#
# @!attribute [rw] fuel
#   @return [String, nil]
#
# @!attribute [rw] technology
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
GreenControllerLoadMatch = Struct.new(
  :fuel,
  :technology,
  :type,
  keyword_init: true
)

# Interruptible entity data model.
class Interruptible
end

# Request payload for Interruptible#load.
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
InterruptibleLoadMatch = Struct.new(
  :end,
  :start,
  keyword_init: true
)

# InterruptibleCapacityController entity data model.
class InterruptibleCapacityController
end

# Request payload for InterruptibleCapacityController#load.
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] field
#   @return [Array, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
InterruptibleCapacityControllerLoadMatch = Struct.new(
  :end,
  :field,
  :start,
  keyword_init: true
)

# Nomination entity data model.
class Nomination
end

# Request payload for Nomination#load.
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
NominationLoadMatch = Struct.new(
  :end,
  :start,
  keyword_init: true
)

# NominationsController entity data model.
class NominationsController
end

# Request payload for NominationsController#load.
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] field
#   @return [Array, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
NominationsControllerLoadMatch = Struct.new(
  :end,
  :field,
  :start,
  keyword_init: true
)

# NpsController entity data model.
class NpsController
end

# Request payload for NpsController#load.
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
NpsControllerLoadMatch = Struct.new(
  :end,
  :start,
  keyword_init: true
)

# Renomination entity data model.
class Renomination
end

# Request payload for Renomination#load.
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
RenominationLoadMatch = Struct.new(
  :end,
  :start,
  keyword_init: true
)

# RenominationsController entity data model.
class RenominationsController
end

# Request payload for RenominationsController#load.
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] field
#   @return [Array, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
RenominationsControllerLoadMatch = Struct.new(
  :end,
  :field,
  :start,
  keyword_init: true
)

# System entity data model.
class System
end

# Request payload for System#load.
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
SystemLoadMatch = Struct.new(
  :end,
  :start,
  keyword_init: true
)

# SystemController entity data model.
class SystemController
end

# Request payload for SystemController#load.
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] field
#   @return [Array, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
SystemControllerLoadMatch = Struct.new(
  :end,
  :field,
  :start,
  keyword_init: true
)

# TransmissionController entity data model.
class TransmissionController
end

# Request payload for TransmissionController#load.
#
# @!attribute [rw] group
#   @return [String]
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
TransmissionControllerLoadMatch = Struct.new(
  :group,
  :end,
  :start,
  keyword_init: true
)

# UmmGasController entity data model.
class UmmGasController
end

# Request payload for UmmGasController#load.
#
# @!attribute [rw] id
#   @return [Integer]
UmmGasControllerLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# UmmRssFeedController entity data model.
class UmmRssFeedController
end

# Request payload for UmmRssFeedController#load.
class UmmRssFeedControllerLoadMatch
end

