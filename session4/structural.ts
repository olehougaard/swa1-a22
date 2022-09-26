type Sizable = {
    getSize(): number
}

type Sized = {
    getSize(): number
}

function size(s: Sizable): number {
    return s.getSize()
}

const s: Sized = { getSize() {return 0 }}

size(s)
