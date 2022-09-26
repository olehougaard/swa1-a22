type ObjectType = {
    x: number,
    y: number
}

let obj: ObjectType = {
    x: 100,
    y: 200
}

let obj2: ObjectType = {
    x: 100,
    y: 200
}

type OtherType = {
    x: number,
    y: number,
    z: number
}

let obj3: OtherType = {...obj2, z: 78 }

console.log(obj === obj2)
console.log(obj2 === obj3)

console.log(obj.z)
obj.z = 78
console.log(obj.z)

let p = {
    x: 100,
    y: 200,
    distance() { return Math.sqrt(this.x * this.x + this.y * this.y) }
}
