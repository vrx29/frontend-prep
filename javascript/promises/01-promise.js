const promise = new Promise((resolve, reject)=>{
    setTimeout(()=>resolve("Hello World Promise resolved"), 5000)
})

console.log(promise);
setTimeout(()=>console.log(promise), 6000)

const res = await promise;
console.log(res)