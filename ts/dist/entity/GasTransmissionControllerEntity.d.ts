import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { GasTransmissionController, GasTransmissionControllerLoadMatch } from '../EleringDashboardTypes';
declare class GasTransmissionControllerEntity extends EleringDashboardEntityBase<GasTransmissionController> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: GasTransmissionControllerEntity): GasTransmissionControllerEntity;
    load(this: any, reqmatch?: GasTransmissionControllerLoadMatch, ctrl?: Control): Promise<GasTransmissionControllerEntity>;
}
export { GasTransmissionControllerEntity };
