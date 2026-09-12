import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { NominationsController, NominationsControllerLoadMatch } from '../EleringDashboardTypes';
declare class NominationsControllerEntity extends EleringDashboardEntityBase<NominationsController> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: NominationsControllerEntity): NominationsControllerEntity;
    load(this: any, reqmatch?: NominationsControllerLoadMatch, ctrl?: Control): Promise<NominationsControllerEntity>;
}
export { NominationsControllerEntity };
