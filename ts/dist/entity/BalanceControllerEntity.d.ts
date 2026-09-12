import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { BalanceController, BalanceControllerLoadMatch } from '../EleringDashboardTypes';
declare class BalanceControllerEntity extends EleringDashboardEntityBase<BalanceController> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: BalanceControllerEntity): BalanceControllerEntity;
    load(this: any, reqmatch?: BalanceControllerLoadMatch, ctrl?: Control): Promise<BalanceControllerEntity>;
}
export { BalanceControllerEntity };
