package core

import (
	"fmt"

	vs "github.com/voxgig/struct"
)

type EleringDashboardSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewEleringDashboardSDK(options map[string]any) *EleringDashboardSDK {
	sdk := &EleringDashboardSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := MakeConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath([]any{"feature", "test", "active"}, sdk.options) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features from config.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		for _, item := range vs.Items(featureOpts) {
			fname, _ := item[0].(string)
			fopts := ToMapAny(item[1])
			if fopts != nil {
				if active, ok := fopts["active"]; ok {
					if ab, ok := active.(bool); ok && ab {
						sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *EleringDashboardSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *EleringDashboardSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *EleringDashboardSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *EleringDashboardSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

func (sdk *EleringDashboardSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					// f() returns nil on parse error in our fetcher.
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}


func (sdk *EleringDashboardSDK) Balance(data map[string]any) EleringDashboardEntity {
	return NewBalanceEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) BalanceController(data map[string]any) EleringDashboardEntity {
	return NewBalanceControllerEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) Firm(data map[string]any) EleringDashboardEntity {
	return NewFirmEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) FirmCapacityController(data map[string]any) EleringDashboardEntity {
	return NewFirmCapacityControllerEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) GasBalanceController(data map[string]any) EleringDashboardEntity {
	return NewGasBalanceControllerEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) GasBorderTradeController(data map[string]any) EleringDashboardEntity {
	return NewGasBorderTradeControllerEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) GasSystem(data map[string]any) EleringDashboardEntity {
	return NewGasSystemEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) GasSystemController(data map[string]any) EleringDashboardEntity {
	return NewGasSystemControllerEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) GasTrade(data map[string]any) EleringDashboardEntity {
	return NewGasTradeEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) GasTradeController(data map[string]any) EleringDashboardEntity {
	return NewGasTradeControllerEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) GasTransmissionController(data map[string]any) EleringDashboardEntity {
	return NewGasTransmissionControllerEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) GreenController(data map[string]any) EleringDashboardEntity {
	return NewGreenControllerEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) Interruptible(data map[string]any) EleringDashboardEntity {
	return NewInterruptibleEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) InterruptibleCapacityController(data map[string]any) EleringDashboardEntity {
	return NewInterruptibleCapacityControllerEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) Nomination(data map[string]any) EleringDashboardEntity {
	return NewNominationEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) NominationsController(data map[string]any) EleringDashboardEntity {
	return NewNominationsControllerEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) NpsController(data map[string]any) EleringDashboardEntity {
	return NewNpsControllerEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) Renomination(data map[string]any) EleringDashboardEntity {
	return NewRenominationEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) RenominationsController(data map[string]any) EleringDashboardEntity {
	return NewRenominationsControllerEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) System(data map[string]any) EleringDashboardEntity {
	return NewSystemEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) SystemController(data map[string]any) EleringDashboardEntity {
	return NewSystemControllerEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) TransmissionController(data map[string]any) EleringDashboardEntity {
	return NewTransmissionControllerEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) UmmGasController(data map[string]any) EleringDashboardEntity {
	return NewUmmGasControllerEntityFunc(sdk, data)
}


func (sdk *EleringDashboardSDK) UmmRssFeedController(data map[string]any) EleringDashboardEntity {
	return NewUmmRssFeedControllerEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *EleringDashboardSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewEleringDashboardSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
