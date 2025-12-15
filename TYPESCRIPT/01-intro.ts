interface User {
    name: string;
    age: number;
    isAdmin: boolean;
}

const user1: User = {
    name: "Alice",
    age: 30,
    isAdmin: true
};

console.log(user1);