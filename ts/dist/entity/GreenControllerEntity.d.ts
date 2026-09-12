import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { GreenController, GreenControllerLoadMatch } from '../EleringDashboardTypes';
declare class GreenControllerEntity extends EleringDashboardEntityBase<GreenController> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: GreenControllerEntity): GreenControllerEntity;
    load(this: any, reqmatch?: GreenControllerLoadMatch, ctrl?: Control): Promise<GreenControllerEntity>;
}
export { GreenControllerEntity };
