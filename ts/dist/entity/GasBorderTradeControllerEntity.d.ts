import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { GasBorderTradeController, GasBorderTradeControllerLoadMatch } from '../EleringDashboardTypes';
declare class GasBorderTradeControllerEntity extends EleringDashboardEntityBase<GasBorderTradeController> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: GasBorderTradeControllerEntity): GasBorderTradeControllerEntity;
    load(this: any, reqmatch?: GasBorderTradeControllerLoadMatch, ctrl?: Control): Promise<GasBorderTradeControllerEntity>;
}
export { GasBorderTradeControllerEntity };
