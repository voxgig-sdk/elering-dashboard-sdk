import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { Renomination, RenominationLoadMatch } from '../EleringDashboardTypes';
declare class RenominationEntity extends EleringDashboardEntityBase<Renomination> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: RenominationEntity): RenominationEntity;
    load(this: any, reqmatch?: RenominationLoadMatch, ctrl?: Control): Promise<RenominationEntity>;
}
export { RenominationEntity };
