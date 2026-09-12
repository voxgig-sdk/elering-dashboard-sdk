import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { InterruptibleCapacityController, InterruptibleCapacityControllerLoadMatch } from '../EleringDashboardTypes';
declare class InterruptibleCapacityControllerEntity extends EleringDashboardEntityBase<InterruptibleCapacityController> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: InterruptibleCapacityControllerEntity): InterruptibleCapacityControllerEntity;
    load(this: any, reqmatch?: InterruptibleCapacityControllerLoadMatch, ctrl?: Control): Promise<InterruptibleCapacityControllerEntity>;
}
export { InterruptibleCapacityControllerEntity };
