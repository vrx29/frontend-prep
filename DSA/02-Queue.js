// Queue
// FIFO 

// Queue with Javascript array methods
/*
function Queue() {
    let items = []

    this.enqueue = function(element){
        items.push(element)
    }
    this.dequeue = function(){
        return items.shift();
    }
    this.front = function(){
        return items[0]
    }
    this.rear = function(){
        return items[items.length - 1]
    }
    this.isEmpty = function(){
        return items.length == 0
    }
    this.size = function() {
        return items.length;
    }
    this.print = function(){
        console.log(items.toString())
    }
}

*/

// Queue using ES6 classes
class Queue{
    constructor(){
        this.items = [];
    }

     enqueue = function(element){
        this.items.push(element)
    }
    dequeue = function(){
        return this.items.shift();
    }
    front = function(){
        return this.items[0]
    }
    rear = function(){
        return this.items[this.items.length - 1]
    }
    isEmpty = function(){
        return this.items.length == 0
    }
    size = function() {
        return this.items.length;
    }
    print = function(){
        console.log(this.items.toString())
    }
}