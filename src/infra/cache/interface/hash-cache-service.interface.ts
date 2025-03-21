export interface HashCacheServiceInterface {
    hSet(key: string, field: string, value: string): Promise<void>;
    hGet(key: string, field: string): Promise<string | null>;
    hDel(key: string, field: string): Promise<void>;
    hGetAll(key: string): Promise<Record<string, string>>;
}
