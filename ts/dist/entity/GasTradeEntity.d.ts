import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { GasTrade, GasTradeLoadMatch } from '../EleringDashboardTypes';
declare class GasTradeEntity extends EleringDashboardEntityBase<GasTrade> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: GasTradeEntity): GasTradeEntity;
    load(this: any, reqmatch?: GasTradeLoadMatch, ctrl?: Control): Promise<GasTradeEntity>;
}
export { GasTradeEntity };
