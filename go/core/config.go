package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "EleringDashboard",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://dashboard.elering.ee",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/balance",
								"parts": []any{
									"api",
									"balance",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/balance/commerce/csv",
								"parts": []any{
									"api",
									"balance",
									"commerce",
									"csv",
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
								"active": true,
								"index$": 0,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/balance/csv",
								"parts": []any{
									"api",
									"balance",
									"csv",
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
								"active": true,
								"index$": 1,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/balance/total/csv",
								"parts": []any{
									"api",
									"balance",
									"total",
									"csv",
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
								"active": true,
								"index$": 2,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/balance/total",
								"parts": []any{
									"api",
									"balance",
									"total",
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
								"active": true,
								"index$": 3,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/balance/commerce",
								"parts": []any{
									"api",
									"balance",
									"commerce",
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
								"active": true,
								"index$": 4,
							},
							map[string]any{
								"method": "GET",
								"orig": "/api/balance/commerce/latest",
								"parts": []any{
									"api",
									"balance",
									"commerce",
									"latest",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 5,
							},
							map[string]any{
								"method": "GET",
								"orig": "/api/balance/total/latest",
								"parts": []any{
									"api",
									"balance",
									"total",
									"latest",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 6,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/capacity/firm",
								"parts": []any{
									"api",
									"capacity",
									"firm",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
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
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/capacity/firm/csv",
								"parts": []any{
									"api",
									"capacity",
									"firm",
									"csv",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/gas-balance/price/csv",
								"parts": []any{
									"api",
									"gas-balance",
									"price",
									"csv",
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
								"active": true,
								"index$": 0,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/gas-balance/price",
								"parts": []any{
									"api",
									"gas-balance",
									"price",
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
								"active": true,
								"index$": 1,
							},
						},
						"input": "data",
						"key$": "load",
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
						"name": "load",
						"points": []any{
							map[string]any{
								"method": "GET",
								"orig": "/api/gas/border-trade/current",
								"parts": []any{
									"api",
									"gas",
									"border-trade",
									"current",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/gas-system",
								"parts": []any{
									"api",
									"gas-system",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/gas-system/csv",
								"parts": []any{
									"api",
									"gas-system",
									"csv",
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
								"active": true,
								"index$": 0,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/gas-system/daily/csv",
								"parts": []any{
									"api",
									"gas-system",
									"daily",
									"csv",
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
								"active": true,
								"index$": 1,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/gas-system/m3/csv",
								"parts": []any{
									"api",
									"gas-system",
									"m3",
									"csv",
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
								"active": true,
								"index$": 2,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/gas-system/daily",
								"parts": []any{
									"api",
									"gas-system",
									"daily",
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
								"active": true,
								"index$": 3,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/gas-system/daily-average",
								"parts": []any{
									"api",
									"gas-system",
									"daily-average",
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
								"active": true,
								"index$": 4,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/gas-system/m3",
								"parts": []any{
									"api",
									"gas-system",
									"m3",
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
								"active": true,
								"index$": 5,
							},
							map[string]any{
								"method": "GET",
								"orig": "/api/gas-system/latest",
								"parts": []any{
									"api",
									"gas-system",
									"latest",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 6,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/gas-trade",
								"parts": []any{
									"api",
									"gas-trade",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/gas-trade/csv",
								"parts": []any{
									"api",
									"gas-trade",
									"csv",
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
								"active": true,
								"index$": 0,
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
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/gas-trade/{group}/latest",
								"parts": []any{
									"api",
									"gas-trade",
									"{group}",
									"latest",
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
								"active": true,
								"index$": 1,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/gas-transmission/cross-border/csv",
								"parts": []any{
									"api",
									"gas-transmission",
									"cross-border",
									"csv",
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
								"active": true,
								"index$": 0,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/gas-transmission/cross-border",
								"parts": []any{
									"api",
									"gas-transmission",
									"cross-border",
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
								"active": true,
								"index$": 1,
							},
							map[string]any{
								"method": "GET",
								"orig": "/api/gas-transmission/cross-border/latest",
								"parts": []any{
									"api",
									"gas-transmission",
									"cross-border",
									"latest",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 2,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "Kõik tehnoloogiad",
											"kind": "query",
											"name": "technology",
											"orig": "technology",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "TRANSACTION",
											"kind": "query",
											"name": "type",
											"orig": "type",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/green/certificates",
								"parts": []any{
									"api",
									"green",
									"certificates",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/capacity/interruptible",
								"parts": []any{
									"api",
									"capacity",
									"interruptible",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/capacity/interruptible/csv",
								"parts": []any{
									"api",
									"capacity",
									"interruptible",
									"csv",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/nominations",
								"parts": []any{
									"api",
									"nominations",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/nominations/csv",
								"parts": []any{
									"api",
									"nominations",
									"csv",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/nps/price/csv",
								"parts": []any{
									"api",
									"nps",
									"price",
									"csv",
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
								"active": true,
								"index$": 0,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/nps/turnover/csv",
								"parts": []any{
									"api",
									"nps",
									"turnover",
									"csv",
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
								"active": true,
								"index$": 1,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/nps/price",
								"parts": []any{
									"api",
									"nps",
									"price",
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
								"active": true,
								"index$": 2,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/nps/turnover",
								"parts": []any{
									"api",
									"nps",
									"turnover",
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
								"active": true,
								"index$": 3,
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
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/nps/price/{group}/current",
								"parts": []any{
									"api",
									"nps",
									"price",
									"{group}",
									"current",
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
								"active": true,
								"index$": 4,
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
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/nps/price/{group}/latest",
								"parts": []any{
									"api",
									"nps",
									"price",
									"{group}",
									"latest",
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
								"active": true,
								"index$": 5,
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
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/nps/turnover/{group}/latest",
								"parts": []any{
									"api",
									"nps",
									"turnover",
									"{group}",
									"latest",
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
								"active": true,
								"index$": 6,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/nominations/renominations",
								"parts": []any{
									"api",
									"nominations",
									"renominations",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/nominations/renominations/csv",
								"parts": []any{
									"api",
									"nominations",
									"renominations",
									"csv",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/system",
								"parts": []any{
									"api",
									"system",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/system/csv",
								"parts": []any{
									"api",
									"system",
									"csv",
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
								"active": true,
								"index$": 0,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/system/with-plan/csv",
								"parts": []any{
									"api",
									"system",
									"with-plan",
									"csv",
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
								"active": true,
								"index$": 1,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/system/with-plan",
								"parts": []any{
									"api",
									"system",
									"with-plan",
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
								"active": true,
								"index$": 2,
							},
							map[string]any{
								"method": "GET",
								"orig": "/api/system/latest",
								"parts": []any{
									"api",
									"system",
									"latest",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 3,
							},
						},
						"input": "data",
						"key$": "load",
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/transmission/cross-border-capacity/{group}/csv",
								"parts": []any{
									"api",
									"transmission",
									"cross-border-capacity",
									"{group}",
									"csv",
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
								"active": true,
								"index$": 0,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/transmission/cross-border-planned-trade/csv",
								"parts": []any{
									"api",
									"transmission",
									"cross-border-planned-trade",
									"csv",
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
								"active": true,
								"index$": 1,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/transmission/cross-border/csv",
								"parts": []any{
									"api",
									"transmission",
									"cross-border",
									"csv",
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
								"active": true,
								"index$": 2,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "field",
											"orig": "field",
											"reqd": false,
											"type": "`$ARRAY`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/transmission/cross-border/hourly/csv",
								"parts": []any{
									"api",
									"transmission",
									"cross-border",
									"hourly",
									"csv",
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
								"active": true,
								"index$": 3,
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/transmission/cross-border-capacity/{group}",
								"parts": []any{
									"api",
									"transmission",
									"cross-border-capacity",
									"{group}",
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
								"active": true,
								"index$": 4,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/transmission/cross-border",
								"parts": []any{
									"api",
									"transmission",
									"cross-border",
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
								"active": true,
								"index$": 5,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/transmission/cross-border-capacity",
								"parts": []any{
									"api",
									"transmission",
									"cross-border-capacity",
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
								"active": true,
								"index$": 6,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/transmission/cross-border-planned-trade",
								"parts": []any{
									"api",
									"transmission",
									"cross-border-planned-trade",
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
								"active": true,
								"index$": 7,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2020-06-30T20:59:59.999Z",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2020-05-31T20:59:59.999Z",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/transmission/cross-border/hourly",
								"parts": []any{
									"api",
									"transmission",
									"cross-border",
									"hourly",
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
								"active": true,
								"index$": 8,
							},
							map[string]any{
								"method": "GET",
								"orig": "/api/transmission/cross-border-planned-trade/latest",
								"parts": []any{
									"api",
									"transmission",
									"cross-border-planned-trade",
									"latest",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 9,
							},
							map[string]any{
								"method": "GET",
								"orig": "/api/transmission/cross-border/latest",
								"parts": []any{
									"api",
									"transmission",
									"cross-border",
									"latest",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 10,
							},
						},
						"input": "data",
						"key$": "load",
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
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "affected_asset_name",
											"orig": "affected_asset_name",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "event_duration_date_time_end",
											"orig": "event_duration_date_time_end",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "event_duration_date_time_start",
											"orig": "event_duration_date_time_start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "event_status",
											"orig": "event_status",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "event_type",
											"orig": "event_type",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "publication_datetime_start",
											"orig": "publication_datetime_start",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "publicationDateTimeDesc",
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "current",
											"kind": "query",
											"name": "status",
											"orig": "status",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "unavailability_type",
											"orig": "unavailability_type",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/umm/gas",
								"parts": []any{
									"api",
									"umm",
									"gas",
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
								"active": true,
								"index$": 0,
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
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/umm/gas/messages",
								"parts": []any{
									"api",
									"umm",
									"gas",
									"messages",
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
								"active": true,
								"index$": 1,
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
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/api/umm/single/{id}",
								"parts": []any{
									"api",
									"umm",
									"single",
									"{id}",
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
								"active": true,
								"index$": 2,
							},
						},
						"input": "data",
						"key$": "load",
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
						"name": "load",
						"points": []any{
							map[string]any{
								"method": "GET",
								"orig": "/umm/gas/rss",
								"parts": []any{
									"umm",
									"gas",
									"rss",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 0,
							},
							map[string]any{
								"method": "GET",
								"orig": "/umm/gas/rss/aris",
								"parts": []any{
									"umm",
									"gas",
									"rss",
									"aris",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 1,
							},
						},
						"input": "data",
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
