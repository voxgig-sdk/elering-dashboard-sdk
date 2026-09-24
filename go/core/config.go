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
								"parts": []any{
									"api",
									"balance",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
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
								"parts": []any{
									"api",
									"balance",
									"commerce",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"balance",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"balance",
									"total",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"balance",
									"total",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"balance",
									"commerce",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"balance",
									"commerce",
									"latest",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"balance",
									"total",
									"latest",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
								"parts": []any{
									"api",
									"capacity",
									"firm",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
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
								"parts": []any{
									"api",
									"capacity",
									"firm",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
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
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
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
								"parts": []any{
									"api",
									"gas-balance",
									"price",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"gas-balance",
									"price",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
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
								"parts": []any{
									"api",
									"gas",
									"border-trade",
									"current",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
								"parts": []any{
									"api",
									"gas-system",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
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
								"parts": []any{
									"api",
									"gas-system",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"gas-system",
									"daily",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"gas-system",
									"m3",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"gas-system",
									"daily",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"gas-system",
									"daily-average",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"gas-system",
									"m3",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"gas-system",
									"latest",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
								"parts": []any{
									"api",
									"gas-trade",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
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
								"parts": []any{
									"api",
									"gas-trade",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"gas-trade",
									"{group}",
									"latest",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group",
											"orig": "group",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.gas_trade",
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
								"parts": []any{
									"api",
									"gas-transmission",
									"cross-border",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"gas-transmission",
									"cross-border",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"gas-transmission",
									"cross-border",
									"latest",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
								"parts": []any{
									"api",
									"green",
									"certificates",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "fuel",
											"orig": "fuel",
											"type": "`$STRING`",
											"kind": "query",
											"example": "Kõik kütused",
										},
										map[string]any{
											"name": "technology",
											"orig": "technology",
											"type": "`$STRING`",
											"kind": "query",
											"example": "Kõik tehnoloogiad",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "TRANSACTION",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fuel",
										"technology",
										"type",
									},
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
								"parts": []any{
									"api",
									"capacity",
									"interruptible",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
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
								"parts": []any{
									"api",
									"capacity",
									"interruptible",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
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
								"parts": []any{
									"api",
									"nominations",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
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
								"parts": []any{
									"api",
									"nominations",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
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
								"parts": []any{
									"api",
									"nps",
									"price",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"nps",
									"turnover",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"nps",
									"price",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"nps",
									"turnover",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"nps",
									"price",
									"{group}",
									"current",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group",
											"orig": "group",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"nps",
									"price",
									"{group}",
									"latest",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group",
											"orig": "group",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"nps",
									"turnover",
									"{group}",
									"latest",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group",
											"orig": "group",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
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
								"parts": []any{
									"api",
									"nominations",
									"renominations",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
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
								"parts": []any{
									"api",
									"nominations",
									"renominations",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
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
								"parts": []any{
									"api",
									"system",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
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
								"parts": []any{
									"api",
									"system",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"system",
									"with-plan",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"system",
									"with-plan",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"system",
									"latest",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
								"parts": []any{
									"api",
									"transmission",
									"cross-border-capacity",
									"{group}",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group",
											"orig": "group",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
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
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"transmission",
									"cross-border-planned-trade",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"transmission",
									"cross-border",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"transmission",
									"cross-border",
									"hourly",
									"csv",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"field",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"transmission",
									"cross-border-capacity",
									"{group}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group",
											"orig": "group",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"group",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"transmission",
									"cross-border",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"transmission",
									"cross-border-capacity",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"transmission",
									"cross-border-planned-trade",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"transmission",
									"cross-border",
									"hourly",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-06-30T20:59:59.999Z",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2020-05-31T20:59:59.999Z",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"start",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"transmission",
									"cross-border-planned-trade",
									"latest",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"transmission",
									"cross-border",
									"latest",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
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
								"parts": []any{
									"api",
									"umm",
									"gas",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "affected_asset_name",
											"orig": "affected_asset_name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "event_duration_date_time_end",
											"orig": "event_duration_date_time_end",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "event_duration_date_time_start",
											"orig": "event_duration_date_time_start",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "event_status",
											"orig": "event_status",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "event_type",
											"orig": "event_type",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "publication_datetime_start",
											"orig": "publication_datetime_start",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
											"example": "publicationDateTimeDesc",
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
											"example": "current",
										},
										map[string]any{
											"name": "unavailability_type",
											"orig": "unavailability_type",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"umm",
									"gas",
									"messages",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"umm",
									"single",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
								"parts": []any{
									"umm",
									"gas",
									"rss",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
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
								"parts": []any{
									"umm",
									"gas",
									"rss",
									"aris",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
