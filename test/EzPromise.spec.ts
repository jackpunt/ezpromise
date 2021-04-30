import { EzPromise } from "../src/EzPromise";

var zpromise1 = new EzPromise<number>()
test("EzPromise.constructor", () => {
  expect(zpromise1).toBeInstanceOf(EzPromise)
})
// console.log("zpromise=", zpromise)

test("promise.fulfill(val)", done => {
  let val = 5
  let nret: number = 0
  zpromise1.then((n) => {
    expect(n).toEqual(val)
    expect(zpromise1.value).toEqual(val)
    expect(zpromise1.resolved).toBe(true)
    done();
  }, (rej) => {
    expect(rej).toBe("not invoked")
  })
  zpromise1.fulfill(val)
})

var zpromise2 = new EzPromise<number>()
test("promise.reject(val)", done => {
  let val = "reject"
  let nret: number = 0
  zpromise2.then((n) => {
    expect(n).toBe("not invoked")
  }, (rej) => {
    expect(rej).toEqual(val)
    expect(zpromise2.value).toBeUndefined()
    expect(zpromise2.reason).toBe(val)
    expect(zpromise2.resolved).toBe(true)
    done();
  })
  zpromise2.reject(val)
})
var zpromise3 = new EzPromise<number>()
test("promise.catch(val)", done => {
  let val = "catch"
  let nret: number = 0
  zpromise3.then((n) => {
    expect(n).toBe("not invoked")
  }, (rej) => {
    expect(rej).toBe(val)
  })
  zpromise3.catch((rej) => {
    expect(rej).toEqual(val)
    expect(zpromise3.value).toBeUndefined()
    expect(zpromise3.reason).toBe(val)
    expect(zpromise3.resolved).toBe(true)
    done();
  })
  zpromise3.reject(val)
})
var zpromise4 = new EzPromise<string>()
test("promise.handle fil", done => {
  let value = "value4"
  zpromise4.handle((val) => {
    expect(val).toEqual(value)
    done()
  }, null)
  zpromise4.fulfill(value)
})
var zpromise5 = new EzPromise<string>()
test("promise.handle rej", done => {
  let value = "value5"
  zpromise5.handle((val) => {
    expect(val).toBe("not invoked")
    done()
   }, 
  (rej: any) => {
    expect(rej).toEqual(value)
    done()
  })
  zpromise5.reject(value)
})
var zpromise6 = new EzPromise<string>()
test("promise.handle catch", done => {
  let value = "value6"
  zpromise6.handle(null, () => {}, // cannot .catch() without a (rej) => {}
    (rej) => {
      expect(rej).toEqual(value)
      done()
    })
  zpromise6.reject(value)
})
var zpromise7 = new EzPromise<string>()
test("promise.handle fin", done => {
  let value = "value7"
  zpromise7.handle(null, null, null, 
  () => {
    expect(value).toEqual(value)
    done()
  })
  zpromise7.fulfill(value)
})
