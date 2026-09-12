import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { Interruptible, InterruptibleLoadMatch } from '../EleringDashboardTypes';
declare class InterruptibleEntity extends EleringDashboardEntityBase<Interruptible> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: InterruptibleEntity): InterruptibleEntity;
    load(this: any, reqmatch?: InterruptibleLoadMatch, ctrl?: Control): Promise<InterruptibleEntity>;
}
export { InterruptibleEntity };
