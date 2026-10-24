<?php
declare(strict_types=1);

// EleringDashboard SDK configuration

class EleringDashboardConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "EleringDashboard",
                "slug" => "elering-dashboard",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'now' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://dashboard.elering.ee",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "balance" => [],
                    "balance_controller" => [],
                    "firm" => [],
                    "firm_capacity_controller" => [],
                    "gas_balance_controller" => [],
                    "gas_border_trade_controller" => [],
                    "gas_system" => [],
                    "gas_system_controller" => [],
                    "gas_trade" => [],
                    "gas_trade_controller" => [],
                    "gas_transmission_controller" => [],
                    "green_controller" => [],
                    "interruptible" => [],
                    "interruptible_capacity_controller" => [],
                    "nomination" => [],
                    "nominations_controller" => [],
                    "nps_controller" => [],
                    "renomination" => [],
                    "renominations_controller" => [],
                    "system" => [],
                    "system_controller" => [],
                    "transmission_controller" => [],
                    "umm_gas_controller" => [],
                    "umm_rss_feed_controller" => [],
                ],
            ],
            "entity" => [
        'balance' => [
          'fields' => [],
          'name' => 'balance',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/balance',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'balance',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'balance',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'balance_controller' => [
          'fields' => [],
          'name' => 'balance_controller',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/balance/commerce',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'balance',
                    ],
                    [
                      'lit' => 'commerce',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'balance',
                    'commerce',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/balance/commerce/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'balance',
                    ],
                    [
                      'lit' => 'commerce',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'balance',
                    'commerce',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/balance/commerce/latest',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'balance',
                    ],
                    [
                      'lit' => 'commerce',
                    ],
                    [
                      'lit' => 'latest',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'balance',
                    'commerce',
                    'latest',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/balance/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'balance',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'balance',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/balance/total',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'balance',
                    ],
                    [
                      'lit' => 'total',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'balance',
                    'total',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/balance/total/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'balance',
                    ],
                    [
                      'lit' => 'total',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'balance',
                    'total',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/balance/total/latest',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'balance',
                    ],
                    [
                      'lit' => 'total',
                    ],
                    [
                      'lit' => 'latest',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'balance',
                    'total',
                    'latest',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'firm' => [
          'fields' => [],
          'name' => 'firm',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/capacity/firm',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'capacity',
                    ],
                    [
                      'lit' => 'firm',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'capacity',
                    'firm',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'firm_capacity_controller' => [
          'fields' => [],
          'name' => 'firm_capacity_controller',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/capacity/firm/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'capacity',
                    ],
                    [
                      'lit' => 'firm',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'capacity',
                    'firm',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                        'example' => [
                          '["narva_technical_entry"',
                          '"narva_booked_entry"',
                          '"narva_available_entry"',
                          '"varska_technical_entry"',
                          '"varska_booked_entry"',
                          '"varska_available_entry"',
                          '"varska_technical_exit"',
                          '"varska_booked_exit"',
                          '"varska_available_exit"',
                          '"balticconnector_technical_entry"',
                          '"balticconnector_booked_entry"',
                          '"balticconnector_available_entry"',
                          '"balticconnector_technical_exit"',
                          '"balticconnector_booked_exit"',
                          '"balticconnector_available_exit"',
                          '"production_technical"',
                          '"production_booked"',
                          '"production_available"]',
                        ],
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'gas_balance_controller' => [
          'fields' => [],
          'name' => 'gas_balance_controller',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/gas-balance/price',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'gas-balance',
                    ],
                    [
                      'lit' => 'price',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'gas-balance',
                    'price',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/gas-balance/price/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'gas-balance',
                    ],
                    [
                      'lit' => 'price',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'gas-balance',
                    'price',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'gas_border_trade_controller' => [
          'fields' => [],
          'name' => 'gas_border_trade_controller',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/gas/border-trade/current',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'gas',
                    ],
                    [
                      'lit' => 'border-trade',
                    ],
                    [
                      'lit' => 'current',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'gas',
                    'border-trade',
                    'current',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'gas_system' => [
          'fields' => [],
          'name' => 'gas_system',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/gas-system',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'gas-system',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'gas-system',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'gas_system_controller' => [
          'fields' => [],
          'name' => 'gas_system_controller',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/gas-system/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'gas-system',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'gas-system',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/gas-system/daily',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'gas-system',
                    ],
                    [
                      'lit' => 'daily',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'gas-system',
                    'daily',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/gas-system/daily-average',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'gas-system',
                    ],
                    [
                      'lit' => 'daily-average',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'gas-system',
                    'daily-average',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/gas-system/daily/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'gas-system',
                    ],
                    [
                      'lit' => 'daily',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'gas-system',
                    'daily',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/gas-system/latest',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'gas-system',
                    ],
                    [
                      'lit' => 'latest',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'gas-system',
                    'latest',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/gas-system/m3',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'gas-system',
                    ],
                    [
                      'lit' => 'm3',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'gas-system',
                    'm3',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/gas-system/m3/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'gas-system',
                    ],
                    [
                      'lit' => 'm3',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'gas-system',
                    'm3',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'gas_trade' => [
          'fields' => [],
          'name' => 'gas_trade',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/gas-trade',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'gas-trade',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'gas-trade',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'gas_trade_controller' => [
          'fields' => [],
          'name' => 'gas_trade_controller',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/gas-trade/{group}/latest',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'gas-trade',
                    ],
                    [
                      'var' => 'group',
                    ],
                    [
                      'lit' => 'latest',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'gas-trade',
                    '{group}',
                    'latest',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'group',
                        'orig' => 'group',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'group',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/gas-trade/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'gas-trade',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'gas-trade',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.gas_trade',
              ],
            ],
          ],
        ],
        'gas_transmission_controller' => [
          'fields' => [],
          'name' => 'gas_transmission_controller',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/gas-transmission/cross-border',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'gas-transmission',
                    ],
                    [
                      'lit' => 'cross-border',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'gas-transmission',
                    'cross-border',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/gas-transmission/cross-border/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'gas-transmission',
                    ],
                    [
                      'lit' => 'cross-border',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'gas-transmission',
                    'cross-border',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/gas-transmission/cross-border/latest',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'gas-transmission',
                    ],
                    [
                      'lit' => 'cross-border',
                    ],
                    [
                      'lit' => 'latest',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'gas-transmission',
                    'cross-border',
                    'latest',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'green_controller' => [
          'fields' => [],
          'name' => 'green_controller',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/green/certificates',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'green',
                    ],
                    [
                      'lit' => 'certificates',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'green',
                    'certificates',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'fuel',
                        'orig' => 'fuel',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'Kõik kütused',
                      ],
                      [
                        'name' => 'technology',
                        'orig' => 'technology',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'Kõik tehnoloogiad',
                      ],
                      [
                        'name' => 'type',
                        'orig' => 'type',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'TRANSACTION',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'interruptible' => [
          'fields' => [],
          'name' => 'interruptible',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/capacity/interruptible',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'capacity',
                    ],
                    [
                      'lit' => 'interruptible',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'capacity',
                    'interruptible',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'interruptible_capacity_controller' => [
          'fields' => [],
          'name' => 'interruptible_capacity_controller',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/capacity/interruptible/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'capacity',
                    ],
                    [
                      'lit' => 'interruptible',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'capacity',
                    'interruptible',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'nomination' => [
          'fields' => [],
          'name' => 'nomination',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/nominations',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'nominations',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'nominations',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'nominations_controller' => [
          'fields' => [],
          'name' => 'nominations_controller',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/nominations/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'nominations',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'nominations',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'nps_controller' => [
          'fields' => [],
          'name' => 'nps_controller',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/nps/price/{group}/current',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'nps',
                    ],
                    [
                      'lit' => 'price',
                    ],
                    [
                      'var' => 'group',
                    ],
                    [
                      'lit' => 'current',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'nps',
                    'price',
                    '{group}',
                    'current',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'group',
                        'orig' => 'group',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'group',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/nps/price/{group}/latest',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'nps',
                    ],
                    [
                      'lit' => 'price',
                    ],
                    [
                      'var' => 'group',
                    ],
                    [
                      'lit' => 'latest',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'nps',
                    'price',
                    '{group}',
                    'latest',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'group',
                        'orig' => 'group',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'group',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/nps/turnover/{group}/latest',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'nps',
                    ],
                    [
                      'lit' => 'turnover',
                    ],
                    [
                      'var' => 'group',
                    ],
                    [
                      'lit' => 'latest',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'nps',
                    'turnover',
                    '{group}',
                    'latest',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'group',
                        'orig' => 'group',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'group',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/nps/price',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'nps',
                    ],
                    [
                      'lit' => 'price',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'nps',
                    'price',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/nps/price/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'nps',
                    ],
                    [
                      'lit' => 'price',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'nps',
                    'price',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/nps/turnover',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'nps',
                    ],
                    [
                      'lit' => 'turnover',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'nps',
                    'turnover',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/nps/turnover/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'nps',
                    ],
                    [
                      'lit' => 'turnover',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'nps',
                    'turnover',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'renomination' => [
          'fields' => [],
          'name' => 'renomination',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/nominations/renominations',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'nominations',
                    ],
                    [
                      'lit' => 'renominations',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'nominations',
                    'renominations',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'renominations_controller' => [
          'fields' => [],
          'name' => 'renominations_controller',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/nominations/renominations/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'nominations',
                    ],
                    [
                      'lit' => 'renominations',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'nominations',
                    'renominations',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'system' => [
          'fields' => [],
          'name' => 'system',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/system',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'system',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'system',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'system_controller' => [
          'fields' => [],
          'name' => 'system_controller',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/system/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'system',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'system',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/system/latest',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'system',
                    ],
                    [
                      'lit' => 'latest',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'system',
                    'latest',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/system/with-plan',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'system',
                    ],
                    [
                      'lit' => 'with-plan',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'system',
                    'with-plan',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/system/with-plan/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'system',
                    ],
                    [
                      'lit' => 'with-plan',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'system',
                    'with-plan',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'transmission_controller' => [
          'fields' => [],
          'name' => 'transmission_controller',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border-capacity/{group}',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'transmission',
                    ],
                    [
                      'lit' => 'cross-border-capacity',
                    ],
                    [
                      'var' => 'group',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border-capacity',
                    '{group}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'group',
                        'orig' => 'group',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'group',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border-capacity/{group}/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'transmission',
                    ],
                    [
                      'lit' => 'cross-border-capacity',
                    ],
                    [
                      'var' => 'group',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border-capacity',
                    '{group}',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'group',
                        'orig' => 'group',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'group',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'transmission',
                    ],
                    [
                      'lit' => 'cross-border',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border-capacity',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'transmission',
                    ],
                    [
                      'lit' => 'cross-border-capacity',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border-capacity',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border-planned-trade',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'transmission',
                    ],
                    [
                      'lit' => 'cross-border-planned-trade',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border-planned-trade',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border-planned-trade/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'transmission',
                    ],
                    [
                      'lit' => 'cross-border-planned-trade',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border-planned-trade',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border-planned-trade/latest',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'transmission',
                    ],
                    [
                      'lit' => 'cross-border-planned-trade',
                    ],
                    [
                      'lit' => 'latest',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border-planned-trade',
                    'latest',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'transmission',
                    ],
                    [
                      'lit' => 'cross-border',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border/hourly',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'transmission',
                    ],
                    [
                      'lit' => 'cross-border',
                    ],
                    [
                      'lit' => 'hourly',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border',
                    'hourly',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border/hourly/csv',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'transmission',
                    ],
                    [
                      'lit' => 'cross-border',
                    ],
                    [
                      'lit' => 'hourly',
                    ],
                    [
                      'lit' => 'csv',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border',
                    'hourly',
                    'csv',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-06-30T20:59:59.999Z',
                      ],
                      [
                        'name' => 'field',
                        'orig' => 'fields',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2020-05-31T20:59:59.999Z',
                      ],
                    ],
                  ],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border/latest',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'transmission',
                    ],
                    [
                      'lit' => 'cross-border',
                    ],
                    [
                      'lit' => 'latest',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border',
                    'latest',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'alternatives' => [
                      [
                        'kind' => 'json',
                        'media' => 'application/json;charset=UTF-8',
                      ],
                    ],
                    'kind' => 'json',
                    'media' => 'application/json; charset=UTF-8',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'umm_gas_controller' => [
          'fields' => [
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'umm_gas_controller',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/umm/gas/messages',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'umm',
                    ],
                    [
                      'lit' => 'gas',
                    ],
                    [
                      'lit' => 'messages',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'umm',
                    'gas',
                    'messages',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'field' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/umm/single/{id}',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'umm',
                    ],
                    [
                      'lit' => 'single',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'umm',
                    'single',
                    '{id}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'reqd' => true,
                        'field' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/umm/gas',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'umm',
                    ],
                    [
                      'lit' => 'gas',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'umm',
                    'gas',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'affected_asset_name',
                        'orig' => 'affected_asset_name',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'event_duration_date_time_end',
                        'orig' => 'event_duration_date_time_end',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'event_duration_date_time_start',
                        'orig' => 'event_duration_date_time_start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'event_status',
                        'orig' => 'event_status',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'event_type',
                        'orig' => 'event_type',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 1,
                      ],
                      [
                        'name' => 'publication_datetime_start',
                        'orig' => 'publication_datetime_start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'sort',
                        'orig' => 'sort',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'publicationDateTimeDesc',
                      ],
                      [
                        'name' => 'status',
                        'orig' => 'status',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'current',
                      ],
                      [
                        'name' => 'unavailability_type',
                        'orig' => 'unavailability_type',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'umm_rss_feed_controller' => [
          'fields' => [],
          'name' => 'umm_rss_feed_controller',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/umm/gas/rss',
                  'segments' => [
                    [
                      'lit' => 'umm',
                    ],
                    [
                      'lit' => 'gas',
                    ],
                    [
                      'lit' => 'rss',
                    ],
                  ],
                  'parts' => [
                    'umm',
                    'gas',
                    'rss',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'binary' => true,
                    'kind' => 'raw',
                    'media' => 'application/xml',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/umm/gas/rss/aris',
                  'segments' => [
                    [
                      'lit' => 'umm',
                    ],
                    [
                      'lit' => 'gas',
                    ],
                    [
                      'lit' => 'rss',
                    ],
                    [
                      'lit' => 'aris',
                    ],
                  ],
                  'parts' => [
                    'umm',
                    'gas',
                    'rss',
                    'aris',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'binary' => true,
                    'kind' => 'raw',
                    'media' => 'application/xml',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return EleringDashboardFeatures::make_feature($name);
    }
}
