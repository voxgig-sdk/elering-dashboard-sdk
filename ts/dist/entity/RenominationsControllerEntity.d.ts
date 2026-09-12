import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { RenominationsController, RenominationsControllerLoadMatch } from '../EleringDashboardTypes';
declare class RenominationsControllerEntity extends EleringDashboardEntityBase<RenominationsController> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: RenominationsControllerEntity): RenominationsControllerEntity;
    load(this: any, reqmatch?: RenominationsControllerLoadMatch, ctrl?: Control): Promise<RenominationsControllerEntity>;
}
export { RenominationsControllerEntity };
