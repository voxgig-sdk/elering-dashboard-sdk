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



  Balance(data?: any) {
    const self = this
    return new BalanceEntity(self,data)
  }


  BalanceController(data?: any) {
    const self = this
    return new BalanceControllerEntity(self,data)
  }


  Firm(data?: any) {
    const self = this
    return new FirmEntity(self,data)
  }


  FirmCapacityController(data?: any) {
    const self = this
    return new FirmCapacityControllerEntity(self,data)
  }


  GasBalanceController(data?: any) {
    const self = this
    return new GasBalanceControllerEntity(self,data)
  }


  GasBorderTradeController(data?: any) {
    const self = this
    return new GasBorderTradeControllerEntity(self,data)
  }


  GasSystem(data?: any) {
    const self = this
    return new GasSystemEntity(self,data)
  }


  GasSystemController(data?: any) {
    const self = this
    return new GasSystemControllerEntity(self,data)
  }


  GasTrade(data?: any) {
    const self = this
    return new GasTradeEntity(self,data)
  }


  GasTradeController(data?: any) {
    const self = this
    return new GasTradeControllerEntity(self,data)
  }


  GasTransmissionController(data?: any) {
    const self = this
    return new GasTransmissionControllerEntity(self,data)
  }


  GreenController(data?: any) {
    const self = this
    return new GreenControllerEntity(self,data)
  }


  Interruptible(data?: any) {
    const self = this
    return new InterruptibleEntity(self,data)
  }


  InterruptibleCapacityController(data?: any) {
    const self = this
    return new InterruptibleCapacityControllerEntity(self,data)
  }


  Nomination(data?: any) {
    const self = this
    return new NominationEntity(self,data)
  }


  NominationsController(data?: any) {
    const self = this
    return new NominationsControllerEntity(self,data)
  }


  NpsController(data?: any) {
    const self = this
    return new NpsControllerEntity(self,data)
  }


  Renomination(data?: any) {
    const self = this
    return new RenominationEntity(self,data)
  }


  RenominationsController(data?: any) {
    const self = this
    return new RenominationsControllerEntity(self,data)
  }


  System(data?: any) {
    const self = this
    return new SystemEntity(self,data)
  }


  SystemController(data?: any) {
    const self = this
    return new SystemControllerEntity(self,data)
  }


  TransmissionController(data?: any) {
    const self = this
    return new TransmissionControllerEntity(self,data)
  }


  UmmGasController(data?: any) {
    const self = this
    return new UmmGasControllerEntity(self,data)
  }


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


