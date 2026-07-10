// Typed models for the EleringDashboard SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Balance is the typed data model for the balance entity.
type Balance struct {
}

// BalanceLoadMatch is the typed request payload for Balance.LoadTyped.
type BalanceLoadMatch struct {
}

// BalanceController is the typed data model for the balance_controller entity.
type BalanceController struct {
}

// BalanceControllerLoadMatch is the typed request payload for BalanceController.LoadTyped.
type BalanceControllerLoadMatch struct {
}

// Firm is the typed data model for the firm entity.
type Firm struct {
}

// FirmLoadMatch is the typed request payload for Firm.LoadTyped.
type FirmLoadMatch struct {
}

// FirmCapacityController is the typed data model for the firm_capacity_controller entity.
type FirmCapacityController struct {
}

// FirmCapacityControllerLoadMatch is the typed request payload for FirmCapacityController.LoadTyped.
type FirmCapacityControllerLoadMatch struct {
}

// GasBalanceController is the typed data model for the gas_balance_controller entity.
type GasBalanceController struct {
}

// GasBalanceControllerLoadMatch is the typed request payload for GasBalanceController.LoadTyped.
type GasBalanceControllerLoadMatch struct {
}

// GasBorderTradeController is the typed data model for the gas_border_trade_controller entity.
type GasBorderTradeController struct {
}

// GasBorderTradeControllerLoadMatch is the typed request payload for GasBorderTradeController.LoadTyped.
type GasBorderTradeControllerLoadMatch struct {
}

// GasSystem is the typed data model for the gas_system entity.
type GasSystem struct {
}

// GasSystemLoadMatch is the typed request payload for GasSystem.LoadTyped.
type GasSystemLoadMatch struct {
}

// GasSystemController is the typed data model for the gas_system_controller entity.
type GasSystemController struct {
}

// GasSystemControllerLoadMatch is the typed request payload for GasSystemController.LoadTyped.
type GasSystemControllerLoadMatch struct {
}

// GasTrade is the typed data model for the gas_trade entity.
type GasTrade struct {
}

// GasTradeLoadMatch is the typed request payload for GasTrade.LoadTyped.
type GasTradeLoadMatch struct {
}

// GasTradeController is the typed data model for the gas_trade_controller entity.
type GasTradeController struct {
}

// GasTradeControllerLoadMatch is the typed request payload for GasTradeController.LoadTyped.
type GasTradeControllerLoadMatch struct {
	Group *string `json:"group,omitempty"`
}

// GasTransmissionController is the typed data model for the gas_transmission_controller entity.
type GasTransmissionController struct {
}

// GasTransmissionControllerLoadMatch is the typed request payload for GasTransmissionController.LoadTyped.
type GasTransmissionControllerLoadMatch struct {
}

// GreenController is the typed data model for the green_controller entity.
type GreenController struct {
}

// GreenControllerLoadMatch is the typed request payload for GreenController.LoadTyped.
type GreenControllerLoadMatch struct {
}

// Interruptible is the typed data model for the interruptible entity.
type Interruptible struct {
}

// InterruptibleLoadMatch is the typed request payload for Interruptible.LoadTyped.
type InterruptibleLoadMatch struct {
}

// InterruptibleCapacityController is the typed data model for the interruptible_capacity_controller entity.
type InterruptibleCapacityController struct {
}

// InterruptibleCapacityControllerLoadMatch is the typed request payload for InterruptibleCapacityController.LoadTyped.
type InterruptibleCapacityControllerLoadMatch struct {
}

// Nomination is the typed data model for the nomination entity.
type Nomination struct {
}

// NominationLoadMatch is the typed request payload for Nomination.LoadTyped.
type NominationLoadMatch struct {
}

// NominationsController is the typed data model for the nominations_controller entity.
type NominationsController struct {
}

// NominationsControllerLoadMatch is the typed request payload for NominationsController.LoadTyped.
type NominationsControllerLoadMatch struct {
}

// NpsController is the typed data model for the nps_controller entity.
type NpsController struct {
}

// NpsControllerLoadMatch is the typed request payload for NpsController.LoadTyped.
type NpsControllerLoadMatch struct {
	Group *string `json:"group,omitempty"`
}

// Renomination is the typed data model for the renomination entity.
type Renomination struct {
}

// RenominationLoadMatch is the typed request payload for Renomination.LoadTyped.
type RenominationLoadMatch struct {
}

// RenominationsController is the typed data model for the renominations_controller entity.
type RenominationsController struct {
}

// RenominationsControllerLoadMatch is the typed request payload for RenominationsController.LoadTyped.
type RenominationsControllerLoadMatch struct {
}

// System is the typed data model for the system entity.
type System struct {
}

// SystemLoadMatch is the typed request payload for System.LoadTyped.
type SystemLoadMatch struct {
}

// SystemController is the typed data model for the system_controller entity.
type SystemController struct {
}

// SystemControllerLoadMatch is the typed request payload for SystemController.LoadTyped.
type SystemControllerLoadMatch struct {
}

// TransmissionController is the typed data model for the transmission_controller entity.
type TransmissionController struct {
}

// TransmissionControllerLoadMatch is the typed request payload for TransmissionController.LoadTyped.
type TransmissionControllerLoadMatch struct {
	Group *string `json:"group,omitempty"`
}

// UmmGasController is the typed data model for the umm_gas_controller entity.
type UmmGasController struct {
}

// UmmGasControllerLoadMatch is the typed request payload for UmmGasController.LoadTyped.
type UmmGasControllerLoadMatch struct {
}

// UmmRssFeedController is the typed data model for the umm_rss_feed_controller entity.
type UmmRssFeedController struct {
}

// UmmRssFeedControllerLoadMatch is the typed request payload for UmmRssFeedController.LoadTyped.
type UmmRssFeedControllerLoadMatch struct {
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
