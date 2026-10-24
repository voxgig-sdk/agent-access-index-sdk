import { AgentAccessIndexEntityBase } from '../AgentAccessIndexEntityBase';
import type { AgentAccessIndexSDK } from '../AgentAccessIndexSDK';
import type { Control } from '../types';
import type { Lab, LabListMatch } from '../AgentAccessIndexTypes';
declare class LabEntity extends AgentAccessIndexEntityBase<Lab> {
    constructor(client: AgentAccessIndexSDK, entopts: any);
    make(this: LabEntity): LabEntity;
    list(this: any, reqmatch?: LabListMatch, ctrl?: Control): Promise<LabEntity[]>;
}
export { LabEntity };
