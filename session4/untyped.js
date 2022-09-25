function power(m, n) {
    if (!Number.isInteger(n) || n < 0)
        throw new Error("Invalid input")
    if (n === 0)
        return m
    else if (n % 2 === 0)
        return power(m * m, n / 2)
    else   
        return m * power(m, n - 1)
}

// toUpperCase is a String method. You can make it more general if you like.
function uppercase(s) {
    return s.toUpperCase()
}

// Make sure the switch doesn't need a default case
function rgb(color) {
    switch(color) {
    case "Red": 
        return 0xff0000;
    case "Green": 
        return 0x00ff00;
    case "Blue": 
        return 0x0000ff;
    }
}

function addValues(a) {
    let sum = 0
    for(let i = 0; i < a.length; i++) {
        sum += a[i].value
    }    
    return sum
}    

function addValuesString(a) {
    let total = ""
    for(let i = 0; i < a.length; i++) {
        total += a.get(i)
    }    
    return total
}    

function reverse(a) {
    const result = new Array(a.length)
    for(let i = 0; i < a.length; i++) {
        result[i] = a[a.length - 1 - i]
    }    
    return result
}    

function concat(a, b) {
    const c = a
    return c.concat(b)
}    
