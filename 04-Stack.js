// Queue using Two Stack

function Stack() {
    var items = []
    var top = 0;

    this.push = function(val){
        items[top++] = val
    }

    this.pop = function() {
        return items[--top];
    }

    this.peek = function(){
        return items[top - 1];
    }

    this.isEmpty = function(){
        return top == 0;
    }

    this.clear = function(){
        top = 0;
    }

    this.size = function(){
        return top;
    }
}


var stack = new Stack()
stack.push(10)
stack.push(20)
console.log(stack.peek())
console.log(stack.pop())
console.log(stack.peek())
console.log(stack.size())