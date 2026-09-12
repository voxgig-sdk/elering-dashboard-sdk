import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { Balance, BalanceLoadMatch } from '../EleringDashboardTypes';
declare class BalanceEntity extends EleringDashboardEntityBase<Balance> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: BalanceEntity): BalanceEntity;
    load(this: any, reqmatch?: BalanceLoadMatch, ctrl?: Control): Promise<BalanceEntity>;
}
export { BalanceEntity };
