// Polyfill with chained then using classes

const STATES = {
    PENDING: "PENDING",
    FULFILLED: "FULFILLED",
    REJECTED: "REJECTED"
}

class MyPromise {
  constructor(executorFn) {
    this.resolve = this.#_resolve.bind(this);
    this.reject = this.#_reject.bind(this);

    try {
      executorFn(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  #_resolve() {
    console.log(this);
  }
  #_reject() {}

  then(){

  }

  catch(){

  }
}

new MyPromise((r) => r(10));
