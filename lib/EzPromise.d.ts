export declare class EzPromise<T> extends Promise<T> {
    static get [Symbol.species](): PromiseConstructor;
    /** for documented operation do NOT supply an argument */
    constructor(def?: (fil: (value: T | PromiseLike<T>) => void, rej: (reason?: any) => void) => void);
    /** fulfill promise with value. */
    fulfill: (value: T | PromiseLike<T>) => this;
    /** reject promise with reason. */
    reject: (value: any) => this;
    /**
     * set resolution handlers.
     * If you supply on_catch, then on_rej must be valid.
     */
    handle(on_fil: (value: T) => void, on_rej: (reason: any) => void, on_catch?: (reason: any) => void, on_fin?: () => void): void;
    _value: T | PromiseLike<T>;
    _reason: any;
    _resolved: boolean;
    /** true if promise has resolved. */
    get resolved(): boolean;
    /** defined if promise was rejected. */
    get reason(): any;
    /** defined if promise was fulfilled */
    get value(): T | PromiseLike<T>;
}
