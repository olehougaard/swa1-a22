// Higher-order functions

type Pet = { type: string, name: string, age: number }

const pets: Pet[] = [
    {type: 'dog', name:'Fido', age: 7}, 
    {type: 'cat', name: 'Hannibal', age: 2}, 
    {type: 'dog', name: 'Rover', age: 3},
    {type: 'dragon', name: 'Fluffykins', age: 673}]

function namesOf(pets: Pet[]): string[] {
    let names: string[] = []
    for(let pet of pets) {
        names.push(pet.name)
    }
    return names
}

function agesOf(pets: Pet[]): number[] {
    let names: number[] = []
    for(let pet of pets) {
        names.push(pet.age)
    }
    return names
}

function map<T, U>(array: T[], func: (_:T) => U): U[] {
    let names: U[] = []
    for(let element of array) {
        names.push(func(element))
    }
    return names
}

const namesOf1 = (ps: Pet[]) => map(ps, p => p.name)
const agesOf1 = (ps: Pet[]) => map(ps, p => p.age)

const namesOf2 = (ps: Pet[]) => ps.map(p => p.name)
const agesOf2 = (ps: Pet[]) => ps.map(p => p.age)

const ofType = (ps: Pet[], type: string) => ps.filter(p => p.type === type)

const ageOfDragons = (ps: Pet[]) => ps.filter(p => p.type === 'dragon').map(p => p.age)

function sumOfAges(ps: Pet[]): number {
    let sum = 0;
    for(let p of ps) {
        sum = sum + p.age
    }
    return sum
}

function reduce<T, U>(xs: T[], reducer: (_:U, __:T) => U, init: U): U {
    let result: U = init;
    for(let x of xs) {
        result = reducer(result, x)
    }
    return result
}

const sumOfAges2 = (ps: Pet[]) => reduce(ps, (sum, p) => sum + p.age, 0)
const sumOfAges3 = (ps: Pet[]) => ps.reduce((sum, p) => sum + p.age, 0)

function avgAge(ps: Pet[]): number {
    return sumOfAges(ps) / ps.length
}

