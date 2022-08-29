function f(x, y) {
    function g(y) {
        return x + y
    }

    return 2 * g(y - 1)
}

// Java
/*
public class C {
    private int x;

    public int getX() {
        return x; // (this.)x is in the scope of getX()
    }

    public void setX(int x) {
        this.x = x; // this.x is NOT in the scope of setX()
    }
}

C c = new C();
c.setX(9); // Here we bind this to c in the setX method call.
*/

let c = {
    x: 10,
    setX: function(x) { this.x = x }
}

let f = c.setX
f(9)

function g(x) {
    function f(y) {
        return x + y
    } 
    return f
}

//Alternatively: const g = x => y => x + y

function createC() {
    let x = 10
    function getX() { return x}
    function setX(xx) {
        x = xx
    }
    return { getX: getX, setX: setX }
}
