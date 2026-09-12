import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { System, SystemLoadMatch } from '../EleringDashboardTypes';
declare class SystemEntity extends EleringDashboardEntityBase<System> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: SystemEntity): SystemEntity;
    load(this: any, reqmatch?: SystemLoadMatch, ctrl?: Control): Promise<SystemEntity>;
}
export { SystemEntity };
