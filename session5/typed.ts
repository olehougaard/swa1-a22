function power(m: number, n: number): number {
    if (!Number.isInteger(n) || n < 0)
        return NaN
    if (n === 0)
        return m
    else if (n % 2 === 0)
        return power(m * m, n / 2)
    else   
        return m * power(m, n - 1)
}

// toUpperCase is a String method. You can make it more general if you like.
function uppercaseSimple(s: string): string {
    return s.toUpperCase()
}

function uppercase<T extends {toUpperCase(): T}>(s: T): T {
    return s.toUpperCase()
}

// Make sure the switch doesn't need a default case
function rgb(color: "Red" | "Green" | "Blue"): number {
    switch(color) {
    case "Red": 
        return 0xff0000;
    case "Green": 
        return 0x00ff00;
    case "Blue": 
        return 0x0000ff;
    }
}

function addValues(a: {value: number}[]): number {
    let sum = 0
    for(let i = 0; i < a.length; i++) {
        sum += a[i].value
    }    
    return sum
}    

function addValuesString(a: {length: number, get(_: number): String}): String {
    let total = ""
    for(let i = 0; i < a.length; i++) {
        total += a.get(i)
    }    
    return total
}    

function reverse<T>(a: T[]): T[] {
    const result = new Array<T>(a.length)
    for(let i = 0; i < a.length; i++) {
        result[i] = a[a.length - 1 - i]
    }    
    return result
}    

function concat<T, U>(a: T[], b: U[]): (T|U)[] {
    const c: (T|U)[] = a
    return c.concat(b)
}    
