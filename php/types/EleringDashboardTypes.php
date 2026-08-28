<?php
declare(strict_types=1);

// Typed models for the EleringDashboard SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Balance entity data model. */
class Balance
{
}

/** Request payload for Balance#load. */
class BalanceLoadMatch
{
    public ?string $end = null;
    public ?string $start = null;
}

/** BalanceController entity data model. */
class BalanceController
{
}

/** Request payload for BalanceController#load. */
class BalanceControllerLoadMatch
{
    public ?string $end = null;
    public ?array $field = null;
    public ?string $start = null;
}

/** Firm entity data model. */
class Firm
{
}

/** Request payload for Firm#load. */
class FirmLoadMatch
{
    public ?string $end = null;
    public ?string $start = null;
}

/** FirmCapacityController entity data model. */
class FirmCapacityController
{
}

/** Request payload for FirmCapacityController#load. */
class FirmCapacityControllerLoadMatch
{
    public ?string $end = null;
    public ?array $field = null;
    public ?string $start = null;
}

/** GasBalanceController entity data model. */
class GasBalanceController
{
}

/** Request payload for GasBalanceController#load. */
class GasBalanceControllerLoadMatch
{
    public ?string $end = null;
    public ?string $start = null;
}

/** GasBorderTradeController entity data model. */
class GasBorderTradeController
{
}

/** Request payload for GasBorderTradeController#load. */
class GasBorderTradeControllerLoadMatch
{
}

/** GasSystem entity data model. */
class GasSystem
{
}

/** Request payload for GasSystem#load. */
class GasSystemLoadMatch
{
    public ?string $end = null;
    public ?string $start = null;
}

/** GasSystemController entity data model. */
class GasSystemController
{
}

/** Request payload for GasSystemController#load. */
class GasSystemControllerLoadMatch
{
    public ?string $end = null;
    public ?array $field = null;
    public ?string $start = null;
}

/** GasTrade entity data model. */
class GasTrade
{
}

/** Request payload for GasTrade#load. */
class GasTradeLoadMatch
{
    public ?string $end = null;
    public ?string $start = null;
}

/** GasTradeController entity data model. */
class GasTradeController
{
}

/** Request payload for GasTradeController#load. */
class GasTradeControllerLoadMatch
{
    public ?string $end = null;
    public ?array $field = null;
    public ?string $start = null;
}

/** GasTransmissionController entity data model. */
class GasTransmissionController
{
}

/** Request payload for GasTransmissionController#load. */
class GasTransmissionControllerLoadMatch
{
    public ?string $end = null;
    public ?string $start = null;
}

/** GreenController entity data model. */
class GreenController
{
}

/** Request payload for GreenController#load. */
class GreenControllerLoadMatch
{
    public ?string $fuel = null;
    public ?string $technology = null;
    public ?string $type = null;
}

/** Interruptible entity data model. */
class Interruptible
{
}

/** Request payload for Interruptible#load. */
class InterruptibleLoadMatch
{
    public ?string $end = null;
    public ?string $start = null;
}

/** InterruptibleCapacityController entity data model. */
class InterruptibleCapacityController
{
}

/** Request payload for InterruptibleCapacityController#load. */
class InterruptibleCapacityControllerLoadMatch
{
    public ?string $end = null;
    public ?array $field = null;
    public ?string $start = null;
}

/** Nomination entity data model. */
class Nomination
{
}

/** Request payload for Nomination#load. */
class NominationLoadMatch
{
    public ?string $end = null;
    public ?string $start = null;
}

/** NominationsController entity data model. */
class NominationsController
{
}

/** Request payload for NominationsController#load. */
class NominationsControllerLoadMatch
{
    public ?string $end = null;
    public ?array $field = null;
    public ?string $start = null;
}

/** NpsController entity data model. */
class NpsController
{
}

/** Request payload for NpsController#load. */
class NpsControllerLoadMatch
{
    public ?string $end = null;
    public ?string $start = null;
}

/** Renomination entity data model. */
class Renomination
{
}

/** Request payload for Renomination#load. */
class RenominationLoadMatch
{
    public ?string $end = null;
    public ?string $start = null;
}

/** RenominationsController entity data model. */
class RenominationsController
{
}

/** Request payload for RenominationsController#load. */
class RenominationsControllerLoadMatch
{
    public ?string $end = null;
    public ?array $field = null;
    public ?string $start = null;
}

/** System entity data model. */
class System
{
}

/** Request payload for System#load. */
class SystemLoadMatch
{
    public ?string $end = null;
    public ?string $start = null;
}

/** SystemController entity data model. */
class SystemController
{
}

/** Request payload for SystemController#load. */
class SystemControllerLoadMatch
{
    public ?string $end = null;
    public ?array $field = null;
    public ?string $start = null;
}

/** TransmissionController entity data model. */
class TransmissionController
{
}

/** Request payload for TransmissionController#load. */
class TransmissionControllerLoadMatch
{
    public string $group;
    public ?string $end = null;
    public ?string $start = null;
}

/** UmmGasController entity data model. */
class UmmGasController
{
}

/** Request payload for UmmGasController#load. */
class UmmGasControllerLoadMatch
{
    public int $id;
}

/** UmmRssFeedController entity data model. */
class UmmRssFeedController
{
}

/** Request payload for UmmRssFeedController#load. */
class UmmRssFeedControllerLoadMatch
{
}

