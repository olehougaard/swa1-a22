class Person {
    private _name: string
    private age: number

    constructor(name: string, age: number) {
        this._name = name
        this.age = age
    }
    
    get name() { return this._name }

    getAge() { return this.age }
}

class Company {
    private name: string
    private address: string
    private employees: Person[]

    constructor(name: string, address: string) {
        this.name = name
        this.address = address
        this.employees = []
    }

    getName() { return this.name}

    getAddress() { return this.address}

    addEmployee(employee: Person) { this.employees.push(employee) }

    removeEmployee(employee: Person) {
        const index = this.employees.indexOf(employee)
        this.employees.splice(index, 1)
    }

    getEmployees() { 
        return [...this.employees] 
    }
}
