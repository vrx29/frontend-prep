function add(x: number, y: number): number {
    return x + y;
}

const sum: number = add(10, 20);
console.log(`Sum: ${sum}`);

//function that takes a callback
function fetchData(callback: (data: string) => void): void {
    // Simulating data fetching
    const data = "Fetched Data";
    callback(data);
}

fetchData((data: string) => {
    console.log(data);
});

