import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { Nomination, NominationLoadMatch } from '../EleringDashboardTypes';
declare class NominationEntity extends EleringDashboardEntityBase<Nomination> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: NominationEntity): NominationEntity;
    load(this: any, reqmatch?: NominationLoadMatch, ctrl?: Control): Promise<NominationEntity>;
}
export { NominationEntity };
