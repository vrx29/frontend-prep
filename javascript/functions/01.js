// A function is a modular, reusable block of statements used to perform a set of related tasks, such as calculating and returning a value based on arguments provided to the function.

// → https://web.dev/learn/javascript/functions


//The body of a non-arrow function also has access to a zero-indexed, array-like arguments object containing any values passed as arguments, whether or not the function definition specifies parameters:
function test(){
    console.log(arguments)
}

// test(3, true, "My string")

function myParentFunction() {
    this.myProperty = true;
    let myFunction = () => {
            console.log( this );
    }
    myFunction();
};

let myInstance = new myParentFunction();

//NEW Keyword
// This inside constructor object refers to object being created 
// Calling a function with new creates a new object using the called function as the "constructor" for that object:

function MyFunction() {
  this.myProperty = true;
}
const myObject = new MyFunction();

myObject.myProperty; //True