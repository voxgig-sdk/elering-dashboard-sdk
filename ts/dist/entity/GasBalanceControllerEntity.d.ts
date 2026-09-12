import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { GasBalanceController, GasBalanceControllerLoadMatch } from '../EleringDashboardTypes';
declare class GasBalanceControllerEntity extends EleringDashboardEntityBase<GasBalanceController> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: GasBalanceControllerEntity): GasBalanceControllerEntity;
    load(this: any, reqmatch?: GasBalanceControllerLoadMatch, ctrl?: Control): Promise<GasBalanceControllerEntity>;
}
export { GasBalanceControllerEntity };
