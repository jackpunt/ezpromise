// See also: https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md
// Which indicates that what we call 'resolved' should pro'ly be called 'settled'
// And we maybe don't do the right thing when fulfilled with a Promise/thenable.
/**
 * A: can provide non-lexical invocation to .fulfill() and .reject()
 * B: when resolved, can tell if .rejected, and obtain .value or .reason
 * C: whenResolved(fil, rej) will invoke fil() or rej() *now* rather than "at earlist" if already .resolved
 *
 * .whenResolved() is not supported if \<T extends Promise>
 */
export class EzPromise extends Promise {
    /** for documented operation do NOT supply an argument */
    constructor(def = (fil, rej) => { }) {
        let fulfill;
        let reject;
        super((fil, rej) => {
            def(fil, rej); // on the chance that someone supplies an executor
            fulfill = fil;
            reject = rej;
        });
        this._innerPromise = 0;
        this.fulfill = (value) => {
            if (!this._resolved) {
                this._value = value;
                this._resolved = true; // may be 'settled' but not 'resolved' if value: PromiseLike<T>
                this._rejected = false;
                fulfill(value); // "as soon as possible" all the .then(fil) listeners will be invoked
                return this;
            }
        };
        this.reject = (reason) => {
            if (!this._resolved) {
                this._reason = reason;
                this._resolved = true;
                this._rejected = true;
                reject(reason); // "as soon as possible" all the .then(rej) listeners will be invoked
                return this;
            }
        };
        this.catch((reason) => null); // a default, no-nothing catch. User can override.
    }
    // ensure derived Promises (from .then, .catch, .finally are vanilla Promise)
    // https://stackoverflow.com/questions/48158730/extend-javascript-promise-and-resolve-or-reject-it-inside-constructor
    static get [Symbol.species]() {
        return Promise;
    }
    /**
     * Invoke handlers synchronously if already resolved. (maybe *before* other .then handlers)
     *
     * Dodgy or failing if \<T extends Promise>:
     * we don't distinguish a chained resolution from a final resolution.
     * @param fil if already fulfilled, invoke now
     * @param rej if already rejected, invoke now
     * @returns this if already resolved; else .then(fil, rej) as Promise<void>
     */
    whenResolved(fil, rej) {
        if (this._value instanceof Promise) {
            this._innerPromise = 1;
            this._value.then((val) => { this._innerValue = val; this._innerPromise = 2; }, (reason) => { this._innerValue = reason; this._innerPromise = 3; });
        }
        if (this._resolved && this._innerPromise != 1) {
            (this._rejected)
                ? (!!rej && rej(this._innerPromise == 3 ? this._innerValue : this.reason))
                : (!!fil && fil(this._innerPromise == 2 ? this._innerValue : this.value));
            return this;
        }
        else {
            return this.then(fil, rej);
        }
    }
    /**
     * set resolution handlers.
     * If you supply on_catch, then on_rej must be valid.
     */
    handle(on_fil, on_rej, on_catch, on_fin) {
        this.then(on_fil, on_rej);
        if (!!on_catch)
            this.catch(on_catch);
        if (!!on_fin)
            this.finally(on_fin);
    }
    // readonly:
    /** true if EzPromise has resolved (or at least: settled). */
    get resolved() { return this._resolved; }
    get rejected() { return this._rejected; }
    /** defined if EzPromise was rejected. */
    get reason() { return this._reason; }
    /** defined if EzPromise was fulfilled (may be chained to PromiseLike<T>) */
    get value() { return this._value; }
    /** if you know Promise is resolved and not chained to a PromiseLike\<T> */
    get valueAsT() { return this.value; }
}
// https://gist.github.com/oliverfoster/00897f4552cef64653ef14d8b26338a6
// with the trick to supply/invoke a default/dummy method arg.
//# sourceMappingURL=EzPromise.js.map