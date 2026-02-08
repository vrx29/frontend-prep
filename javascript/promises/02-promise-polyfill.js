// Creating custom Promise

function PromisePolyFill(executor) {
  let onResolve,
      onReject,
      fulfilled = false,
      rejected = false,
      called = false,
      value;

  function resolve(v) {
    fulfilled = true;
    value = v;

    if (typeof onResolve === "function") { // for async
      console.log("inside resolve")
      onResolve(value);
      called = true;
    }
  }

  function reject(reason) {
    rejected = true;
    value = reason;

    if (typeof onReject === "function") {
      onReject(value);
      called = true;
    }
  }

  this.then = function (callback) {
    onResolve = callback;

    if (fulfilled && !called) { // for sync
      console.log("inside then")
      called = true;
      onResolve(value);
    }
    return this;
  };

  this.catch = function (callback) {
    onReject = callback;

    if (rejected && !called) {
      called = true;
      onReject(value);
    }
    return this;
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

const promise1 = new PromisePolyFill((resolve, reject) => {
  resolve(2)
})

promise1.then(res => {
  console.log(res)
  return res + 1;
}).then(res=>console.log(res))
