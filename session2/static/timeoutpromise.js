function timeoutPromise(ms, generator) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(generator()), ms)
    })
}

let i = 0

function gen() {
    return ++i
}

let p = timeoutPromise(500, gen)
p.then(j => console.log(j))
