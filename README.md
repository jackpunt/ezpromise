# ezpromise
Promise without lexical binding requirements

````
let ezp1 = EzPromise<string>()
ezp1.catch((reason) => { console.log("failed with:", reason)})
exp1.then((value) => { console.log("success:", value)})
exp1.fulfill("good value")
console.log("ezp1 value =", ezp1.value)

let ezp2 = EzPromise<string>()
ezp2.catch((reason) => { console.log("failed with:", reason)})
exp2.then((value) => { console.log("success:", value)})
exp2.reject("rejected")
console.log("ezp2 reason =", ezp2.reason)

````
