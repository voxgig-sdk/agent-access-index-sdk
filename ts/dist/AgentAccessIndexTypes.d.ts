export interface Dataset {
    agent_can_register: string;
    agent_reports?: Record<string, any>;
    answer?: string;
    checked_at?: string;
    error?: string;
    family: string;
    family_title?: string;
    final_url?: string;
    fingerprint?: string;
    first_pass_gate?: string;
    front_door?: Record<string, any>;
    gate: string;
    gate_label?: string;
    http_status?: number;
    id: string;
    manual?: Record<string, any>;
    name: string;
    note?: string;
    page?: string;
    page_title?: string;
    question?: string;
    reese_account?: Record<string, any>;
    research?: Record<string, any>;
    rules_mentions?: Record<string, any>;
    rules_pages?: any[];
    rules_quotes?: any[];
    signup_url?: string;
    stepped?: any[];
    tone?: string;
}
export interface DatasetListMatch {
    agent_can_register?: string;
    agent_reports?: Record<string, any>;
    answer?: string;
    checked_at?: string;
    error?: string;
    family?: string;
    family_title?: string;
    final_url?: string;
    fingerprint?: string;
    first_pass_gate?: string;
    front_door?: Record<string, any>;
    gate?: string;
    gate_label?: string;
    http_status?: number;
    id?: string;
    manual?: Record<string, any>;
    name?: string;
    note?: string;
    page?: string;
    page_title?: string;
    question?: string;
    reese_account?: Record<string, any>;
    research?: Record<string, any>;
    rules_mentions?: Record<string, any>;
    rules_pages?: any[];
    rules_quotes?: any[];
    signup_url?: string;
    stepped?: any[];
    tone?: string;
}
export interface IndexStat {
    by_family?: Record<string, any>;
    by_gate?: Record<string, any>;
    note?: string;
    shelves: number;
}
export interface IndexStatLoadMatch {
    by_family?: Record<string, any>;
    by_gate?: Record<string, any>;
    note?: string;
    shelves?: number;
}
export interface Lab {
    before?: any[];
    experiments?: any[];
    updated?: string;
}
export interface LabListMatch {
    before?: any[];
    experiments?: any[];
    updated?: string;
}
export interface Shelf {
    agent_can_register: string;
    agent_reports?: Record<string, any>;
    answer?: string;
    checked_at?: string;
    error?: string;
    family: string;
    family_title?: string;
    final_url?: string;
    fingerprint?: string;
    first_pass_gate?: string;
    front_door?: Record<string, any>;
    gate: string;
    gate_label?: string;
    http_status?: number;
    id: string;
    manual?: Record<string, any>;
    name: string;
    note?: string;
    page?: string;
    page_title?: string;
    question?: string;
    reese_account?: Record<string, any>;
    research?: Record<string, any>;
    rules_mentions?: Record<string, any>;
    rules_pages?: any[];
    rules_quotes?: any[];
    signup_url?: string;
    stepped?: any[];
    tone?: string;
}
export interface ShelfLoadMatch {
    id: string;
}
export interface ShelfListMatch {
    agent_can_register?: string;
    family?: string;
}
export interface Traffic {
    ai_paths?: any[];
    crawler_tokens?: any[];
    daily: any[];
    distinct_mcp_or_report_callers?: number;
    human_referrers?: any[];
    human_src_tags?: any[];
    mcp_clients?: any[];
    note?: string;
    since: string;
}
export interface TrafficListMatch {
    day?: number;
}
