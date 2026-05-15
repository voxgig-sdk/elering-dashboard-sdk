<?php
declare(strict_types=1);

// EleringDashboard SDK configuration

class EleringDashboardConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "EleringDashboard",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://dashboard.elering.ee",
                "auth" => [
                    "prefix" => "Bearer",
                ],
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
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/balance',
                  'parts' => [
                    'api',
                    'balance',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/balance/commerce/csv',
                  'parts' => [
                    'api',
                    'balance',
                    'commerce',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/balance/csv',
                  'parts' => [
                    'api',
                    'balance',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 1,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/balance/total/csv',
                  'parts' => [
                    'api',
                    'balance',
                    'total',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 2,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/balance/total',
                  'parts' => [
                    'api',
                    'balance',
                    'total',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 3,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/balance/commerce',
                  'parts' => [
                    'api',
                    'balance',
                    'commerce',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 4,
                ],
                [
                  'method' => 'GET',
                  'orig' => '/api/balance/commerce/latest',
                  'parts' => [
                    'api',
                    'balance',
                    'commerce',
                    'latest',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 5,
                ],
                [
                  'method' => 'GET',
                  'orig' => '/api/balance/total/latest',
                  'parts' => [
                    'api',
                    'balance',
                    'total',
                    'latest',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 6,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/capacity/firm',
                  'parts' => [
                    'api',
                    'capacity',
                    'firm',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
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
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/capacity/firm/csv',
                  'parts' => [
                    'api',
                    'capacity',
                    'firm',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/gas-balance/price/csv',
                  'parts' => [
                    'api',
                    'gas-balance',
                    'price',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/gas-balance/price',
                  'parts' => [
                    'api',
                    'gas-balance',
                    'price',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 1,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'name' => 'load',
              'points' => [
                [
                  'method' => 'GET',
                  'orig' => '/api/gas/border-trade/current',
                  'parts' => [
                    'api',
                    'gas',
                    'border-trade',
                    'current',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/gas-system',
                  'parts' => [
                    'api',
                    'gas-system',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/gas-system/csv',
                  'parts' => [
                    'api',
                    'gas-system',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/gas-system/daily/csv',
                  'parts' => [
                    'api',
                    'gas-system',
                    'daily',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 1,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/gas-system/m3/csv',
                  'parts' => [
                    'api',
                    'gas-system',
                    'm3',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 2,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/gas-system/daily',
                  'parts' => [
                    'api',
                    'gas-system',
                    'daily',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 3,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/gas-system/daily-average',
                  'parts' => [
                    'api',
                    'gas-system',
                    'daily-average',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 4,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/gas-system/m3',
                  'parts' => [
                    'api',
                    'gas-system',
                    'm3',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 5,
                ],
                [
                  'method' => 'GET',
                  'orig' => '/api/gas-system/latest',
                  'parts' => [
                    'api',
                    'gas-system',
                    'latest',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 6,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/gas-trade',
                  'parts' => [
                    'api',
                    'gas-trade',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/gas-trade/csv',
                  'parts' => [
                    'api',
                    'gas-trade',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'group',
                        'orig' => 'group',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/gas-trade/{group}/latest',
                  'parts' => [
                    'api',
                    'gas-trade',
                    '{group}',
                    'latest',
                  ],
                  'select' => [
                    'exist' => [
                      'group',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 1,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'gas_trade',
              ],
            ],
          ],
        ],
        'gas_transmission_controller' => [
          'fields' => [],
          'name' => 'gas_transmission_controller',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/gas-transmission/cross-border/csv',
                  'parts' => [
                    'api',
                    'gas-transmission',
                    'cross-border',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/gas-transmission/cross-border',
                  'parts' => [
                    'api',
                    'gas-transmission',
                    'cross-border',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 1,
                ],
                [
                  'method' => 'GET',
                  'orig' => '/api/gas-transmission/cross-border/latest',
                  'parts' => [
                    'api',
                    'gas-transmission',
                    'cross-border',
                    'latest',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 2,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'Kõik kütused',
                        'kind' => 'query',
                        'name' => 'fuel',
                        'orig' => 'fuel',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 'Kõik tehnoloogiad',
                        'kind' => 'query',
                        'name' => 'technology',
                        'orig' => 'technology',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 'TRANSACTION',
                        'kind' => 'query',
                        'name' => 'type',
                        'orig' => 'type',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/green/certificates',
                  'parts' => [
                    'api',
                    'green',
                    'certificates',
                  ],
                  'select' => [
                    'exist' => [
                      'fuel',
                      'technology',
                      'type',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/capacity/interruptible',
                  'parts' => [
                    'api',
                    'capacity',
                    'interruptible',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/capacity/interruptible/csv',
                  'parts' => [
                    'api',
                    'capacity',
                    'interruptible',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/nominations',
                  'parts' => [
                    'api',
                    'nominations',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/nominations/csv',
                  'parts' => [
                    'api',
                    'nominations',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/nps/price/csv',
                  'parts' => [
                    'api',
                    'nps',
                    'price',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/nps/turnover/csv',
                  'parts' => [
                    'api',
                    'nps',
                    'turnover',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 1,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/nps/price',
                  'parts' => [
                    'api',
                    'nps',
                    'price',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 2,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/nps/turnover',
                  'parts' => [
                    'api',
                    'nps',
                    'turnover',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 3,
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'group',
                        'orig' => 'group',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/nps/price/{group}/current',
                  'parts' => [
                    'api',
                    'nps',
                    'price',
                    '{group}',
                    'current',
                  ],
                  'select' => [
                    'exist' => [
                      'group',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 4,
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'group',
                        'orig' => 'group',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/nps/price/{group}/latest',
                  'parts' => [
                    'api',
                    'nps',
                    'price',
                    '{group}',
                    'latest',
                  ],
                  'select' => [
                    'exist' => [
                      'group',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 5,
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'group',
                        'orig' => 'group',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/nps/turnover/{group}/latest',
                  'parts' => [
                    'api',
                    'nps',
                    'turnover',
                    '{group}',
                    'latest',
                  ],
                  'select' => [
                    'exist' => [
                      'group',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 6,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'price',
              ],
              [
                'turnover',
              ],
            ],
          ],
        ],
        'renomination' => [
          'fields' => [],
          'name' => 'renomination',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/nominations/renominations',
                  'parts' => [
                    'api',
                    'nominations',
                    'renominations',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/nominations/renominations/csv',
                  'parts' => [
                    'api',
                    'nominations',
                    'renominations',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/system',
                  'parts' => [
                    'api',
                    'system',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/system/csv',
                  'parts' => [
                    'api',
                    'system',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/system/with-plan/csv',
                  'parts' => [
                    'api',
                    'system',
                    'with-plan',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 1,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/system/with-plan',
                  'parts' => [
                    'api',
                    'system',
                    'with-plan',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 2,
                ],
                [
                  'method' => 'GET',
                  'orig' => '/api/system/latest',
                  'parts' => [
                    'api',
                    'system',
                    'latest',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 3,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'group',
                        'orig' => 'group',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border-capacity/{group}/csv',
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border-capacity',
                    '{group}',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'group',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border-planned-trade/csv',
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border-planned-trade',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 1,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border/csv',
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 2,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$ARRAY`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border/hourly/csv',
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border',
                    'hourly',
                    'csv',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'field',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 3,
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'group',
                        'orig' => 'group',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border-capacity/{group}',
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border-capacity',
                    '{group}',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'group',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 4,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border',
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 5,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border-capacity',
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border-capacity',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 6,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border-planned-trade',
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border-planned-trade',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 7,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2020-06-30T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => '2020-05-31T20:59:59.999Z',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border/hourly',
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border',
                    'hourly',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 8,
                ],
                [
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border-planned-trade/latest',
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border-planned-trade',
                    'latest',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 9,
                ],
                [
                  'method' => 'GET',
                  'orig' => '/api/transmission/cross-border/latest',
                  'parts' => [
                    'api',
                    'transmission',
                    'cross-border',
                    'latest',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 10,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'cross_border_capacity',
              ],
            ],
          ],
        ],
        'umm_gas_controller' => [
          'fields' => [],
          'name' => 'umm_gas_controller',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'affected_asset_name',
                        'orig' => 'affected_asset_name',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'event_duration_date_time_end',
                        'orig' => 'event_duration_date_time_end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'event_duration_date_time_start',
                        'orig' => 'event_duration_date_time_start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'event_status',
                        'orig' => 'event_status',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'event_type',
                        'orig' => 'event_type',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'publication_datetime_start',
                        'orig' => 'publication_datetime_start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 'publicationDateTimeDesc',
                        'kind' => 'query',
                        'name' => 'sort',
                        'orig' => 'sort',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 'current',
                        'kind' => 'query',
                        'name' => 'status',
                        'orig' => 'status',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'unavailability_type',
                        'orig' => 'unavailability_type',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/umm/gas',
                  'parts' => [
                    'api',
                    'umm',
                    'gas',
                  ],
                  'select' => [
                    'exist' => [
                      'affected_asset_name',
                      'event_duration_date_time_end',
                      'event_duration_date_time_start',
                      'event_status',
                      'event_type',
                      'page',
                      'publication_datetime_start',
                      'sort',
                      'status',
                      'unavailability_type',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/umm/gas/messages',
                  'parts' => [
                    'api',
                    'umm',
                    'gas',
                    'messages',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 1,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/umm/single/{id}',
                  'parts' => [
                    'api',
                    'umm',
                    'single',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 2,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'name' => 'load',
              'points' => [
                [
                  'method' => 'GET',
                  'orig' => '/umm/gas/rss',
                  'parts' => [
                    'umm',
                    'gas',
                    'rss',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 0,
                ],
                [
                  'method' => 'GET',
                  'orig' => '/umm/gas/rss/aris',
                  'parts' => [
                    'umm',
                    'gas',
                    'rss',
                    'aris',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 1,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
