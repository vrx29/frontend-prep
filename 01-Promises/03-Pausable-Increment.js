/*
Create a pausable auto incrementer in JavaScript, which takes an initial value and steps as input and increments the initial value with given steps every second. The incrementer can be paused and resumed back.

It is one of the classic problems which use two of the trickiest concepts of JavaScript.

1. Timers.
2. Closure.

Use the setInterval to auto increment the values, whereas wrapping the start and stop function inside the closure and returning them, so that the incrementor can be controlled while still maintaining the value.
*/

const timer = (init = 0, step = 1) => {
  let intervalId;
  let count = init;

  const startTimer = () => {
    intervalId = setInterval(() => {
      console.log(count);
      count = count + step;
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    intervalId = null;
  };

  return { startTimer, stopTimer}
};

