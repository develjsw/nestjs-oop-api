export interface SetCacheServiceInterface {
    sAdd(key: string, value: string): Promise<void>;
    sMembers(key: string): Promise<string[]>;
    sRem(key: string, value: string): Promise<void>;
    sCard(key: string): Promise<number>;
}
