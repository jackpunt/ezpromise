export class EzPromise<T> extends Promise<T> {
  // ensure derived Promises (from .then, .catch, .finally are vanilla Promise)
  // https://stackoverflow.com/questions/48158730/extend-javascript-promise-and-resolve-or-reject-it-inside-constructor
  static get [Symbol.species]() {
    return Promise;
  }
  /** for documented operation do NOT supply an argument */
  constructor(def: (fil: (value: T | PromiseLike<T>) => void, rej: (reason?: any) => void) => void
   = (fil, rej) => {}) {
    let fulfill: (value: T | PromiseLike<T>) => void
    let reject: (reason?: any) => void;
    super((fil, rej) => {
      def(fil, rej); // on the chance that someone supplies an executor
      fulfill = fil;
      reject = rej;
    });
    this.fulfill = (value: T | PromiseLike<T>): this => {
      if (!this._resolved) {
        this._value = value;
        this._resolved = true;
        fulfill(value)
        return this
      }
    }
    this.reject = (reason: any): this => {
      if (!this._resolved) {
        this._reason = reason;
        this._resolved = true;
        reject(reason)
        return this
      }
    }
  }
  /** fulfill promise with value. */
  fulfill: (value: T | PromiseLike<T>) => this;
  /** reject promise with reason. */
  reject: (value: any) => this;
  /** 
   * set resolution handlers.  
   * If you supply on_catch, then on_rej must be valid.
   */
  handle(on_fil: (value: T) => void, on_rej: (reason: any) => void, on_catch?: (reason: any) => void, on_fin?: () => void) {
    this.then(on_fil, on_rej)
    if (!!on_catch) this.catch(on_catch)
    if (!!on_fin) this.finally(on_fin)
  }
  // private: set only once
  _value: T | PromiseLike<T>;
  _reason: any;
  _resolved: boolean;
  // readonly:
  /** true if promise has resolved. */
  get resolved() { return this._resolved }
  /** defined if promise was rejected. */
  get reason() { return this._reason }
  /** defined if promise was fulfilled */
  get value() { return this._value }
}
// https://gist.github.com/oliverfoster/00897f4552cef64653ef14d8b26338a6
// with the trick to supply/invoke a default/dummy method arg.