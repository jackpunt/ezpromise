import { EzPromise } from "../src/EzPromise";

test("EzPromise.createAndFill", () => {
  let val = 3
  let zpromise = new EzPromise<number>().fulfill(val)
  expect(zpromise).toBeInstanceOf(EzPromise)
  expect(zpromise.resolved).toBe(true)
  expect(zpromise.value).toBe(3)
})
// console.log("zpromise=", zpromise)

test("promise.fulfill(val)", done => {
  let zpromise = new EzPromise<number>()
  let val = 5
  zpromise.then((n) => {
    expect(n).toEqual(val)
    expect(zpromise.value).toEqual(val)
    expect(zpromise.resolved).toBe(true)
    done();
  }, (rej) => {
    expect(rej).toBe("not invoked")
  })
  zpromise.fulfill(val)
})

test("promise.reject(val)", done => {
  let zpromise = new EzPromise<number>()
  let val = "reject"
  zpromise.then((n) => {
    expect(n).toBe("not invoked")
  }, (rej) => {
    expect(rej).toEqual(val)
    expect(zpromise.value).toBeUndefined()
    expect(zpromise.reason).toBe(val)
    expect(zpromise.resolved).toBe(true)
    done();
  })
  zpromise.reject(val)
})
test("promise.catch(val)", done => {
  let zpromise = new EzPromise<number>()
  let val = "catch"
  zpromise.then((n) => {
    expect(n).toBe("not invoked")
  }, (rej) => {
    expect(rej).toBe(val)
  })
  zpromise.catch((rej) => {
    expect(rej).toEqual(val)
    expect(zpromise.value).toBeUndefined()
    expect(zpromise.reason).toBe(val)
    expect(zpromise.resolved).toBe(true)
    done();
  })
  zpromise.reject(val)
})
test("promise.handle fil", done => {
  let zpromise = new EzPromise<string>()
  let value = "value4"
  zpromise.handle((val) => {
    expect(val).toEqual(value)
    done()
  }, null)
  zpromise.fulfill(value)
})
test("promise.handle rej", done => {
  let zpromise = new EzPromise<string>()
  let value = "value5"
  zpromise.handle((val) => {
    expect(val).toBe("not invoked")
    done()
   }, 
  (rej: any) => {
    expect(rej).toEqual(value)
    done()
  })
  zpromise.reject(value)
})
test("promise.handle catch", done => {
  let zpromise = new EzPromise<string>()
  let value = "value6"
  zpromise.handle(null, () => {}, // cannot .catch() without a (rej) => {}
    (rej) => {
      expect(rej).toEqual(value)
      done()
    })
  zpromise.reject(value)
})
test("promise.handle fin", done => {
  let zpromise = new EzPromise<string>()
  let value = "value7"
  zpromise.handle(null, null, null, 
  () => {
    expect(value).toEqual(value)
    done()
  })
  zpromise.fulfill(value)
})
