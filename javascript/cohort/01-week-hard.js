/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
    constructor(){
        this.result = 0;
    }

    add(num){
        this.result += num;
    }

    subtract(num){
        this.result -= num;
    }

    multiply(num){
        this.result *= num;
    }

    divide(num){
        this.result = this.result / num;
    }

    clear(){
        this.result = 0;
    }

    getResult(){
        return this.result;
    }

    calculate(inpStr){
        const sanitizedInp = inpStr.replace(/\s+/g, "")
        console.log(typeof sanitizedInp)
        const computed = Function(`"use strict"; return (${sanitizedInp})`)();
        console.log(eval(sanitizedInp))
    }
}

const calc = new Calculator();

// calc.add(10)
// console.log(calc.getResult())
// calc.calculate(`10 +   2 *    (   6 - (4 + 1) / 2) + 7`)


/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
    constructor(){
        this.todos = []
    }

    add(todo){
        this.todos.push(todo)
    }
    remove(todoIndx){
        this.todos = this.todos.filter((val,idx) => idx != todoIndx)
    }

    getAll(){
        return this.todos;
    }
}

const todos = new Todo();
todos.add("First")
todos.add("Second")
todos.remove(0)
console.log(todos.getAll())
