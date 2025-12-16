const name: string = "Vineet";
// IF we declare a const name variable with a string type it will give error - Cannot redeclare block-scoped variable 'name'
// TypeScript typically occurs when a file is treated as a script in the global scope, causing a conflict with a built-in global variable (like window.name in the DOM typings) or another variable in a different script file. 
// export {}; // Solves the error

const age: number = 25;
const isStudent: boolean = true;

const marks: number[] = [85, 90, 78];

function print(data: {x: number, y: string}): void {
    console.log(`X: ${data.x}, Y: ${data.y}`);
}

print({x: age, y: "Hello"});

//-----UNION TYPES-----
// A union type is a type formed from two or more other types, representing values that may be any one of those types. 
function printId(id: number | string): void {
    console.log(`ID: ${id}`);
}

printId(101);
printId("202A");


//Type Aliases
// If we want to reuse a type multiple times, we can create a type alias using the type keyword.
type Point = {
    x: number;
    y: number;
};

function displayPoint(point: Point): void {
    console.log(`Point X: ${point.x}, Y: ${point.y}`);
}

displayPoint({x: 10, y: 20});

// You can actually use a type alias to give a name to any type at all, not just an object type. For example, a type alias can name a union type:
type ID = number | string;

function showId(id: ID): void {
    console.log(`ID: ${id}`);
}

showId(303);
showId("404B");


// Interfaces
// An interface is a syntactical contract that an entity should conform to. In TypeScript, interfaces are used to define the structure of an object.
interface PointP {
  x: number;
  y: number;
}
 
function printCoord(pt: PointP) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });

// Difference between Type Aliases and Interfaces
// Both Type Aliases and Interfaces can be used to define the shape of an object. However, interfaces can be extended and implemented, while type aliases cannot. Type aliases can represent more complex types like unions and intersections, which interfaces cannot.
// -- Refer doc = https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
// Union and Intersection Types with Type Aliases
type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

// Intersection Type
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: "Vineet",
    privileges: ["create-server"],
    startDate: new Date()
};

console.log(e1);    


// Literal Types
// Literal types allow you to specify the exact value a string, number, or boolean must have.
type Direction = "up" | "down" | "left" | "right";

function move(direction: Direction): void {
    console.log(`Moving ${direction}`);
}

move("up");
// move("forward"); // Error: Argument of type '"forward"' is not assignable to parameter of type 'Direction'.  

// Enum Types
// Enums allow you to define a set of named constants. TypeScript provides both numeric and string-based enums.
enum Color {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE"
}

function getColorName(color: Color): void {
    console.log(`Color selected: ${color}`);
}

getColorName(Color.Red);
getColorName(Color.Green);


export {}; // This line makes the file a module, preventing global scope conflicts