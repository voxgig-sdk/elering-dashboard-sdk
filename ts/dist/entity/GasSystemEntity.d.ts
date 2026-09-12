import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { GasSystem, GasSystemLoadMatch } from '../EleringDashboardTypes';
declare class GasSystemEntity extends EleringDashboardEntityBase<GasSystem> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: GasSystemEntity): GasSystemEntity;
    load(this: any, reqmatch?: GasSystemLoadMatch, ctrl?: Control): Promise<GasSystemEntity>;
}
export { GasSystemEntity };
