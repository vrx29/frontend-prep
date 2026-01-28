// Read file remove extra spaces
const fs = require("fs");

function fileReadWrite() {
  fs.readFile("a.txt", "utf-8", (error, data) => {
    const inp = data.replace(/\s+/g, " ");
    console.log(inp);
    fs.writeFile("a.txt", inp, (err) => {
      if (err) throw err;
      console.log("Files written");
    });
  });
}


function clock(){
   const date = new Date();
   const hour = date.getHours()
   console.log(`${hour}:${date.getMinutes()}:${date.getSeconds()}`)
   const ampm = hour > 12 ? "PM" : "AM"
   console.log(`${hour > 12 ? hour - 12 : hour}:${date.getMinutes()}:${date.getSeconds()} ${ampm}`);
}
clock()