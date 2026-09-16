package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "EleringDashboard",
			"slug": "elering-dashboard",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://dashboard.elering.ee",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"balance": map[string]any{},
				"balance_controller": map[string]any{},
				"firm": map[string]any{},
				"firm_capacity_controller": map[string]any{},
				"gas_balance_controller": map[string]any{},
				"gas_border_trade_controller": map[string]any{},
				"gas_system": map[string]any{},
				"gas_system_controller": map[string]any{},
				"gas_trade": map[string]any{},
				"gas_trade_controller": map[string]any{},
				"gas_transmission_controller": map[string]any{},
				"green_controller": map[string]any{},
				"interruptible": map[string]any{},
				"interruptible_capacity_controller": map[string]any{},
				"nomination": map[string]any{},
				"nominations_controller": map[string]any{},
				"nps_controller": map[string]any{},
				"renomination": map[string]any{},
				"renominations_controller": map[string]any{},
				"system": map[string]any{},
				"system_controller": map[string]any{},
				"transmission_controller": map[string]any{},
				"umm_gas_controller": map[string]any{},
				"umm_rss_feed_controller": map[string]any{},
			},
		},
		"entity": map[string]any{
			"balance": map[string]any{
				"fields": []any{},
				"name": "balance",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/balance",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "balance",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"balance",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"balance_controller": map[string]any{
				"fields": []any{},
				"name": "balance_controller",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/balance/commerce/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "balance",
									},
									map[string]any{
										"lit": "commerce",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"balance",
									"commerce",
									"csv",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/balance/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "balance",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"balance",
									"csv",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/balance/total/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "balance",
									},
									map[string]any{
										"lit": "total",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"balance",
									"total",
									"csv",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/balance/total",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "balance",
									},
									map[string]any{
										"lit": "total",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"balance",
									"total",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/balance/commerce",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "balance",
									},
									map[string]any{
										"lit": "commerce",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"balance",
									"commerce",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/balance/commerce/latest",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "balance",
									},
									map[string]any{
										"lit": "commerce",
									},
									map[string]any{
										"lit": "latest",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"balance",
									"commerce",
									"latest",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/balance/total/latest",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "balance",
									},
									map[string]any{
										"lit": "total",
									},
									map[string]any{
										"lit": "latest",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"balance",
									"total",
									"latest",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"firm": map[string]any{
				"fields": []any{},
				"name": "firm",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/capacity/firm",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "capacity",
									},
									map[string]any{
										"lit": "firm",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"capacity",
									"firm",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"firm_capacity_controller": map[string]any{
				"fields": []any{},
				"name": "firm_capacity_controller",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": []any{
												"[\"narva_technical_entry\"",
												"\"narva_booked_entry\"",
												"\"narva_available_entry\"",
												"\"varska_technical_entry\"",
												"\"varska_booked_entry\"",
												"\"varska_available_entry\"",
												"\"varska_technical_exit\"",
												"\"varska_booked_exit\"",
												"\"varska_available_exit\"",
												"\"balticconnector_technical_entry\"",
												"\"balticconnector_booked_entry\"",
												"\"balticconnector_available_entry\"",
												"\"balticconnector_technical_exit\"",
												"\"balticconnector_booked_exit\"",
												"\"balticconnector_available_exit\"",
												"\"production_technical\"",
												"\"production_booked\"",
												"\"production_available\"]",
											},
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/capacity/firm/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "capacity",
									},
									map[string]any{
										"lit": "firm",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"capacity",
									"firm",
									"csv",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"gas_balance_controller": map[string]any{
				"fields": []any{},
				"name": "gas_balance_controller",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/gas-balance/price/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "gas-balance",
									},
									map[string]any{
										"lit": "price",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"gas-balance",
									"price",
									"csv",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/gas-balance/price",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "gas-balance",
									},
									map[string]any{
										"lit": "price",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"gas-balance",
									"price",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"gas_border_trade_controller": map[string]any{
				"fields": []any{},
				"name": "gas_border_trade_controller",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/gas/border-trade/current",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "gas",
									},
									map[string]any{
										"lit": "border-trade",
									},
									map[string]any{
										"lit": "current",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"gas",
									"border-trade",
									"current",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"gas_system": map[string]any{
				"fields": []any{},
				"name": "gas_system",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/gas-system",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "gas-system",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"gas-system",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"gas_system_controller": map[string]any{
				"fields": []any{},
				"name": "gas_system_controller",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/gas-system/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "gas-system",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"gas-system",
									"csv",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/gas-system/daily/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "gas-system",
									},
									map[string]any{
										"lit": "daily",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"gas-system",
									"daily",
									"csv",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/gas-system/m3/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "gas-system",
									},
									map[string]any{
										"lit": "m3",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"gas-system",
									"m3",
									"csv",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/gas-system/daily",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "gas-system",
									},
									map[string]any{
										"lit": "daily",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"gas-system",
									"daily",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/gas-system/daily-average",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "gas-system",
									},
									map[string]any{
										"lit": "daily-average",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"gas-system",
									"daily-average",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/gas-system/m3",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "gas-system",
									},
									map[string]any{
										"lit": "m3",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"gas-system",
									"m3",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/gas-system/latest",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "gas-system",
									},
									map[string]any{
										"lit": "latest",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"gas-system",
									"latest",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"gas_trade": map[string]any{
				"fields": []any{},
				"name": "gas_trade",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/gas-trade",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "gas-trade",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"gas-trade",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"gas_trade_controller": map[string]any{
				"fields": []any{},
				"name": "gas_trade_controller",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/gas-trade/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "gas-trade",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"gas-trade",
									"csv",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "group",
											"orig": "group",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/gas-trade/{group}/latest",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "gas-trade",
									},
									map[string]any{
										"var": "group",
									},
									map[string]any{
										"lit": "latest",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"gas-trade",
									"{group}",
									"latest",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"gas_trade",
						},
					},
				},
			},
			"gas_transmission_controller": map[string]any{
				"fields": []any{},
				"name": "gas_transmission_controller",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/gas-transmission/cross-border/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "gas-transmission",
									},
									map[string]any{
										"lit": "cross-border",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"gas-transmission",
									"cross-border",
									"csv",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/gas-transmission/cross-border",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "gas-transmission",
									},
									map[string]any{
										"lit": "cross-border",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"gas-transmission",
									"cross-border",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/gas-transmission/cross-border/latest",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "gas-transmission",
									},
									map[string]any{
										"lit": "cross-border",
									},
									map[string]any{
										"lit": "latest",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"gas-transmission",
									"cross-border",
									"latest",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"green_controller": map[string]any{
				"fields": []any{},
				"name": "green_controller",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "Kõik kütused",
											"kind": "query",
											"name": "fuel",
											"orig": "fuel",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "Kõik tehnoloogiad",
											"kind": "query",
											"name": "technology",
											"orig": "technology",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "TRANSACTION",
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/green/certificates",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "green",
									},
									map[string]any{
										"lit": "certificates",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fuel",
										"technology",
										"type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"green",
									"certificates",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"interruptible": map[string]any{
				"fields": []any{},
				"name": "interruptible",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/capacity/interruptible",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "capacity",
									},
									map[string]any{
										"lit": "interruptible",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"capacity",
									"interruptible",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"interruptible_capacity_controller": map[string]any{
				"fields": []any{},
				"name": "interruptible_capacity_controller",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/capacity/interruptible/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "capacity",
									},
									map[string]any{
										"lit": "interruptible",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"capacity",
									"interruptible",
									"csv",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"nomination": map[string]any{
				"fields": []any{},
				"name": "nomination",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/nominations",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "nominations",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"nominations",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"nominations_controller": map[string]any{
				"fields": []any{},
				"name": "nominations_controller",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/nominations/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "nominations",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"nominations",
									"csv",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"nps_controller": map[string]any{
				"fields": []any{},
				"name": "nps_controller",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/nps/price/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "nps",
									},
									map[string]any{
										"lit": "price",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"nps",
									"price",
									"csv",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/nps/turnover/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "nps",
									},
									map[string]any{
										"lit": "turnover",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"nps",
									"turnover",
									"csv",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/nps/price",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "nps",
									},
									map[string]any{
										"lit": "price",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"nps",
									"price",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/nps/turnover",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "nps",
									},
									map[string]any{
										"lit": "turnover",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"nps",
									"turnover",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "group",
											"orig": "group",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/nps/price/{group}/current",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "nps",
									},
									map[string]any{
										"lit": "price",
									},
									map[string]any{
										"var": "group",
									},
									map[string]any{
										"lit": "current",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"nps",
									"price",
									"{group}",
									"current",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "group",
											"orig": "group",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/nps/price/{group}/latest",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "nps",
									},
									map[string]any{
										"lit": "price",
									},
									map[string]any{
										"var": "group",
									},
									map[string]any{
										"lit": "latest",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"nps",
									"price",
									"{group}",
									"latest",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "group",
											"orig": "group",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/nps/turnover/{group}/latest",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "nps",
									},
									map[string]any{
										"lit": "turnover",
									},
									map[string]any{
										"var": "group",
									},
									map[string]any{
										"lit": "latest",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"nps",
									"turnover",
									"{group}",
									"latest",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"price",
						},
						[]any{
							"turnover",
						},
					},
				},
			},
			"renomination": map[string]any{
				"fields": []any{},
				"name": "renomination",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/nominations/renominations",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "nominations",
									},
									map[string]any{
										"lit": "renominations",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"nominations",
									"renominations",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"renominations_controller": map[string]any{
				"fields": []any{},
				"name": "renominations_controller",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/nominations/renominations/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "nominations",
									},
									map[string]any{
										"lit": "renominations",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"nominations",
									"renominations",
									"csv",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"system": map[string]any{
				"fields": []any{},
				"name": "system",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/system",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "system",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"system",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"system_controller": map[string]any{
				"fields": []any{},
				"name": "system_controller",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/system/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "system",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"system",
									"csv",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/system/with-plan/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "system",
									},
									map[string]any{
										"lit": "with-plan",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"system",
									"with-plan",
									"csv",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/system/with-plan",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "system",
									},
									map[string]any{
										"lit": "with-plan",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"system",
									"with-plan",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/system/latest",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "system",
									},
									map[string]any{
										"lit": "latest",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"system",
									"latest",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"transmission_controller": map[string]any{
				"fields": []any{},
				"name": "transmission_controller",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "group",
											"orig": "group",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/transmission/cross-border-capacity/{group}/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "transmission",
									},
									map[string]any{
										"lit": "cross-border-capacity",
									},
									map[string]any{
										"var": "group",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"group",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"transmission",
									"cross-border-capacity",
									"{group}",
									"csv",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/transmission/cross-border-planned-trade/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "transmission",
									},
									map[string]any{
										"lit": "cross-border-planned-trade",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"transmission",
									"cross-border-planned-trade",
									"csv",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/transmission/cross-border/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "transmission",
									},
									map[string]any{
										"lit": "cross-border",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"transmission",
									"cross-border",
									"csv",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/transmission/cross-border/hourly/csv",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "transmission",
									},
									map[string]any{
										"lit": "cross-border",
									},
									map[string]any{
										"lit": "hourly",
									},
									map[string]any{
										"lit": "csv",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"transmission",
									"cross-border",
									"hourly",
									"csv",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "group",
											"orig": "group",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/transmission/cross-border-capacity/{group}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "transmission",
									},
									map[string]any{
										"lit": "cross-border-capacity",
									},
									map[string]any{
										"var": "group",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"group",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"transmission",
									"cross-border-capacity",
									"{group}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/transmission/cross-border",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "transmission",
									},
									map[string]any{
										"lit": "cross-border",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"transmission",
									"cross-border",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/transmission/cross-border-capacity",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "transmission",
									},
									map[string]any{
										"lit": "cross-border-capacity",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"transmission",
									"cross-border-capacity",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/transmission/cross-border-planned-trade",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "transmission",
									},
									map[string]any{
										"lit": "cross-border-planned-trade",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"transmission",
									"cross-border-planned-trade",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/transmission/cross-border/hourly",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "transmission",
									},
									map[string]any{
										"lit": "cross-border",
									},
									map[string]any{
										"lit": "hourly",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"transmission",
									"cross-border",
									"hourly",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/transmission/cross-border-planned-trade/latest",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "transmission",
									},
									map[string]any{
										"lit": "cross-border-planned-trade",
									},
									map[string]any{
										"lit": "latest",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"transmission",
									"cross-border-planned-trade",
									"latest",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/transmission/cross-border/latest",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "transmission",
									},
									map[string]any{
										"lit": "cross-border",
									},
									map[string]any{
										"lit": "latest",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"transmission",
									"cross-border",
									"latest",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"cross_border_capacity",
						},
					},
				},
			},
			"umm_gas_controller": map[string]any{
				"fields": []any{},
				"name": "umm_gas_controller",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "affected_asset_name",
											"orig": "affected_asset_name",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "event_duration_date_time_end",
											"orig": "event_duration_date_time_end",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "event_duration_date_time_start",
											"orig": "event_duration_date_time_start",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "event_status",
											"orig": "event_status",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "event_type",
											"orig": "event_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "publication_datetime_start",
											"orig": "publication_datetime_start",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "publicationDateTimeDesc",
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "current",
											"kind": "query",
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "unavailability_type",
											"orig": "unavailability_type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/umm/gas",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "umm",
									},
									map[string]any{
										"lit": "gas",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"affected_asset_name",
										"event_duration_date_time_end",
										"event_duration_date_time_start",
										"event_status",
										"event_type",
										"page",
										"publication_datetime_start",
										"sort",
										"status",
										"unavailability_type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"umm",
									"gas",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/umm/gas/messages",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "umm",
									},
									map[string]any{
										"lit": "gas",
									},
									map[string]any{
										"lit": "messages",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"umm",
									"gas",
									"messages",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/umm/single/{id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "umm",
									},
									map[string]any{
										"lit": "single",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"umm",
									"single",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"umm_rss_feed_controller": map[string]any{
				"fields": []any{},
				"name": "umm_rss_feed_controller",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/umm/gas/rss",
								"segments": []any{
									map[string]any{
										"lit": "umm",
									},
									map[string]any{
										"lit": "gas",
									},
									map[string]any{
										"lit": "rss",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"umm",
									"gas",
									"rss",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/umm/gas/rss/aris",
								"segments": []any{
									map[string]any{
										"lit": "umm",
									},
									map[string]any{
										"lit": "gas",
									},
									map[string]any{
										"lit": "rss",
									},
									map[string]any{
										"lit": "aris",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"umm",
									"gas",
									"rss",
									"aris",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
