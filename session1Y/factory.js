function createObject(x, y) {
    return {
        getX: function() { return x },
        setX: function(_x) { x = _x },
        getY: function() { return y },
        total: function() { return x + y }
    }
}

function createObject2(x, y) {
    function getX() {
        return x
    }
    function setX(_x) {
        x = _x
    }
    function getY() {
        return y
    }
    function total() {
        return x + y
    }
    return {
        getX,
        setX,
        getY,
        total
    }
}

function ColoredObject(color) {
    return {
        getColor() { return color }
    }
}

function House(address) {
    return {
        getAddress() { return address }
    }
}

function ColoredHouse(color, address) {
    let c = ColoredObject(color)
    let h = House(address)
    let toString = () => "some string"
    return {...c, ...h, toString}
}
