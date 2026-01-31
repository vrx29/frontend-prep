/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
  return new Promise((res, rej) => {
    setTimeout(res, n * 1000);
  });
}

// wait(5).then(()=>console.log("Complete")).catch(err=>console.log(err))

// Ques 2
/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {}

/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */

function wait1(t) {
  return new Promise((res, rej) => {
    setTimeout(() => res("Wait 1 completed"), t * 1000);
  });
}

function wait2(t) {
  return new Promise((res, rej) => {
    setTimeout(() => res("Wait 2 completed"), t * 1000);
  });
}

function wait3(t) {
  return new Promise((res, rej) => {
    setTimeout(() => res("Wait 2 completed"), t * 1000);
  });
}

function calculateTime(t1, t2, t3) {
  const start = performance.now();

  return Promise.all([wait1(t1), wait2(t2), wait3(t3)]).then((res) =>{
    console.log(res)
    return performance.now() - start;
  }
  );
}

 calculateTime(1, 3, 2).then(time=>console.log(time))


 /*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */



function calculateTime2(t1, t2, t3) {
    const start = performance.now();

    return wait1(t1).then(()=>wait2(t2)).then(()=>wait3(t3)).then(()=>{
        return performance.now() - start;
    })
}

 calculateTime2(1, 3, 2).then(time=>console.log(time))

