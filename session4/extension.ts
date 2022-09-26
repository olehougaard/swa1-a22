type House = {
    getAddress(): string
}

function createHouse(address: string): House {
    function getAddress() { return address }
    return { getAddress }
}

type Colored = {
    getColor(): number
}

function createColored(color: number): Colored {
    function getColor() { return color }
    return { getColor }
}

function ColoredHouse(address: string, color: number): House & Colored {
    return { ...createHouse(address), ...createColored(color) }
}

const ch = ColoredHouse('Somewhere', 0x2af323)
console.log(ch.getAddress())
console.log(ch.getColor())
