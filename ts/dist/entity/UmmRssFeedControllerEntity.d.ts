import { EleringDashboardEntityBase } from '../EleringDashboardEntityBase';
import type { EleringDashboardSDK } from '../EleringDashboardSDK';
import type { Control } from '../types';
import type { UmmRssFeedController, UmmRssFeedControllerLoadMatch } from '../EleringDashboardTypes';
declare class UmmRssFeedControllerEntity extends EleringDashboardEntityBase<UmmRssFeedController> {
    constructor(client: EleringDashboardSDK, entopts: any);
    make(this: UmmRssFeedControllerEntity): UmmRssFeedControllerEntity;
    load(this: any, reqmatch?: UmmRssFeedControllerLoadMatch, ctrl?: Control): Promise<UmmRssFeedControllerEntity>;
}
export { UmmRssFeedControllerEntity };
