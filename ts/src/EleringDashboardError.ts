
import { Context } from './Context'


class EleringDashboardError extends Error {

  isEleringDashboardError = true

  sdk = 'EleringDashboard'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  EleringDashboardError
}

