export declare class EzPromise<T> extends Promise<T> {
    static get [Symbol.species](): PromiseConstructor;
    constructor(def?: (res: any, rej: any) => void);
    fulfill: (value: T | PromiseLike<T>) => void;
    reject: (value: any) => void;
    _value: T | PromiseLike<T>;
    _reason: any;
    _resolved: boolean;
    get resolved(): boolean;
    get reason(): any;
    get value(): T | PromiseLike<T>;
}
