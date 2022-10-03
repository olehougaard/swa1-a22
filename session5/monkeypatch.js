let m = 4
let n = 3
// m.power(n)

Number.prototype.power = function(n) {
    if (!Number.isInteger(n) || n < 0)
        return NaN
    else if (n === 0)
        return 1
    else if (n % 2 === 0)
        return (this * this).power(n / 2)
    else   
        return this * this.power(n - 1)
}

console.log(m.power(n))
