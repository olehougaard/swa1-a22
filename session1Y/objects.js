let obj = {
    x: 100,
    y: 200
}

let obj2 = {
    x: 100,
    y: 200
}

console.log(obj === obj2)

> obj.z
//undefined
> obj.z.toString()
//Uncaught TypeError: Cannot read properties of undefined (reading 'toString')
> obj.z = 'cat'
//'cat'
> obj
{ x: 100, y: 200, z: 'cat' }
> obj.z = undefined
undefined
> obj
{ x: 100, y: 200, z: undefined }
> delete obj.z
true
> obj
{ x: 100, y: 200 }