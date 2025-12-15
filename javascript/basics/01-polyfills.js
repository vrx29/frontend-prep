// What are polyfills?
/* -------------------------- */
/* Polyfills are pieces of code (usually JavaScript) used to provide modern functionality on older browsers that do not natively support it. They "fill in" the gaps by implementing features that are missing in those environments.
*/

// Example: Polyfill for Array.prototype.flat

const arr = [1, 2, 3, 4, 5, [6, 4, 3, 5, [1, 2, 3]]];

function myFlat(arr, depth = 1, output = []) {
    if(depth < 1) {
        return output.push(arr)
    }

    for(const item of arr) {
        if(Array.isArray(item)) {
            myFlat(item, depth - 1, output);
        } else {
            output.push(item);
        }
}

    return output;
}

console.log(myFlat(arr, 4)); // [1, 2, 3, 4, 5, 6, 4, 3, 5, 1, 2, 3]

//Polyfill for Array.prototype.filter

if (!Array.prototype.myFilter) {
  Array.prototype.myFilter = function(callback, thisArg) {
    if (this == null) {
      throw new TypeError('Array.prototype.myFilter called on null or undefined');
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    const result = [];
    const array = Object(this);
    const len = array.length >>> 0;

    for (let i = 0; i < len; i++) {
      if (i in array) {
        const element = array[i];
        if (callback.call(thisArg, element, i, array)) {
          result.push(element);
        }
      }
    }

    return result;
  };
}

// Example usage of the polyfill
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.myFilter(num => num % 2 === 0

// Transpilers
/* -------------------------- */
/* Transpilers are tools that convert code written in one programming language or version into another. In the context of JavaScript, transpilers like Babel convert modern JavaScript (ES6 and beyond) into older versions (like ES5) to ensure compatibility with older browsers.
*/

//eg: arrow functions are not supported in older browsers
const add = (a, b) => a + b;

// Transpiled version using ES5 syntax
function addTranspiled(a, b) {
  return a + b;
}
