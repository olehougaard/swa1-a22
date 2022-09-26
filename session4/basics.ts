let x = 7

function inc(x?: number): number {
    return (x ?? 0) + 1
}

function incAlt(x = 0) {
    return x + 1
}

let a: number[] = [1, 2, 3]

// a.push("hello") - ERROR

let b: any[] = []

b.push(2)
b.push("hello")
