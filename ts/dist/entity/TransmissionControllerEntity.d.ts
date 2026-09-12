import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { TransmissionController, TransmissionControllerLoadMatch } from '../EleringDashboardTypes';
declare class TransmissionControllerEntity extends EleringDashboardEntityBase<TransmissionController> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: TransmissionControllerEntity): TransmissionControllerEntity;
    load(this: any, reqmatch?: TransmissionControllerLoadMatch, ctrl?: Control): Promise<TransmissionControllerEntity>;
}
export { TransmissionControllerEntity };
