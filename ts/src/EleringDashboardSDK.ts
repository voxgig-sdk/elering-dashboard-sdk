// EleringDashboard Ts SDK

import { BalanceEntity } from './entity/BalanceEntity'
import { BalanceControllerEntity } from './entity/BalanceControllerEntity'
import { FirmEntity } from './entity/FirmEntity'
import { FirmCapacityControllerEntity } from './entity/FirmCapacityControllerEntity'
import { GasBalanceControllerEntity } from './entity/GasBalanceControllerEntity'
import { GasBorderTradeControllerEntity } from './entity/GasBorderTradeControllerEntity'
import { GasSystemEntity } from './entity/GasSystemEntity'
import { GasSystemControllerEntity } from './entity/GasSystemControllerEntity'
import { GasTradeEntity } from './entity/GasTradeEntity'
import { GasTradeControllerEntity } from './entity/GasTradeControllerEntity'
import { GasTransmissionControllerEntity } from './entity/GasTransmissionControllerEntity'
import { GreenControllerEntity } from './entity/GreenControllerEntity'
import { InterruptibleEntity } from './entity/InterruptibleEntity'
import { InterruptibleCapacityControllerEntity } from './entity/InterruptibleCapacityControllerEntity'
import { NominationEntity } from './entity/NominationEntity'
import { NominationsControllerEntity } from './entity/NominationsControllerEntity'
import { NpsControllerEntity } from './entity/NpsControllerEntity'
import { RenominationEntity } from './entity/RenominationEntity'
import { RenominationsControllerEntity } from './entity/RenominationsControllerEntity'
import { SystemEntity } from './entity/SystemEntity'
import { SystemControllerEntity } from './entity/SystemControllerEntity'
import { TransmissionControllerEntity } from './entity/TransmissionControllerEntity'
import { UmmGasControllerEntity } from './entity/UmmGasControllerEntity'
import { UmmRssFeedControllerEntity } from './entity/UmmRssFeedControllerEntity'

export type * from './EleringDashboardTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { EleringDashboardEntityBase } from './EleringDashboardEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class EleringDashboardSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _balance?: BalanceEntity

  // Idiomatic facade: `client.balance.list()` / `client.balance.load({ id })`.
  get balance(): BalanceEntity {
    return (this._balance ??= new BalanceEntity(this, undefined))
  }

  /** @deprecated Use `client.balance` instead. */
  Balance(data?: any) {
    const self = this
    return new BalanceEntity(self,data)
  }


  _balance_controller?: BalanceControllerEntity

  // Idiomatic facade: `client.balance_controller.list()` / `client.balance_controller.load({ id })`.
  get balance_controller(): BalanceControllerEntity {
    return (this._balance_controller ??= new BalanceControllerEntity(this, undefined))
  }

  /** @deprecated Use `client.balance_controller` instead. */
  BalanceController(data?: any) {
    const self = this
    return new BalanceControllerEntity(self,data)
  }


  _firm?: FirmEntity

  // Idiomatic facade: `client.firm.list()` / `client.firm.load({ id })`.
  get firm(): FirmEntity {
    return (this._firm ??= new FirmEntity(this, undefined))
  }

  /** @deprecated Use `client.firm` instead. */
  Firm(data?: any) {
    const self = this
    return new FirmEntity(self,data)
  }


  _firm_capacity_controller?: FirmCapacityControllerEntity

  // Idiomatic facade: `client.firm_capacity_controller.list()` / `client.firm_capacity_controller.load({ id })`.
  get firm_capacity_controller(): FirmCapacityControllerEntity {
    return (this._firm_capacity_controller ??= new FirmCapacityControllerEntity(this, undefined))
  }

  /** @deprecated Use `client.firm_capacity_controller` instead. */
  FirmCapacityController(data?: any) {
    const self = this
    return new FirmCapacityControllerEntity(self,data)
  }


  _gas_balance_controller?: GasBalanceControllerEntity

  // Idiomatic facade: `client.gas_balance_controller.list()` / `client.gas_balance_controller.load({ id })`.
  get gas_balance_controller(): GasBalanceControllerEntity {
    return (this._gas_balance_controller ??= new GasBalanceControllerEntity(this, undefined))
  }

  /** @deprecated Use `client.gas_balance_controller` instead. */
  GasBalanceController(data?: any) {
    const self = this
    return new GasBalanceControllerEntity(self,data)
  }


  _gas_border_trade_controller?: GasBorderTradeControllerEntity

  // Idiomatic facade: `client.gas_border_trade_controller.list()` / `client.gas_border_trade_controller.load({ id })`.
  get gas_border_trade_controller(): GasBorderTradeControllerEntity {
    return (this._gas_border_trade_controller ??= new GasBorderTradeControllerEntity(this, undefined))
  }

  /** @deprecated Use `client.gas_border_trade_controller` instead. */
  GasBorderTradeController(data?: any) {
    const self = this
    return new GasBorderTradeControllerEntity(self,data)
  }


  _gas_system?: GasSystemEntity

  // Idiomatic facade: `client.gas_system.list()` / `client.gas_system.load({ id })`.
  get gas_system(): GasSystemEntity {
    return (this._gas_system ??= new GasSystemEntity(this, undefined))
  }

  /** @deprecated Use `client.gas_system` instead. */
  GasSystem(data?: any) {
    const self = this
    return new GasSystemEntity(self,data)
  }


  _gas_system_controller?: GasSystemControllerEntity

  // Idiomatic facade: `client.gas_system_controller.list()` / `client.gas_system_controller.load({ id })`.
  get gas_system_controller(): GasSystemControllerEntity {
    return (this._gas_system_controller ??= new GasSystemControllerEntity(this, undefined))
  }

  /** @deprecated Use `client.gas_system_controller` instead. */
  GasSystemController(data?: any) {
    const self = this
    return new GasSystemControllerEntity(self,data)
  }


  _gas_trade?: GasTradeEntity

  // Idiomatic facade: `client.gas_trade.list()` / `client.gas_trade.load({ id })`.
  get gas_trade(): GasTradeEntity {
    return (this._gas_trade ??= new GasTradeEntity(this, undefined))
  }

  /** @deprecated Use `client.gas_trade` instead. */
  GasTrade(data?: any) {
    const self = this
    return new GasTradeEntity(self,data)
  }


  _gas_trade_controller?: GasTradeControllerEntity

  // Idiomatic facade: `client.gas_trade_controller.list()` / `client.gas_trade_controller.load({ id })`.
  get gas_trade_controller(): GasTradeControllerEntity {
    return (this._gas_trade_controller ??= new GasTradeControllerEntity(this, undefined))
  }

  /** @deprecated Use `client.gas_trade_controller` instead. */
  GasTradeController(data?: any) {
    const self = this
    return new GasTradeControllerEntity(self,data)
  }


  _gas_transmission_controller?: GasTransmissionControllerEntity

  // Idiomatic facade: `client.gas_transmission_controller.list()` / `client.gas_transmission_controller.load({ id })`.
  get gas_transmission_controller(): GasTransmissionControllerEntity {
    return (this._gas_transmission_controller ??= new GasTransmissionControllerEntity(this, undefined))
  }

  /** @deprecated Use `client.gas_transmission_controller` instead. */
  GasTransmissionController(data?: any) {
    const self = this
    return new GasTransmissionControllerEntity(self,data)
  }


  _green_controller?: GreenControllerEntity

  // Idiomatic facade: `client.green_controller.list()` / `client.green_controller.load({ id })`.
  get green_controller(): GreenControllerEntity {
    return (this._green_controller ??= new GreenControllerEntity(this, undefined))
  }

  /** @deprecated Use `client.green_controller` instead. */
  GreenController(data?: any) {
    const self = this
    return new GreenControllerEntity(self,data)
  }


  _interruptible?: InterruptibleEntity

  // Idiomatic facade: `client.interruptible.list()` / `client.interruptible.load({ id })`.
  get interruptible(): InterruptibleEntity {
    return (this._interruptible ??= new InterruptibleEntity(this, undefined))
  }

  /** @deprecated Use `client.interruptible` instead. */
  Interruptible(data?: any) {
    const self = this
    return new InterruptibleEntity(self,data)
  }


  _interruptible_capacity_controller?: InterruptibleCapacityControllerEntity

  // Idiomatic facade: `client.interruptible_capacity_controller.list()` / `client.interruptible_capacity_controller.load({ id })`.
  get interruptible_capacity_controller(): InterruptibleCapacityControllerEntity {
    return (this._interruptible_capacity_controller ??= new InterruptibleCapacityControllerEntity(this, undefined))
  }

  /** @deprecated Use `client.interruptible_capacity_controller` instead. */
  InterruptibleCapacityController(data?: any) {
    const self = this
    return new InterruptibleCapacityControllerEntity(self,data)
  }


  _nomination?: NominationEntity

  // Idiomatic facade: `client.nomination.list()` / `client.nomination.load({ id })`.
  get nomination(): NominationEntity {
    return (this._nomination ??= new NominationEntity(this, undefined))
  }

  /** @deprecated Use `client.nomination` instead. */
  Nomination(data?: any) {
    const self = this
    return new NominationEntity(self,data)
  }


  _nominations_controller?: NominationsControllerEntity

  // Idiomatic facade: `client.nominations_controller.list()` / `client.nominations_controller.load({ id })`.
  get nominations_controller(): NominationsControllerEntity {
    return (this._nominations_controller ??= new NominationsControllerEntity(this, undefined))
  }

  /** @deprecated Use `client.nominations_controller` instead. */
  NominationsController(data?: any) {
    const self = this
    return new NominationsControllerEntity(self,data)
  }


  _nps_controller?: NpsControllerEntity

  // Idiomatic facade: `client.nps_controller.list()` / `client.nps_controller.load({ id })`.
  get nps_controller(): NpsControllerEntity {
    return (this._nps_controller ??= new NpsControllerEntity(this, undefined))
  }

  /** @deprecated Use `client.nps_controller` instead. */
  NpsController(data?: any) {
    const self = this
    return new NpsControllerEntity(self,data)
  }


  _renomination?: RenominationEntity

  // Idiomatic facade: `client.renomination.list()` / `client.renomination.load({ id })`.
  get renomination(): RenominationEntity {
    return (this._renomination ??= new RenominationEntity(this, undefined))
  }

  /** @deprecated Use `client.renomination` instead. */
  Renomination(data?: any) {
    const self = this
    return new RenominationEntity(self,data)
  }


  _renominations_controller?: RenominationsControllerEntity

  // Idiomatic facade: `client.renominations_controller.list()` / `client.renominations_controller.load({ id })`.
  get renominations_controller(): RenominationsControllerEntity {
    return (this._renominations_controller ??= new RenominationsControllerEntity(this, undefined))
  }

  /** @deprecated Use `client.renominations_controller` instead. */
  RenominationsController(data?: any) {
    const self = this
    return new RenominationsControllerEntity(self,data)
  }


  _system?: SystemEntity

  // Idiomatic facade: `client.system.list()` / `client.system.load({ id })`.
  get system(): SystemEntity {
    return (this._system ??= new SystemEntity(this, undefined))
  }

  /** @deprecated Use `client.system` instead. */
  System(data?: any) {
    const self = this
    return new SystemEntity(self,data)
  }


  _system_controller?: SystemControllerEntity

  // Idiomatic facade: `client.system_controller.list()` / `client.system_controller.load({ id })`.
  get system_controller(): SystemControllerEntity {
    return (this._system_controller ??= new SystemControllerEntity(this, undefined))
  }

  /** @deprecated Use `client.system_controller` instead. */
  SystemController(data?: any) {
    const self = this
    return new SystemControllerEntity(self,data)
  }


  _transmission_controller?: TransmissionControllerEntity

  // Idiomatic facade: `client.transmission_controller.list()` / `client.transmission_controller.load({ id })`.
  get transmission_controller(): TransmissionControllerEntity {
    return (this._transmission_controller ??= new TransmissionControllerEntity(this, undefined))
  }

  /** @deprecated Use `client.transmission_controller` instead. */
  TransmissionController(data?: any) {
    const self = this
    return new TransmissionControllerEntity(self,data)
  }


  _umm_gas_controller?: UmmGasControllerEntity

  // Idiomatic facade: `client.umm_gas_controller.list()` / `client.umm_gas_controller.load({ id })`.
  get umm_gas_controller(): UmmGasControllerEntity {
    return (this._umm_gas_controller ??= new UmmGasControllerEntity(this, undefined))
  }

  /** @deprecated Use `client.umm_gas_controller` instead. */
  UmmGasController(data?: any) {
    const self = this
    return new UmmGasControllerEntity(self,data)
  }


  _umm_rss_feed_controller?: UmmRssFeedControllerEntity

  // Idiomatic facade: `client.umm_rss_feed_controller.list()` / `client.umm_rss_feed_controller.load({ id })`.
  get umm_rss_feed_controller(): UmmRssFeedControllerEntity {
    return (this._umm_rss_feed_controller ??= new UmmRssFeedControllerEntity(this, undefined))
  }

  /** @deprecated Use `client.umm_rss_feed_controller` instead. */
  UmmRssFeedController(data?: any) {
    const self = this
    return new UmmRssFeedControllerEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new EleringDashboardSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return EleringDashboardSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'EleringDashboard' }
  }

  toString() {
    return 'EleringDashboard ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = EleringDashboardSDK


export {
  stdutil,

  BaseFeature,
  EleringDashboardEntityBase,

  EleringDashboardSDK,
  SDK,
}


