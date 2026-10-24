import { AgentAccessIndexEntityBase } from '../AgentAccessIndexEntityBase';
import type { AgentAccessIndexSDK } from '../AgentAccessIndexSDK';
import type { Control } from '../types';
import type { Dataset, DatasetListMatch } from '../AgentAccessIndexTypes';
declare class DatasetEntity extends AgentAccessIndexEntityBase<Dataset> {
    constructor(client: AgentAccessIndexSDK, entopts: any);
    make(this: DatasetEntity): DatasetEntity;
    list(this: any, reqmatch?: DatasetListMatch, ctrl?: Control): Promise<DatasetEntity[]>;
}
export { DatasetEntity };
