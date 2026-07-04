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

// BalanceLoadMatch mirrors the balance fields as an all-optional match
// filter (Go analog of Partial<Balance>).
type BalanceLoadMatch struct {
}

// BalanceController is the typed data model for the balance_controller entity.
type BalanceController struct {
}

// BalanceControllerLoadMatch mirrors the balance_controller fields as an all-optional match
// filter (Go analog of Partial<BalanceController>).
type BalanceControllerLoadMatch struct {
}

// Firm is the typed data model for the firm entity.
type Firm struct {
}

// FirmLoadMatch mirrors the firm fields as an all-optional match
// filter (Go analog of Partial<Firm>).
type FirmLoadMatch struct {
}

// FirmCapacityController is the typed data model for the firm_capacity_controller entity.
type FirmCapacityController struct {
}

// FirmCapacityControllerLoadMatch mirrors the firm_capacity_controller fields as an all-optional match
// filter (Go analog of Partial<FirmCapacityController>).
type FirmCapacityControllerLoadMatch struct {
}

// GasBalanceController is the typed data model for the gas_balance_controller entity.
type GasBalanceController struct {
}

// GasBalanceControllerLoadMatch mirrors the gas_balance_controller fields as an all-optional match
// filter (Go analog of Partial<GasBalanceController>).
type GasBalanceControllerLoadMatch struct {
}

// GasBorderTradeController is the typed data model for the gas_border_trade_controller entity.
type GasBorderTradeController struct {
}

// GasBorderTradeControllerLoadMatch mirrors the gas_border_trade_controller fields as an all-optional match
// filter (Go analog of Partial<GasBorderTradeController>).
type GasBorderTradeControllerLoadMatch struct {
}

// GasSystem is the typed data model for the gas_system entity.
type GasSystem struct {
}

// GasSystemLoadMatch mirrors the gas_system fields as an all-optional match
// filter (Go analog of Partial<GasSystem>).
type GasSystemLoadMatch struct {
}

// GasSystemController is the typed data model for the gas_system_controller entity.
type GasSystemController struct {
}

// GasSystemControllerLoadMatch mirrors the gas_system_controller fields as an all-optional match
// filter (Go analog of Partial<GasSystemController>).
type GasSystemControllerLoadMatch struct {
}

// GasTrade is the typed data model for the gas_trade entity.
type GasTrade struct {
}

// GasTradeLoadMatch mirrors the gas_trade fields as an all-optional match
// filter (Go analog of Partial<GasTrade>).
type GasTradeLoadMatch struct {
}

// GasTradeController is the typed data model for the gas_trade_controller entity.
type GasTradeController struct {
}

// GasTradeControllerLoadMatch is the typed request payload for GasTradeController.LoadTyped.
type GasTradeControllerLoadMatch struct {
	Group string `json:"group"`
}

// GasTransmissionController is the typed data model for the gas_transmission_controller entity.
type GasTransmissionController struct {
}

// GasTransmissionControllerLoadMatch mirrors the gas_transmission_controller fields as an all-optional match
// filter (Go analog of Partial<GasTransmissionController>).
type GasTransmissionControllerLoadMatch struct {
}

// GreenController is the typed data model for the green_controller entity.
type GreenController struct {
}

// GreenControllerLoadMatch mirrors the green_controller fields as an all-optional match
// filter (Go analog of Partial<GreenController>).
type GreenControllerLoadMatch struct {
}

// Interruptible is the typed data model for the interruptible entity.
type Interruptible struct {
}

// InterruptibleLoadMatch mirrors the interruptible fields as an all-optional match
// filter (Go analog of Partial<Interruptible>).
type InterruptibleLoadMatch struct {
}

// InterruptibleCapacityController is the typed data model for the interruptible_capacity_controller entity.
type InterruptibleCapacityController struct {
}

// InterruptibleCapacityControllerLoadMatch mirrors the interruptible_capacity_controller fields as an all-optional match
// filter (Go analog of Partial<InterruptibleCapacityController>).
type InterruptibleCapacityControllerLoadMatch struct {
}

// Nomination is the typed data model for the nomination entity.
type Nomination struct {
}

// NominationLoadMatch mirrors the nomination fields as an all-optional match
// filter (Go analog of Partial<Nomination>).
type NominationLoadMatch struct {
}

// NominationsController is the typed data model for the nominations_controller entity.
type NominationsController struct {
}

// NominationsControllerLoadMatch mirrors the nominations_controller fields as an all-optional match
// filter (Go analog of Partial<NominationsController>).
type NominationsControllerLoadMatch struct {
}

// NpsController is the typed data model for the nps_controller entity.
type NpsController struct {
}

// NpsControllerLoadMatch is the typed request payload for NpsController.LoadTyped.
type NpsControllerLoadMatch struct {
	Group string `json:"group"`
}

// Renomination is the typed data model for the renomination entity.
type Renomination struct {
}

// RenominationLoadMatch mirrors the renomination fields as an all-optional match
// filter (Go analog of Partial<Renomination>).
type RenominationLoadMatch struct {
}

// RenominationsController is the typed data model for the renominations_controller entity.
type RenominationsController struct {
}

// RenominationsControllerLoadMatch mirrors the renominations_controller fields as an all-optional match
// filter (Go analog of Partial<RenominationsController>).
type RenominationsControllerLoadMatch struct {
}

// System is the typed data model for the system entity.
type System struct {
}

// SystemLoadMatch mirrors the system fields as an all-optional match
// filter (Go analog of Partial<System>).
type SystemLoadMatch struct {
}

// SystemController is the typed data model for the system_controller entity.
type SystemController struct {
}

// SystemControllerLoadMatch mirrors the system_controller fields as an all-optional match
// filter (Go analog of Partial<SystemController>).
type SystemControllerLoadMatch struct {
}

// TransmissionController is the typed data model for the transmission_controller entity.
type TransmissionController struct {
}

// TransmissionControllerLoadMatch is the typed request payload for TransmissionController.LoadTyped.
type TransmissionControllerLoadMatch struct {
	Group string `json:"group"`
}

// UmmGasController is the typed data model for the umm_gas_controller entity.
type UmmGasController struct {
}

// UmmGasControllerLoadMatch mirrors the umm_gas_controller fields as an all-optional match
// filter (Go analog of Partial<UmmGasController>).
type UmmGasControllerLoadMatch struct {
}

// UmmRssFeedController is the typed data model for the umm_rss_feed_controller entity.
type UmmRssFeedController struct {
}

// UmmRssFeedControllerLoadMatch mirrors the umm_rss_feed_controller fields as an all-optional match
// filter (Go analog of Partial<UmmRssFeedController>).
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
