package core

import (
	"fmt"

	vs "github.com/voxgig-sdk/elering-dashboard-sdk/go/utility/struct"
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

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath([]any{"__derived__", "featureorder"}, sdk.options).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
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


// Balance returns a Balance entity bound to this client.
// Idiomatic usage: client.Balance(nil).List(nil, nil) or
// client.Balance(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) Balance(data map[string]any) EleringDashboardEntity {
	return NewBalanceEntityFunc(sdk, data)
}


// BalanceController returns a BalanceController entity bound to this client.
// Idiomatic usage: client.BalanceController(nil).List(nil, nil) or
// client.BalanceController(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) BalanceController(data map[string]any) EleringDashboardEntity {
	return NewBalanceControllerEntityFunc(sdk, data)
}


// Firm returns a Firm entity bound to this client.
// Idiomatic usage: client.Firm(nil).List(nil, nil) or
// client.Firm(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) Firm(data map[string]any) EleringDashboardEntity {
	return NewFirmEntityFunc(sdk, data)
}


// FirmCapacityController returns a FirmCapacityController entity bound to this client.
// Idiomatic usage: client.FirmCapacityController(nil).List(nil, nil) or
// client.FirmCapacityController(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) FirmCapacityController(data map[string]any) EleringDashboardEntity {
	return NewFirmCapacityControllerEntityFunc(sdk, data)
}


// GasBalanceController returns a GasBalanceController entity bound to this client.
// Idiomatic usage: client.GasBalanceController(nil).List(nil, nil) or
// client.GasBalanceController(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) GasBalanceController(data map[string]any) EleringDashboardEntity {
	return NewGasBalanceControllerEntityFunc(sdk, data)
}


// GasBorderTradeController returns a GasBorderTradeController entity bound to this client.
// Idiomatic usage: client.GasBorderTradeController(nil).List(nil, nil) or
// client.GasBorderTradeController(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) GasBorderTradeController(data map[string]any) EleringDashboardEntity {
	return NewGasBorderTradeControllerEntityFunc(sdk, data)
}


// GasSystem returns a GasSystem entity bound to this client.
// Idiomatic usage: client.GasSystem(nil).List(nil, nil) or
// client.GasSystem(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) GasSystem(data map[string]any) EleringDashboardEntity {
	return NewGasSystemEntityFunc(sdk, data)
}


// GasSystemController returns a GasSystemController entity bound to this client.
// Idiomatic usage: client.GasSystemController(nil).List(nil, nil) or
// client.GasSystemController(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) GasSystemController(data map[string]any) EleringDashboardEntity {
	return NewGasSystemControllerEntityFunc(sdk, data)
}


// GasTrade returns a GasTrade entity bound to this client.
// Idiomatic usage: client.GasTrade(nil).List(nil, nil) or
// client.GasTrade(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) GasTrade(data map[string]any) EleringDashboardEntity {
	return NewGasTradeEntityFunc(sdk, data)
}


// GasTradeController returns a GasTradeController entity bound to this client.
// Idiomatic usage: client.GasTradeController(nil).List(nil, nil) or
// client.GasTradeController(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) GasTradeController(data map[string]any) EleringDashboardEntity {
	return NewGasTradeControllerEntityFunc(sdk, data)
}


// GasTransmissionController returns a GasTransmissionController entity bound to this client.
// Idiomatic usage: client.GasTransmissionController(nil).List(nil, nil) or
// client.GasTransmissionController(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) GasTransmissionController(data map[string]any) EleringDashboardEntity {
	return NewGasTransmissionControllerEntityFunc(sdk, data)
}


// GreenController returns a GreenController entity bound to this client.
// Idiomatic usage: client.GreenController(nil).List(nil, nil) or
// client.GreenController(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) GreenController(data map[string]any) EleringDashboardEntity {
	return NewGreenControllerEntityFunc(sdk, data)
}


// Interruptible returns a Interruptible entity bound to this client.
// Idiomatic usage: client.Interruptible(nil).List(nil, nil) or
// client.Interruptible(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) Interruptible(data map[string]any) EleringDashboardEntity {
	return NewInterruptibleEntityFunc(sdk, data)
}


// InterruptibleCapacityController returns a InterruptibleCapacityController entity bound to this client.
// Idiomatic usage: client.InterruptibleCapacityController(nil).List(nil, nil) or
// client.InterruptibleCapacityController(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) InterruptibleCapacityController(data map[string]any) EleringDashboardEntity {
	return NewInterruptibleCapacityControllerEntityFunc(sdk, data)
}


// Nomination returns a Nomination entity bound to this client.
// Idiomatic usage: client.Nomination(nil).List(nil, nil) or
// client.Nomination(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) Nomination(data map[string]any) EleringDashboardEntity {
	return NewNominationEntityFunc(sdk, data)
}


// NominationsController returns a NominationsController entity bound to this client.
// Idiomatic usage: client.NominationsController(nil).List(nil, nil) or
// client.NominationsController(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) NominationsController(data map[string]any) EleringDashboardEntity {
	return NewNominationsControllerEntityFunc(sdk, data)
}


// NpsController returns a NpsController entity bound to this client.
// Idiomatic usage: client.NpsController(nil).List(nil, nil) or
// client.NpsController(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) NpsController(data map[string]any) EleringDashboardEntity {
	return NewNpsControllerEntityFunc(sdk, data)
}


// Renomination returns a Renomination entity bound to this client.
// Idiomatic usage: client.Renomination(nil).List(nil, nil) or
// client.Renomination(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) Renomination(data map[string]any) EleringDashboardEntity {
	return NewRenominationEntityFunc(sdk, data)
}


// RenominationsController returns a RenominationsController entity bound to this client.
// Idiomatic usage: client.RenominationsController(nil).List(nil, nil) or
// client.RenominationsController(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) RenominationsController(data map[string]any) EleringDashboardEntity {
	return NewRenominationsControllerEntityFunc(sdk, data)
}


// System returns a System entity bound to this client.
// Idiomatic usage: client.System(nil).List(nil, nil) or
// client.System(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) System(data map[string]any) EleringDashboardEntity {
	return NewSystemEntityFunc(sdk, data)
}


// SystemController returns a SystemController entity bound to this client.
// Idiomatic usage: client.SystemController(nil).List(nil, nil) or
// client.SystemController(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) SystemController(data map[string]any) EleringDashboardEntity {
	return NewSystemControllerEntityFunc(sdk, data)
}


// TransmissionController returns a TransmissionController entity bound to this client.
// Idiomatic usage: client.TransmissionController(nil).List(nil, nil) or
// client.TransmissionController(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) TransmissionController(data map[string]any) EleringDashboardEntity {
	return NewTransmissionControllerEntityFunc(sdk, data)
}


// UmmGasController returns a UmmGasController entity bound to this client.
// Idiomatic usage: client.UmmGasController(nil).List(nil, nil) or
// client.UmmGasController(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *EleringDashboardSDK) UmmGasController(data map[string]any) EleringDashboardEntity {
	return NewUmmGasControllerEntityFunc(sdk, data)
}


// UmmRssFeedController returns a UmmRssFeedController entity bound to this client.
// Idiomatic usage: client.UmmRssFeedController(nil).List(nil, nil) or
// client.UmmRssFeedController(nil).Load(map[string]any{"id": ...}, nil).
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
