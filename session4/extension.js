function createHouse(address) {
    function getAddress() { return address }
    return { getAddress }
}

function createColored(color) {
    function getColor() { return color }
    return { getColor }
}

function ColoredHouse(address, color) {
    return { ...createHouse(address), ...createColored(color) }
}
