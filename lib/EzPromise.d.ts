export declare class EzPromise<T> extends Promise<T> {
    constructor(def?: (res: any, rej: any) => void);
    fulfill: (value: T | PromiseLike<T>) => void;
    reject: (value: any) => void;
    value: T | PromiseLike<T>;
    reason: any;
    resolved: boolean;
}
