"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EzPromise = void 0;
class EzPromise extends Promise {
    constructor(def = (res, rej) => { }) {
        let fulfill;
        let reject;
        super((fil, rej) => {
            def(fil, rej);
            fulfill = fil;
            reject = rej;
        });
        this.fulfill = (value) => {
            if (!this._resolved) {
                this._value = value;
                this._resolved = true;
                fulfill(value);
            }
        };
        this.reject = (reason) => {
            if (!this._resolved) {
                this._reason = reason;
                this._resolved = true;
                reject(reason);
            }
        };
    }
    // ensure derived Promises (from .then, .catch, .finally are vanilla Promise)
    // https://stackoverflow.com/questions/48158730/extend-javascript-promise-and-resolve-or-reject-it-inside-constructor
    static get [Symbol.species]() {
        return Promise;
    }
    // readonly:
    get resolved() { return this._resolved; }
    get reason() { return this._reason; }
    get value() { return this._value; }
}
exports.EzPromise = EzPromise;
// https://gist.github.com/oliverfoster/00897f4552cef64653ef14d8b26338a6
// with the trick to supply/invoke a default/dummy method arg.
//# sourceMappingURL=EzPromise.js.map