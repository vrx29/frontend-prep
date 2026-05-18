// Implement a function that takes list of async functions as input and executes them in series one at a time.

const asyncFn = (i) => {
  return new Promise((res, rej) => {
    setTimeout(() => res(`Completed task ${i}`), i * 1000);
  });
};

const tasks = [asyncFn(3), asyncFn(2), asyncFn(1), asyncFn(4)];

const asyncSeriesExecutor = async (tasks) => {
  for (let task of tasks) {
    const res = await task;
    console.log(res);
  }
};

// asyncSeriesExecutor(tasks)

// Approach 2 : Execute using Recurssion
const asyncSeriesExecutorRec = async (tasks) => {
  const task = tasks.shift();

  const res = await task;
  console.log(res);

  if (tasks.length) {
    asyncSeriesExecutorRec(tasks);
  }
};

// asyncSeriesExecutorRec(tasks)

// Approach 3: Array.reduce
const asyncExecutoreReduce = (tasks) => {
  tasks.reduce(async (acc, curr) => {
    // const r = await curr;
    // console.log(r)
    return acc.then(() => {
      return curr.then((r) => console.log(r));
    });
  }, Promise.resolve());
};
// asyncExecutoreReduce(tasks)

// ------------------------------------------------
// Execute async functions in parallel
// Implement a function that takes a list of async functions as input and a callback function and executes the input tasks in parallel.

function asyncParallel(tasks, cb) {
  let taskCompleted = 0;
  tasks.forEach((task) => {
    task.then((r) => console.log(r));
    taskCompleted++;
  });
}

// asyncParallel(tasks, (res)=>console.log(res))

// Retry Promise N number of times
// Implement a function in JS that retries promises N number of times with delay between each call

function retry(fn, retries, delay = 50, finalError = "Failed") {
  return new Promise((resolve, reject) => {
    function attempt(currentAttempt) {
      fn()
        .then(resolve)
        .catch((error) => {
          if (currentAttempt >= retries) {
            reject(error);
            return;
          }

          console.log(`Retrying... Attempt ${currentAttempt + 1}`);

          setTimeout(() => {
            attempt(currentAttempt + 1);
          }, delay);
        });
    }

    attempt(0);
  });
}

const testRetryFn = () => {
  let counter = 0;
  return async () => {
    counter++;
    if (counter < 6) {
      throw new Error("Not yet");
    }
  };
};

const test = async () => {
  await retry(testRetryFn(), 10);
  console.log("Success");
  await retry(testRetryFn(), 3);
  console.log("Error")
};

test().catch(console.error);
