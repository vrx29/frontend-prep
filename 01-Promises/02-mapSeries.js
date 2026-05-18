// Implement a mapSeries async function that is similar to be Array.map() but returns a promise that resolves on the list of output

const mapSeries = (arr, fn) => {
    return new Promise((resolve, reject) => {
        const output =[]

        arr.reduce(async (acc, curr) => {
            const res = await acc()
            const currRes = await curr()
        }, Promise.resolve([]))
    })
}