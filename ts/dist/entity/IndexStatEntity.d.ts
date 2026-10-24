import { AgentAccessIndexEntityBase } from '../AgentAccessIndexEntityBase';
import type { AgentAccessIndexSDK } from '../AgentAccessIndexSDK';
import type { Control } from '../types';
import type { IndexStat, IndexStatLoadMatch } from '../AgentAccessIndexTypes';
declare class IndexStatEntity extends AgentAccessIndexEntityBase<IndexStat> {
    constructor(client: AgentAccessIndexSDK, entopts: any);
    make(this: IndexStatEntity): IndexStatEntity;
    load(this: any, reqmatch?: IndexStatLoadMatch, ctrl?: Control): Promise<IndexStatEntity>;
}
export { IndexStatEntity };
