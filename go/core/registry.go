package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBalanceEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewBalanceControllerEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewFirmEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewFirmCapacityControllerEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewGasBalanceControllerEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewGasBorderTradeControllerEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewGasSystemEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewGasSystemControllerEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewGasTradeEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewGasTradeControllerEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewGasTransmissionControllerEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewGreenControllerEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewInterruptibleEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewInterruptibleCapacityControllerEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewNominationEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewNominationsControllerEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewNpsControllerEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewRenominationEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewRenominationsControllerEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewSystemEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewSystemControllerEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewTransmissionControllerEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewUmmGasControllerEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

var NewUmmRssFeedControllerEntityFunc func(client *EleringDashboardSDK, entopts map[string]any) EleringDashboardEntity

