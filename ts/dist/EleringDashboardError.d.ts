import { Context } from './Context';
declare class EleringDashboardError extends Error {
    isEleringDashboardError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { EleringDashboardError };
