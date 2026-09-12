import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { Firm, FirmLoadMatch } from '../EleringDashboardTypes';
declare class FirmEntity extends EleringDashboardEntityBase<Firm> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: FirmEntity): FirmEntity;
    load(this: any, reqmatch?: FirmLoadMatch, ctrl?: Control): Promise<FirmEntity>;
}
export { FirmEntity };
