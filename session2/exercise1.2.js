function Point(x, y) {
    const getX = () => x
    const getY = () => y
    const moveTo = (_x, _y) => {
        x = _x
        y = _y
    }
    const toString = `(${x}, ${y})`
    return { getX, getY, moveTo, toString }
}

function Circle({center, x, y, radius}) {
    center ??= Point(x, y)
    const getCenterX = () => center.getX()
    const getCenterY = () => center.getY()
    const getRadius = () => radius
    const moveCenterTo = (x, y) => center.moveTo(x, y)
    const toString = `center = ${center.toString()}, radius = ${radius}`
    return { getCenterX, getCenterY, getRadius, moveCenterTo, toString }
}

const c1 = Circle({center: Point(20, 30), radius: 100})
const c2 = Circle({ x: 20, y: 30, radius: 100})
