import { DatasetEntity } from './entity/DatasetEntity';
import { IndexStatEntity } from './entity/IndexStatEntity';
import { LabEntity } from './entity/LabEntity';
import { ShelfEntity } from './entity/ShelfEntity';
import { TrafficEntity } from './entity/TrafficEntity';
export type * from './AgentAccessIndexTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { AgentAccessIndexEntityBase } from './AgentAccessIndexEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class AgentAccessIndexSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Dataset(entopts?: Record<string, any>): DatasetEntity;
    IndexStat(entopts?: Record<string, any>): IndexStatEntity;
    Lab(entopts?: Record<string, any>): LabEntity;
    Shelf(entopts?: Record<string, any>): ShelfEntity;
    Traffic(entopts?: Record<string, any>): TrafficEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): AgentAccessIndexSDK;
    tester(testopts?: any, sdkopts?: any): AgentAccessIndexSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof AgentAccessIndexSDK;
export { stdutil, config, BaseFeature, AgentAccessIndexEntityBase, AgentAccessIndexSDK, SDK, };
export type { DirectResult };
