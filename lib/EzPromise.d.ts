export declare class EzPromise<T> extends Promise<T> {
    static get [Symbol.species](): PromiseConstructor;
    /** for documented operation do NOT supply an argument */
    constructor(def?: (res: any, rej: any) => void);
    /** fulfill promise with value. */
    fulfill: (value: T | PromiseLike<T>) => void;
    /** reject promise with reason. */
    reject: (value: any) => void;
    /** set resolution handlers.
     *
     * if you supply on_catch, then on_rej must be valid.
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
