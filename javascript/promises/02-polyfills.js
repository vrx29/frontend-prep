// Promise.All
function myPromiseAll(taskList){
    const result = [];
    let completed = 0;
    return new Promise((resolve, reject)=>{
        taskList.map((promise, index)=>{
            promise.then(val=>{
                result[index] = val;
                completed+=1;
                if(completed == taskList.length){
                    resolve(result)
                }
            }).catch(error=>{
                reject(error)
            })
        })
    })
}

function task(time){
    return new Promise((res,rej)=>{
        setTimeout(function(){
            if(time > 5000) rej("Rejected")
            res(time);
        } ,time)
    })
}

// const taskList = [task(1000), task(2000), task(5000), task(6000)];

// myPromiseAll(taskList).then(res=>console.log(res)).catch(err=>console.log(err))


// Promise.Any
function myPromiseAny(taskList){
    const result = [];
    let counter = 0;

    return new Promise((resolve, reject)=>{
        taskList.map((promise)=>{
            promise.then(val=>resolve(val)).catch(err=>{
                result[counter] = err;
                counter+=1;
                if(counter == taskList.length) reject(result)
            })
        })
    })
}


// const taskList = [task(6000), task(20000), task(10000)];
// myPromiseAny(taskList).then((ans)=>console.log(ans)).catch(err=>console.log(err))

// Promise.race
function race(taskList){
    return new Promise((resolve, reject)=>{
        taskList.forEach(p => {
            p.then(res=>resolve(res)).catch(e=>reject(e))
        });
    })
}

const taskList = [task(6000), task(5505), task(5001)];
// race(taskList).then((ans)=>console.log(ans)).catch(err=>console.log(err))



