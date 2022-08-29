let a = { l: 'Hello', m: 800}

let b = { l: a.l, m: a.m, n: function(){ return 'Dog' }}

b = { ...a, n: function() { return 'Dog' }}

function createA(l, m) {
    function getL() {
        return l
    }
    function setL(ll) {
        l = ll
    }
    function getM() {
        return m
    }
    return { getL, setL, getM}
}

function createB(l, m) {
    return { ...createA(l, m), n: function() { return 'Dog' }}
}

function House(address) {
    function getAddress() { return address }
    return { getAddress }
}

function Colored(color) {
    function getColor() { return color }
    return { getColor }
}

function ColoredHouse(address, color) {
    function toString() {}
    return { ...House(address), ...Colored(color), toString }
}
