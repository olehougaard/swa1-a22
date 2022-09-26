let sa = ['a', 'b', 'c']
let na = [1, 2, 3]
let sna: (string|number)[] = sa
let a: (string|number)[] = sna.concat(na)

let b = (sa as (string|number)[]).concat(na)

for(let sn of b) {
    if (typeof sn === 'string') {
        console.log(sn + "alkdj");
    } else {
        console.log(sn + 1)
    }
}
