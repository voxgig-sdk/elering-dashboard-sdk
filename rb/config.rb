# EleringDashboard SDK configuration

module EleringDashboardConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "EleringDashboard",
        "slug" => "elering-dashboard",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://dashboard.elering.ee",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "balance" => {},
          "balance_controller" => {},
          "firm" => {},
          "firm_capacity_controller" => {},
          "gas_balance_controller" => {},
          "gas_border_trade_controller" => {},
          "gas_system" => {},
          "gas_system_controller" => {},
          "gas_trade" => {},
          "gas_trade_controller" => {},
          "gas_transmission_controller" => {},
          "green_controller" => {},
          "interruptible" => {},
          "interruptible_capacity_controller" => {},
          "nomination" => {},
          "nominations_controller" => {},
          "nps_controller" => {},
          "renomination" => {},
          "renominations_controller" => {},
          "system" => {},
          "system_controller" => {},
          "transmission_controller" => {},
          "umm_gas_controller" => {},
          "umm_rss_feed_controller" => {},
        },
      },
      "entity" => {
        "balance" => {
          "fields" => [],
          "name" => "balance",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/balance",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "balance",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "balance",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "balance_controller" => {
          "fields" => [],
          "name" => "balance_controller",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/balance/commerce/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "balance",
                    },
                    {
                      "lit" => "commerce",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "balance",
                    "commerce",
                    "csv",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/balance/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "balance",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "balance",
                    "csv",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/balance/total/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "balance",
                    },
                    {
                      "lit" => "total",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "balance",
                    "total",
                    "csv",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/balance/total",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "balance",
                    },
                    {
                      "lit" => "total",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "balance",
                    "total",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/balance/commerce",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "balance",
                    },
                    {
                      "lit" => "commerce",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "balance",
                    "commerce",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/balance/commerce/latest",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "balance",
                    },
                    {
                      "lit" => "commerce",
                    },
                    {
                      "lit" => "latest",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "balance",
                    "commerce",
                    "latest",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/balance/total/latest",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "balance",
                    },
                    {
                      "lit" => "total",
                    },
                    {
                      "lit" => "latest",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "balance",
                    "total",
                    "latest",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "firm" => {
          "fields" => [],
          "name" => "firm",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/capacity/firm",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "capacity",
                    },
                    {
                      "lit" => "firm",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "capacity",
                    "firm",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "firm_capacity_controller" => {
          "fields" => [],
          "name" => "firm_capacity_controller",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => [
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
                        ],
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/capacity/firm/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "capacity",
                    },
                    {
                      "lit" => "firm",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "capacity",
                    "firm",
                    "csv",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "gas_balance_controller" => {
          "fields" => [],
          "name" => "gas_balance_controller",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/gas-balance/price/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "gas-balance",
                    },
                    {
                      "lit" => "price",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "gas-balance",
                    "price",
                    "csv",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/gas-balance/price",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "gas-balance",
                    },
                    {
                      "lit" => "price",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "gas-balance",
                    "price",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "gas_border_trade_controller" => {
          "fields" => [],
          "name" => "gas_border_trade_controller",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/gas/border-trade/current",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "gas",
                    },
                    {
                      "lit" => "border-trade",
                    },
                    {
                      "lit" => "current",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "gas",
                    "border-trade",
                    "current",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "gas_system" => {
          "fields" => [],
          "name" => "gas_system",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/gas-system",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "gas-system",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "gas-system",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "gas_system_controller" => {
          "fields" => [],
          "name" => "gas_system_controller",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/gas-system/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "gas-system",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "gas-system",
                    "csv",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/gas-system/daily/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "gas-system",
                    },
                    {
                      "lit" => "daily",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "gas-system",
                    "daily",
                    "csv",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/gas-system/m3/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "gas-system",
                    },
                    {
                      "lit" => "m3",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "gas-system",
                    "m3",
                    "csv",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/gas-system/daily",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "gas-system",
                    },
                    {
                      "lit" => "daily",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "gas-system",
                    "daily",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/gas-system/daily-average",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "gas-system",
                    },
                    {
                      "lit" => "daily-average",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "gas-system",
                    "daily-average",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/gas-system/m3",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "gas-system",
                    },
                    {
                      "lit" => "m3",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "gas-system",
                    "m3",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/gas-system/latest",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "gas-system",
                    },
                    {
                      "lit" => "latest",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "gas-system",
                    "latest",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "gas_trade" => {
          "fields" => [],
          "name" => "gas_trade",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/gas-trade",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "gas-trade",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "gas-trade",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "gas_trade_controller" => {
          "fields" => [],
          "name" => "gas_trade_controller",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/gas-trade/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "gas-trade",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "gas-trade",
                    "csv",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "group",
                        "orig" => "group",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/gas-trade/{group}/latest",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "gas-trade",
                    },
                    {
                      "var" => "group",
                    },
                    {
                      "lit" => "latest",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "group",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "gas-trade",
                    "{group}",
                    "latest",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "gas_trade",
              ],
            ],
          },
        },
        "gas_transmission_controller" => {
          "fields" => [],
          "name" => "gas_transmission_controller",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/gas-transmission/cross-border/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "gas-transmission",
                    },
                    {
                      "lit" => "cross-border",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "gas-transmission",
                    "cross-border",
                    "csv",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/gas-transmission/cross-border",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "gas-transmission",
                    },
                    {
                      "lit" => "cross-border",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "gas-transmission",
                    "cross-border",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/gas-transmission/cross-border/latest",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "gas-transmission",
                    },
                    {
                      "lit" => "cross-border",
                    },
                    {
                      "lit" => "latest",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "gas-transmission",
                    "cross-border",
                    "latest",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "green_controller" => {
          "fields" => [],
          "name" => "green_controller",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "Kõik kütused",
                        "kind" => "query",
                        "name" => "fuel",
                        "orig" => "fuel",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "Kõik tehnoloogiad",
                        "kind" => "query",
                        "name" => "technology",
                        "orig" => "technology",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "TRANSACTION",
                        "kind" => "query",
                        "name" => "type",
                        "orig" => "type",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/green/certificates",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "green",
                    },
                    {
                      "lit" => "certificates",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "fuel",
                      "technology",
                      "type",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "green",
                    "certificates",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "interruptible" => {
          "fields" => [],
          "name" => "interruptible",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/capacity/interruptible",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "capacity",
                    },
                    {
                      "lit" => "interruptible",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "capacity",
                    "interruptible",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "interruptible_capacity_controller" => {
          "fields" => [],
          "name" => "interruptible_capacity_controller",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/capacity/interruptible/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "capacity",
                    },
                    {
                      "lit" => "interruptible",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "capacity",
                    "interruptible",
                    "csv",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "nomination" => {
          "fields" => [],
          "name" => "nomination",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/nominations",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "nominations",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "nominations",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "nominations_controller" => {
          "fields" => [],
          "name" => "nominations_controller",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/nominations/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "nominations",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "nominations",
                    "csv",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "nps_controller" => {
          "fields" => [],
          "name" => "nps_controller",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/nps/price/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "nps",
                    },
                    {
                      "lit" => "price",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "nps",
                    "price",
                    "csv",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/nps/turnover/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "nps",
                    },
                    {
                      "lit" => "turnover",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "nps",
                    "turnover",
                    "csv",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/nps/price",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "nps",
                    },
                    {
                      "lit" => "price",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "nps",
                    "price",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/nps/turnover",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "nps",
                    },
                    {
                      "lit" => "turnover",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "nps",
                    "turnover",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "group",
                        "orig" => "group",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/nps/price/{group}/current",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "nps",
                    },
                    {
                      "lit" => "price",
                    },
                    {
                      "var" => "group",
                    },
                    {
                      "lit" => "current",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "group",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "nps",
                    "price",
                    "{group}",
                    "current",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "group",
                        "orig" => "group",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/nps/price/{group}/latest",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "nps",
                    },
                    {
                      "lit" => "price",
                    },
                    {
                      "var" => "group",
                    },
                    {
                      "lit" => "latest",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "group",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "nps",
                    "price",
                    "{group}",
                    "latest",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "group",
                        "orig" => "group",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/nps/turnover/{group}/latest",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "nps",
                    },
                    {
                      "lit" => "turnover",
                    },
                    {
                      "var" => "group",
                    },
                    {
                      "lit" => "latest",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "group",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "nps",
                    "turnover",
                    "{group}",
                    "latest",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "price",
              ],
              [
                "turnover",
              ],
            ],
          },
        },
        "renomination" => {
          "fields" => [],
          "name" => "renomination",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/nominations/renominations",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "nominations",
                    },
                    {
                      "lit" => "renominations",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "nominations",
                    "renominations",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "renominations_controller" => {
          "fields" => [],
          "name" => "renominations_controller",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/nominations/renominations/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "nominations",
                    },
                    {
                      "lit" => "renominations",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "nominations",
                    "renominations",
                    "csv",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "system" => {
          "fields" => [],
          "name" => "system",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/system",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "system",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "system",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "system_controller" => {
          "fields" => [],
          "name" => "system_controller",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/system/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "system",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "system",
                    "csv",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/system/with-plan/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "system",
                    },
                    {
                      "lit" => "with-plan",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "system",
                    "with-plan",
                    "csv",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/system/with-plan",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "system",
                    },
                    {
                      "lit" => "with-plan",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "system",
                    "with-plan",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/system/latest",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "system",
                    },
                    {
                      "lit" => "latest",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "system",
                    "latest",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "transmission_controller" => {
          "fields" => [],
          "name" => "transmission_controller",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "group",
                        "orig" => "group",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/transmission/cross-border-capacity/{group}/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "transmission",
                    },
                    {
                      "lit" => "cross-border-capacity",
                    },
                    {
                      "var" => "group",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "group",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "transmission",
                    "cross-border-capacity",
                    "{group}",
                    "csv",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/transmission/cross-border-planned-trade/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "transmission",
                    },
                    {
                      "lit" => "cross-border-planned-trade",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "transmission",
                    "cross-border-planned-trade",
                    "csv",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/transmission/cross-border/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "transmission",
                    },
                    {
                      "lit" => "cross-border",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "transmission",
                    "cross-border",
                    "csv",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "type" => "`$ARRAY`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/transmission/cross-border/hourly/csv",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "transmission",
                    },
                    {
                      "lit" => "cross-border",
                    },
                    {
                      "lit" => "hourly",
                    },
                    {
                      "lit" => "csv",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "field",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "transmission",
                    "cross-border",
                    "hourly",
                    "csv",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "group",
                        "orig" => "group",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/transmission/cross-border-capacity/{group}",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "transmission",
                    },
                    {
                      "lit" => "cross-border-capacity",
                    },
                    {
                      "var" => "group",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "group",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "transmission",
                    "cross-border-capacity",
                    "{group}",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/transmission/cross-border",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "transmission",
                    },
                    {
                      "lit" => "cross-border",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "transmission",
                    "cross-border",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/transmission/cross-border-capacity",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "transmission",
                    },
                    {
                      "lit" => "cross-border-capacity",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "transmission",
                    "cross-border-capacity",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/transmission/cross-border-planned-trade",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "transmission",
                    },
                    {
                      "lit" => "cross-border-planned-trade",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "transmission",
                    "cross-border-planned-trade",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2020-06-30T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2020-05-31T20:59:59.999Z",
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/transmission/cross-border/hourly",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "transmission",
                    },
                    {
                      "lit" => "cross-border",
                    },
                    {
                      "lit" => "hourly",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "transmission",
                    "cross-border",
                    "hourly",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/transmission/cross-border-planned-trade/latest",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "transmission",
                    },
                    {
                      "lit" => "cross-border-planned-trade",
                    },
                    {
                      "lit" => "latest",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "transmission",
                    "cross-border-planned-trade",
                    "latest",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/transmission/cross-border/latest",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "transmission",
                    },
                    {
                      "lit" => "cross-border",
                    },
                    {
                      "lit" => "latest",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "transmission",
                    "cross-border",
                    "latest",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "cross_border_capacity",
              ],
            ],
          },
        },
        "umm_gas_controller" => {
          "fields" => [],
          "name" => "umm_gas_controller",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "affected_asset_name",
                        "orig" => "affected_asset_name",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "event_duration_date_time_end",
                        "orig" => "event_duration_date_time_end",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "event_duration_date_time_start",
                        "orig" => "event_duration_date_time_start",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "event_status",
                        "orig" => "event_status",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "event_type",
                        "orig" => "event_type",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "publication_datetime_start",
                        "orig" => "publication_datetime_start",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "publicationDateTimeDesc",
                        "kind" => "query",
                        "name" => "sort",
                        "orig" => "sort",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "current",
                        "kind" => "query",
                        "name" => "status",
                        "orig" => "status",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "unavailability_type",
                        "orig" => "unavailability_type",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/umm/gas",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "umm",
                    },
                    {
                      "lit" => "gas",
                    },
                  ],
                  "select" => {
                    "exist" => [
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
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "umm",
                    "gas",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/umm/gas/messages",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "umm",
                    },
                    {
                      "lit" => "gas",
                    },
                    {
                      "lit" => "messages",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "umm",
                    "gas",
                    "messages",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/umm/single/{id}",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "umm",
                    },
                    {
                      "lit" => "single",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "umm",
                    "single",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "umm_rss_feed_controller" => {
          "fields" => [],
          "name" => "umm_rss_feed_controller",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/umm/gas/rss",
                  "segments" => [
                    {
                      "lit" => "umm",
                    },
                    {
                      "lit" => "gas",
                    },
                    {
                      "lit" => "rss",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "umm",
                    "gas",
                    "rss",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/umm/gas/rss/aris",
                  "segments" => [
                    {
                      "lit" => "umm",
                    },
                    {
                      "lit" => "gas",
                    },
                    {
                      "lit" => "rss",
                    },
                    {
                      "lit" => "aris",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "umm",
                    "gas",
                    "rss",
                    "aris",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    EleringDashboardFeatures.make_feature(name)
  end
end
