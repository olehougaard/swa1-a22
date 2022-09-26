
type ObjectType = {
    x: number
    y: number
    z?: number
}

let obj: ObjectType = {
    x: 100,
    y: 200
}

type ObjectType2 = {
    x: number
    y: number
}

let obj2: ObjectType2 = {
    x: 100,
    y: 200
}

let obj3: ObjectType2 = obj

console.log(obj === obj2)
console.log(obj2 === obj3)

console.log(obj.z)
obj.z = 78
console.log(obj.z)

type Point = {
    x: number,
    y: number,
    distance(): number
}

let p: Point = {
    x: 100,
    y: 200,
    distance() { return Math.sqrt(this.x * this.x + this.y * this.y) }
}
