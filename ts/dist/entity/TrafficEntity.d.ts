import { AgentAccessIndexEntityBase } from '../AgentAccessIndexEntityBase';
import type { AgentAccessIndexSDK } from '../AgentAccessIndexSDK';
import type { Control } from '../types';
import type { Traffic, TrafficListMatch } from '../AgentAccessIndexTypes';
declare class TrafficEntity extends AgentAccessIndexEntityBase<Traffic> {
    constructor(client: AgentAccessIndexSDK, entopts: any);
    make(this: TrafficEntity): TrafficEntity;
    list(this: any, reqmatch?: TrafficListMatch, ctrl?: Control): Promise<TrafficEntity[]>;
}
export { TrafficEntity };
