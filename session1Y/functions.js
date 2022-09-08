function add(x, y) {
    return x + y
}

console.log(add(2, 3))

console.log(add.toString())

console.log(add.call(33, 2, 3))

function addThis(x, y) {
    return this + x + y
}

console.log(addThis.call(33, 2, 3))

let obj = {
    x: 50,
    a: 'dog'
}

function twiceX() {
    return 2 * this.x
}

console.log(twiceX.call(obj))

obj.twiceX = twiceX
console.log(obj.twiceX())

let obj = {
    x: 100,
    y: 200,
    total: function() { return this.x + this.y; }
}

console.log(obj.total())

let t = obj.total
console.log(t())
