/**
 * A: can provide non-lexical invocation to .fulfill() and .reject()
 * B: when resolved, can tell if .rejected, and obtain .value or .reason
 * C: whenResolved(fil, rej) will invoke fil() or rej() *now* rather than "at earlist" if already .resolved
 *
 * .whenResolved() is not supported if \<T extends Promise>
 */
export declare class EzPromise<T> extends Promise<T> {
    static get [Symbol.species](): PromiseConstructor;
    /** for documented operation do NOT supply an argument */
    constructor(def?: (fil: (value: T | PromiseLike<T>) => void, rej: (reason?: any) => void) => void);
    /** fulfill promise with value. */
    fulfill: (value: T | PromiseLike<T>) => this;
    /** reject promise with reason. */
    reject: (value: any) => this;
    /**
     * Invoke handlers synchronously if already resolved. (maybe *before* other .then handlers)
     *
     * Dodgy or failing if \<T extends Promise>:
     * we don't distinguish a chained resolution from a final resolution.
     * @param fil if already fulfilled, invoke now
     * @param rej if already rejected, invoke now
     * @returns this if already resolved; else .then(fil, rej) as Promise<void>
     */
    whenResolved(fil?: (value: T) => void, rej?: (reason?: any) => void): this | Promise<void>;
    /**
     * set resolution handlers.
     * If you supply on_catch, then on_rej must be valid.
     */
    handle(on_fil: (value: T) => void, on_rej: (reason: any) => void, on_catch?: (reason: any) => void, on_fin?: () => void): void;
    _value: T | PromiseLike<T>;
    _reason: any;
    _resolved: boolean;
    _rejected: boolean;
    _innerPromise: number;
    _innerValue: T | any;
    /** true if EzPromise has resolved (or at least: settled). */
    get resolved(): boolean;
    get rejected(): boolean;
    /** defined if EzPromise was rejected. */
    get reason(): any;
    /** defined if EzPromise was fulfilled (may be chained to PromiseLike<T>) */
    get value(): T | PromiseLike<T>;
    /** if you know Promise is resolved and not chained to a PromiseLike\<T> */
    get valueAsT(): T;
}
