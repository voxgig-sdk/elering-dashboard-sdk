package voxgigeleringdashboardsdk

import (
	"github.com/voxgig-sdk/elering-dashboard-sdk/core"
	"github.com/voxgig-sdk/elering-dashboard-sdk/entity"
	"github.com/voxgig-sdk/elering-dashboard-sdk/feature"
	_ "github.com/voxgig-sdk/elering-dashboard-sdk/utility"
)

// Type aliases preserve external API.
type EleringDashboardSDK = core.EleringDashboardSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type EleringDashboardEntity = core.EleringDashboardEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type EleringDashboardError = core.EleringDashboardError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBalanceEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewBalanceEntity(client, entopts)
	}
	core.NewBalanceControllerEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewBalanceControllerEntity(client, entopts)
	}
	core.NewFirmEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewFirmEntity(client, entopts)
	}
	core.NewFirmCapacityControllerEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewFirmCapacityControllerEntity(client, entopts)
	}
	core.NewGasBalanceControllerEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewGasBalanceControllerEntity(client, entopts)
	}
	core.NewGasBorderTradeControllerEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewGasBorderTradeControllerEntity(client, entopts)
	}
	core.NewGasSystemEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewGasSystemEntity(client, entopts)
	}
	core.NewGasSystemControllerEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewGasSystemControllerEntity(client, entopts)
	}
	core.NewGasTradeEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewGasTradeEntity(client, entopts)
	}
	core.NewGasTradeControllerEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewGasTradeControllerEntity(client, entopts)
	}
	core.NewGasTransmissionControllerEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewGasTransmissionControllerEntity(client, entopts)
	}
	core.NewGreenControllerEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewGreenControllerEntity(client, entopts)
	}
	core.NewInterruptibleEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewInterruptibleEntity(client, entopts)
	}
	core.NewInterruptibleCapacityControllerEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewInterruptibleCapacityControllerEntity(client, entopts)
	}
	core.NewNominationEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewNominationEntity(client, entopts)
	}
	core.NewNominationsControllerEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewNominationsControllerEntity(client, entopts)
	}
	core.NewNpsControllerEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewNpsControllerEntity(client, entopts)
	}
	core.NewRenominationEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewRenominationEntity(client, entopts)
	}
	core.NewRenominationsControllerEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewRenominationsControllerEntity(client, entopts)
	}
	core.NewSystemEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewSystemEntity(client, entopts)
	}
	core.NewSystemControllerEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewSystemControllerEntity(client, entopts)
	}
	core.NewTransmissionControllerEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewTransmissionControllerEntity(client, entopts)
	}
	core.NewUmmGasControllerEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewUmmGasControllerEntity(client, entopts)
	}
	core.NewUmmRssFeedControllerEntityFunc = func(client *core.EleringDashboardSDK, entopts map[string]any) core.EleringDashboardEntity {
		return entity.NewUmmRssFeedControllerEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewEleringDashboardSDK = core.NewEleringDashboardSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
