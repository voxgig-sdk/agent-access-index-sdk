import { AgentAccessIndexEntityBase } from '../AgentAccessIndexEntityBase';
import type { AgentAccessIndexSDK } from '../AgentAccessIndexSDK';
import type { Control } from '../types';
import type { Shelf, ShelfLoadMatch, ShelfListMatch } from '../AgentAccessIndexTypes';
declare class ShelfEntity extends AgentAccessIndexEntityBase<Shelf> {
    constructor(client: AgentAccessIndexSDK, entopts: any);
    make(this: ShelfEntity): ShelfEntity;
    load(this: any, reqmatch?: ShelfLoadMatch, ctrl?: Control): Promise<ShelfEntity>;
    list(this: any, reqmatch?: ShelfListMatch, ctrl?: Control): Promise<ShelfEntity[]>;
}
export { ShelfEntity };
