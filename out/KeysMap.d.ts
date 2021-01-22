/**
 * Store string keys and their short codes
 */
export declare class KeysMap {
    protected codeByKey: Map<string, string>;
    protected nextIndex: number;
    has(key: string): boolean;
    add(key: string): void;
    get(key: string): string | undefined;
    toJsonString(): string;
    toArray(): [string, string][];
}
