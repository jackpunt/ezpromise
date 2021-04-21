export class EzPromise<T> extends Promise<T> {
  // ensure derived Promises (from .then, .catch, .finally are vanilla Promise)
  // https://stackoverflow.com/questions/48158730/extend-javascript-promise-and-resolve-or-reject-it-inside-constructor
  static get [Symbol.species]() {
    return Promise;
  }
  constructor(def = (res, rej) => { }) {
    let fulfill: (value: T | PromiseLike<T>) => void
    let reject: (reason?: any) => void;
    super((fil, rej) => {
      def(fil, rej);
      fulfill = fil;
      reject = rej;
    });
    this.fulfill = (value: T | PromiseLike<T>) => {
      if (!this._resolved) {
        this._value = value;
        this._resolved = true;
        fulfill(value)
      }
    }
    this.reject = (reason: any) => {
      if (!this._resolved) {
        this._reason = reason;
        this._resolved = true;
        reject(reason)
      }
    }
  }
  fulfill: (value: T | PromiseLike<T>) => void;
  reject: (value: any) => void;
  // private: set only once
  _value: T | PromiseLike<T>;
  _reason: any;
  _resolved: boolean;
  // readonly:
  get resolved() { return this._resolved }
  get resaon() { return this._reason }
  get value() { return this._value }
}
// https://gist.github.com/oliverfoster/00897f4552cef64653ef14d8b26338a6
// with the trick to supply/invoke a default/dummy method arg.