class Person {
    readonly name: string
    readonly age: number

    constructor(name, age) {
        this.name = name
        this.age = age
    }
}

class Company {
    readonly name: string
    readonly address: string
    private employees: Person[]

    constructor(name, address, employees = []) {
        this.name = name
        this.address = address
        this.employees = employees
    }

    addEmployee(employee: Person) { 
     }

    removeEmployee(employee: Person) {
    }

    getEmployees() { return ? }
}
