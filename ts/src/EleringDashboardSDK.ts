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

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

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


  // Raw endpoint access is operator-controllable, like every entity op.
  // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  // either one reaches the same endpoint.
  async direct(fetchargs?: any) {
    if (!this._options.allow.op.includes('direct')) {
      return {
        ok: false,
        err: new Error('EleringDashboardSDK: direct: operation not allowed by' +
          ' SDK option allow.op value: "' + this._options.allow.op + '"'),
      }
    }

    return this._rawRequest(fetchargs)
  }


  // Ungated request path shared by direct() and graphql(), each of which
  // checks its own allow.op token first. Private, rather than a flag on
  // fetchargs: a caller-supplied marker would let anyone opt straight back
  // out of the gate by passing it.
  async _rawRequest(fetchargs?: any) {
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



  // Raw GraphQL access: the pressure valve that makes the generated
  // surface's deliberate omissions (per-call selection sets, typed filter
  // builders, batching, subscriptions) livable — the whole schema stays
  // reachable.
  //
  // Thin wrapper over the same prepare/fetch path `direct` uses, with the
  // one thing raw `direct` cannot do for GraphQL: a GraphQL failure rides
  // HTTP 200 as a top-level `errors` array, so status alone would report a
  // failed query as ok.
  //
  // NOTE: like `direct`, this bypasses the feature pipeline — no retry,
  // ratelimit or paging features apply.
  async graphql(query: string, variables?: any, ctrl?: any) {
    const options = this._options

    if (!options.allow.op.includes('graphql')) {
      return {
        ok: false,
        err: new Error('EleringDashboardSDK: graphql: operation not allowed by' +
          ' SDK option allow.op value: "' + options.allow.op + '"'),
      }
    }

    const res: any = await this._rawRequest({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { query, variables: variables || {} },
      ctrl,
    })

    if (res instanceof Error) {
      return res
    }

    // Errors are read BEFORE any status check: a GraphQL parse or validation
    // failure comes back as HTTP 400 carrying the standard { errors: [...] }
    // body, and the raw path represents a non-2xx as { ok: false } with no
    // err — so returning early on status would discard the server's own
    // diagnostics, which are the only useful part of that response.
    const errors = null == res.data ? undefined : res.data.errors

    if (null != errors && Array.isArray(errors) && 0 < errors.length) {
      const first = errors[0] || {}
      const err: any = new Error('EleringDashboardSDK: graphql: ' +
        (first.message || 'graphql error'))
      err.graphql = errors
      return { ok: false, status: res.status, headers: res.headers, err, data: res.data }
    }

    return res
  }



  // Entity access: `client.Balance().list()` / `client.Balance().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Balance(entopts?: Record<string, any>) {
    const self = this
    return new BalanceEntity(self, entopts)
  }


  // Entity access: `client.BalanceController().list()` / `client.BalanceController().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BalanceController(entopts?: Record<string, any>) {
    const self = this
    return new BalanceControllerEntity(self, entopts)
  }


  // Entity access: `client.Firm().list()` / `client.Firm().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Firm(entopts?: Record<string, any>) {
    const self = this
    return new FirmEntity(self, entopts)
  }


  // Entity access: `client.FirmCapacityController().list()` / `client.FirmCapacityController().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  FirmCapacityController(entopts?: Record<string, any>) {
    const self = this
    return new FirmCapacityControllerEntity(self, entopts)
  }


  // Entity access: `client.GasBalanceController().list()` / `client.GasBalanceController().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GasBalanceController(entopts?: Record<string, any>) {
    const self = this
    return new GasBalanceControllerEntity(self, entopts)
  }


  // Entity access: `client.GasBorderTradeController().list()` / `client.GasBorderTradeController().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GasBorderTradeController(entopts?: Record<string, any>) {
    const self = this
    return new GasBorderTradeControllerEntity(self, entopts)
  }


  // Entity access: `client.GasSystem().list()` / `client.GasSystem().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GasSystem(entopts?: Record<string, any>) {
    const self = this
    return new GasSystemEntity(self, entopts)
  }


  // Entity access: `client.GasSystemController().list()` / `client.GasSystemController().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GasSystemController(entopts?: Record<string, any>) {
    const self = this
    return new GasSystemControllerEntity(self, entopts)
  }


  // Entity access: `client.GasTrade().list()` / `client.GasTrade().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GasTrade(entopts?: Record<string, any>) {
    const self = this
    return new GasTradeEntity(self, entopts)
  }


  // Entity access: `client.GasTradeController().list()` / `client.GasTradeController().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GasTradeController(entopts?: Record<string, any>) {
    const self = this
    return new GasTradeControllerEntity(self, entopts)
  }


  // Entity access: `client.GasTransmissionController().list()` / `client.GasTransmissionController().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GasTransmissionController(entopts?: Record<string, any>) {
    const self = this
    return new GasTransmissionControllerEntity(self, entopts)
  }


  // Entity access: `client.GreenController().list()` / `client.GreenController().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GreenController(entopts?: Record<string, any>) {
    const self = this
    return new GreenControllerEntity(self, entopts)
  }


  // Entity access: `client.Interruptible().list()` / `client.Interruptible().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Interruptible(entopts?: Record<string, any>) {
    const self = this
    return new InterruptibleEntity(self, entopts)
  }


  // Entity access: `client.InterruptibleCapacityController().list()` / `client.InterruptibleCapacityController().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  InterruptibleCapacityController(entopts?: Record<string, any>) {
    const self = this
    return new InterruptibleCapacityControllerEntity(self, entopts)
  }


  // Entity access: `client.Nomination().list()` / `client.Nomination().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Nomination(entopts?: Record<string, any>) {
    const self = this
    return new NominationEntity(self, entopts)
  }


  // Entity access: `client.NominationsController().list()` / `client.NominationsController().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  NominationsController(entopts?: Record<string, any>) {
    const self = this
    return new NominationsControllerEntity(self, entopts)
  }


  // Entity access: `client.NpsController().list()` / `client.NpsController().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  NpsController(entopts?: Record<string, any>) {
    const self = this
    return new NpsControllerEntity(self, entopts)
  }


  // Entity access: `client.Renomination().list()` / `client.Renomination().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Renomination(entopts?: Record<string, any>) {
    const self = this
    return new RenominationEntity(self, entopts)
  }


  // Entity access: `client.RenominationsController().list()` / `client.RenominationsController().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  RenominationsController(entopts?: Record<string, any>) {
    const self = this
    return new RenominationsControllerEntity(self, entopts)
  }


  // Entity access: `client.System().list()` / `client.System().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  System(entopts?: Record<string, any>) {
    const self = this
    return new SystemEntity(self, entopts)
  }


  // Entity access: `client.SystemController().list()` / `client.SystemController().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SystemController(entopts?: Record<string, any>) {
    const self = this
    return new SystemControllerEntity(self, entopts)
  }


  // Entity access: `client.TransmissionController().list()` / `client.TransmissionController().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  TransmissionController(entopts?: Record<string, any>) {
    const self = this
    return new TransmissionControllerEntity(self, entopts)
  }


  // Entity access: `client.UmmGasController().list()` / `client.UmmGasController().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UmmGasController(entopts?: Record<string, any>) {
    const self = this
    return new UmmGasControllerEntity(self, entopts)
  }


  // Entity access: `client.UmmRssFeedController().list()` / `client.UmmRssFeedController().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UmmRssFeedController(entopts?: Record<string, any>) {
    const self = this
    return new UmmRssFeedControllerEntity(self, entopts)
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
  config,

  BaseFeature,
  EleringDashboardEntityBase,

  EleringDashboardSDK,
  SDK,
}


