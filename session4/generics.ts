function identity<T>(x: T): T {
    return x
}

const s: string = identity("Hello") // Without generics, s would be Object/any or something like that

function nCopies<T>(n: number, value: T): T[] {
    const copies = new Array<T>(n)
    for(let i: number = 0; i < n; i++) {
        copies[i] = value
    }
    return copies
}

const hellos = nCopies(7, "Hello")

type Vector = {
    dx: number,
    dy: number
}

type ColoredVector = Vector & { color: number }

function transpose<T extends Vector>(v: T): T {
    const temp = v.dx
    v.dx = v.dy
    v.dy = temp
    return v
}

const cv = transpose({dx: 10, dy: 22, color: 0x3248f9})
