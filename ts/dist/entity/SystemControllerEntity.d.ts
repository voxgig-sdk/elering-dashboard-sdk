import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { SystemController, SystemControllerLoadMatch } from '../EleringDashboardTypes';
declare class SystemControllerEntity extends EleringDashboardEntityBase<SystemController> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: SystemControllerEntity): SystemControllerEntity;
    load(this: any, reqmatch?: SystemControllerLoadMatch, ctrl?: Control): Promise<SystemControllerEntity>;
}
export { SystemControllerEntity };
