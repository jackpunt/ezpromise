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
        this.fulfill = (value) => { this.value = value; this.resolved = true; fulfill(value); };
        this.reject = (reason) => { this.reason = reason; this.resolved = true; reject(reason); };
    }
}
exports.EzPromise = EzPromise;
// https://gist.github.com/oliverfoster/00897f4552cef64653ef14d8b26338a6
// with the trick to supply/invoke a default/dummy method arg.
//# sourceMappingURL=EzPromise.js.map