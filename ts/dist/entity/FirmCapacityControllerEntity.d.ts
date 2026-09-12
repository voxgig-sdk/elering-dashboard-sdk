import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { FirmCapacityController, FirmCapacityControllerLoadMatch } from '../EleringDashboardTypes';
declare class FirmCapacityControllerEntity extends EleringDashboardEntityBase<FirmCapacityController> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: FirmCapacityControllerEntity): FirmCapacityControllerEntity;
    load(this: any, reqmatch?: FirmCapacityControllerLoadMatch, ctrl?: Control): Promise<FirmCapacityControllerEntity>;
}
export { FirmCapacityControllerEntity };
