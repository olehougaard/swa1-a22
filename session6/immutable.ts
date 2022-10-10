class Person {
    readonly name: string
    readonly age: number

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}

class Company {
    readonly name: string
    readonly address: string
    private employees: Person[]

    constructor(name: string, address: string, employees: Person[] = []) {
        this.name = name
        this.address = address
        this.employees = [...employees]
    }

    addEmployee(employee: Person): Company {
        return new Company(this.name, this.address, [...this.employees, employee])
     }

    removeEmployee(employee: Person) {
        return new Company(this.name, this.address, this.employees.filter(e => e.name !== employee.name))
    }

    getEmployees() { return [...this.employees] }
}

let c = new Company("", "")
c = c
    .addEmployee(new Person("", 8))
    .addEmployee(new Person("asdlkfj", 88))
