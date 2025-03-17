export interface ListCacheServiceInterface {
    lPush(key: string, value: string): Promise<void>;
    rPush(key: string, value: string): Promise<void>;
    lRange(key: string, start: number, stop: number): Promise<string[]>;
    lPop(key: string): Promise<string | null>;
    rPop(key: string): Promise<string | null>;
}