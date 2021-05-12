"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EzPromise = void 0;
class EzPromise extends Promise {
    /** for documented operation do NOT supply an argument */
    constructor(def = (fil, rej) => { }) {
        let fulfill;
        let reject;
        super((fil, rej) => {
            def(fil, rej); // on the chance that someone supplies an executor
            fulfill = fil;
            reject = rej;
        });
        this.fulfill = (value) => {
            if (!this._resolved) {
                this._value = value;
                this._resolved = true;
                fulfill(value);
                return this;
            }
        };
        this.reject = (reason) => {
            if (!this._resolved) {
                this._reason = reason;
                this._resolved = true;
                reject(reason);
                return this;
            }
        };
    }
    // ensure derived Promises (from .then, .catch, .finally are vanilla Promise)
    // https://stackoverflow.com/questions/48158730/extend-javascript-promise-and-resolve-or-reject-it-inside-constructor
    static get [Symbol.species]() {
        return Promise;
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
    /** true if promise has resolved. */
    get resolved() { return this._resolved; }
    /** defined if promise was rejected. */
    get reason() { return this._reason; }
    /** defined if promise was fulfilled */
    get value() { return this._value; }
}
exports.EzPromise = EzPromise;
// https://gist.github.com/oliverfoster/00897f4552cef64653ef14d8b26338a6
// with the trick to supply/invoke a default/dummy method arg.
//# sourceMappingURL=EzPromise.js.map