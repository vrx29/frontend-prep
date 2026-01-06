const asyncTask = (i) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>resolve("Completing" + i + " task"), 100*i)
    });
}

const promises = [
  asyncTask(3),
  asyncTask(1),
  asyncTask(7),
  asyncTask(2),
  asyncTask(5),
];


const asyncTaskExecuter = function(promises){
    promises.reduce((acc, curr)=>{
        return acc.then(()=>{
            return curr.then(val=>console.log(val))
        })
    }, Promise.resolve())
}

asyncTaskExecuter(promises);

function t(){
    console.log(this)
}
t();