import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { GasTradeController, GasTradeControllerLoadMatch } from '../EleringDashboardTypes';
declare class GasTradeControllerEntity extends EleringDashboardEntityBase<GasTradeController> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: GasTradeControllerEntity): GasTradeControllerEntity;
    load(this: any, reqmatch?: GasTradeControllerLoadMatch, ctrl?: Control): Promise<GasTradeControllerEntity>;
}
export { GasTradeControllerEntity };
