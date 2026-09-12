import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { NpsController, NpsControllerLoadMatch } from '../EleringDashboardTypes';
declare class NpsControllerEntity extends EleringDashboardEntityBase<NpsController> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: NpsControllerEntity): NpsControllerEntity;
    load(this: any, reqmatch?: NpsControllerLoadMatch, ctrl?: Control): Promise<NpsControllerEntity>;
}
export { NpsControllerEntity };
