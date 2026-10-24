package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/jsonschema-go/jsonschema"
	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/voxgig-sdk/elering-dashboard-sdk/go"
)

// LoadArgs is what an agent sends to elering-dashboard_load.
type LoadArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: balance | balance_controller | firm | firm_capacity_controller | gas_balance_controller | gas_border_trade_controller | gas_system | gas_system_controller | gas_trade | gas_trade_controller | gas_transmission_controller | green_controller | interruptible | interruptible_capacity_controller | nomination | nominations_controller | nps_controller | renomination | renominations_controller | system | system_controller | transmission_controller | umm_gas_controller | umm_rss_feed_controller"`
	Query  map[string]any `json:"query" jsonschema:"match map naming the record, such as {\"id\":1}"`
}

func registerTools(server *mcp.Server, client *sdk.EleringDashboardSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name:        "elering-dashboard_load",
		Description: "Load one record from EleringDashboard. Args: entity, query (match map naming the record, such as {\"id\":1}). Returns the record as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[LoadArgs]("balance", "balance_controller", "firm", "firm_capacity_controller", "gas_balance_controller", "gas_border_trade_controller", "gas_system", "gas_system_controller", "gas_trade", "gas_trade_controller", "gas_transmission_controller", "green_controller", "interruptible", "interruptible_capacity_controller", "nomination", "nominations_controller", "nps_controller", "renomination", "renominations_controller", "system", "system_controller", "transmission_controller", "umm_gas_controller", "umm_rss_feed_controller"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args LoadArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "load", args.Entity, args.Query)
	})
}

// entitySchema is the schema inferred from In, its entity limited to the
// entities the tool serves.
func entitySchema[In any](names ...string) *jsonschema.Schema {
	schema, err := jsonschema.For[In](nil)
	if err != nil {
		panic(err)
	}
	enum := make([]any, len(names))
	for i, name := range names {
		enum[i] = name
	}
	schema.Properties["entity"].Enum = enum
	return schema
}

func runOp(_ context.Context, client *sdk.EleringDashboardSDK, op string, entity string, input map[string]any) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(input, nil)
	case "load":
		result, err = ent.Load(input, nil)
	case "create":
		result, err = ent.Create(input, nil)
	case "update":
		result, err = ent.Update(input, nil)
	case "patch":
		result, err = ent.Patch(input, nil)
	case "remove":
		result, err = ent.Remove(input, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.EleringDashboardSDK, name string) (sdk.EleringDashboardEntity, error) {
	switch strings.ToLower(name) {
	case "balance":
		return client.Balance(nil), nil
	case "balance_controller":
		return client.BalanceController(nil), nil
	case "firm":
		return client.Firm(nil), nil
	case "firm_capacity_controller":
		return client.FirmCapacityController(nil), nil
	case "gas_balance_controller":
		return client.GasBalanceController(nil), nil
	case "gas_border_trade_controller":
		return client.GasBorderTradeController(nil), nil
	case "gas_system":
		return client.GasSystem(nil), nil
	case "gas_system_controller":
		return client.GasSystemController(nil), nil
	case "gas_trade":
		return client.GasTrade(nil), nil
	case "gas_trade_controller":
		return client.GasTradeController(nil), nil
	case "gas_transmission_controller":
		return client.GasTransmissionController(nil), nil
	case "green_controller":
		return client.GreenController(nil), nil
	case "interruptible":
		return client.Interruptible(nil), nil
	case "interruptible_capacity_controller":
		return client.InterruptibleCapacityController(nil), nil
	case "nomination":
		return client.Nomination(nil), nil
	case "nominations_controller":
		return client.NominationsController(nil), nil
	case "nps_controller":
		return client.NpsController(nil), nil
	case "renomination":
		return client.Renomination(nil), nil
	case "renominations_controller":
		return client.RenominationsController(nil), nil
	case "system":
		return client.System(nil), nil
	case "system_controller":
		return client.SystemController(nil), nil
	case "transmission_controller":
		return client.TransmissionController(nil), nil
	case "umm_gas_controller":
		return client.UmmGasController(nil), nil
	case "umm_rss_feed_controller":
		return client.UmmRssFeedController(nil), nil
	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}

// hint is an MCP annotation that defaults to true unless stated.
func hint(b bool) *bool {
	return &b
}
