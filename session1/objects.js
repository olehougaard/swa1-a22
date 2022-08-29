let obj = {
    x: 100,
    y: 200
}

let obj2 = {
    x: 100,
    y: 200
}

let obj3 = obj2

console.log(obj === obj2)
console.log(obj2 === obj3)

console.log(obj.z)
obj.z = 78
console.log(obj.z)

function addThat(x, y) {
    return x + y
}

console.log(addThis(2, 4))

function addThisAndThat(x, y) {
    return this + x + y
}

console.log(addThisAndThat.call(5, 2, 3)) // 10


let p = {x: 100, y: 200}
function addXY() {
    return this.x + this.y
}
console.log(addXY.call(p)) // Method call?

p.addXY = addXY
console.log(p.addXY())

p = {
    x: 100,
    y: 200,
    addXY: function() { return this.x + this.y } // x and y not in scope
}
