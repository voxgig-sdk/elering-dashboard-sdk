-- Typed models for the EleringDashboard SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Balance

---@class BalanceLoadMatch
---@field end? string
---@field start? string

---@class BalanceController

---@class BalanceControllerLoadMatch
---@field end? string
---@field field? table
---@field start? string

---@class Firm

---@class FirmLoadMatch
---@field end? string
---@field start? string

---@class FirmCapacityController

---@class FirmCapacityControllerLoadMatch
---@field end? string
---@field field? table
---@field start? string

---@class GasBalanceController

---@class GasBalanceControllerLoadMatch
---@field end? string
---@field start? string

---@class GasBorderTradeController

---@class GasBorderTradeControllerLoadMatch

---@class GasSystem

---@class GasSystemLoadMatch
---@field end? string
---@field start? string

---@class GasSystemController

---@class GasSystemControllerLoadMatch
---@field end? string
---@field field? table
---@field start? string

---@class GasTrade

---@class GasTradeLoadMatch
---@field end? string
---@field start? string

---@class GasTradeController

---@class GasTradeControllerLoadMatch
---@field end? string
---@field field? table
---@field start? string

---@class GasTransmissionController

---@class GasTransmissionControllerLoadMatch
---@field end? string
---@field start? string

---@class GreenController

---@class GreenControllerLoadMatch
---@field fuel? string
---@field technology? string
---@field type? string

---@class Interruptible

---@class InterruptibleLoadMatch
---@field end? string
---@field start? string

---@class InterruptibleCapacityController

---@class InterruptibleCapacityControllerLoadMatch
---@field end? string
---@field field? table
---@field start? string

---@class Nomination

---@class NominationLoadMatch
---@field end? string
---@field start? string

---@class NominationsController

---@class NominationsControllerLoadMatch
---@field end? string
---@field field? table
---@field start? string

---@class NpsController

---@class NpsControllerLoadMatch
---@field end? string
---@field start? string

---@class Renomination

---@class RenominationLoadMatch
---@field end? string
---@field start? string

---@class RenominationsController

---@class RenominationsControllerLoadMatch
---@field end? string
---@field field? table
---@field start? string

---@class System

---@class SystemLoadMatch
---@field end? string
---@field start? string

---@class SystemController

---@class SystemControllerLoadMatch
---@field end? string
---@field field? table
---@field start? string

---@class TransmissionController

---@class TransmissionControllerLoadMatch
---@field group string
---@field end? string
---@field start? string

---@class UmmGasController

---@class UmmGasControllerLoadMatch
---@field id number

---@class UmmRssFeedController

---@class UmmRssFeedControllerLoadMatch

local M = {}

return M
