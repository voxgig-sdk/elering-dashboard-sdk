import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { GasSystemController, GasSystemControllerLoadMatch } from '../EleringDashboardTypes';
declare class GasSystemControllerEntity extends EleringDashboardEntityBase<GasSystemController> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: GasSystemControllerEntity): GasSystemControllerEntity;
    load(this: any, reqmatch?: GasSystemControllerLoadMatch, ctrl?: Control): Promise<GasSystemControllerEntity>;
}
export { GasSystemControllerEntity };
