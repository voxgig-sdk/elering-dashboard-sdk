import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { UmmGasController, UmmGasControllerLoadMatch } from '../EleringDashboardTypes';
declare class UmmGasControllerEntity extends EleringDashboardEntityBase<UmmGasController> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: UmmGasControllerEntity): UmmGasControllerEntity;
    load(this: any, reqmatch?: UmmGasControllerLoadMatch, ctrl?: Control): Promise<UmmGasControllerEntity>;
}
export { UmmGasControllerEntity };
