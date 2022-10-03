interface CanReceivePayment {
    getCpr(): string;
    getSalary(): number;
}

class Person {
    private name: string
    private cpr: string
    private address: string
    private birthday: Date

    constructor(name: string, cpr: string, address: string, birthday: Date) {
        this.name = name
        this.cpr = cpr
        this.address = address
        this.birthday = birthday
    }

    getName(): string {
        return this.name
    }

    getCpr(): string {
        return this.cpr
    }

    getAddress(): string {
        return this.address
    }

    setAddress(address: string): void {
        this.address = address
    }

    getBirthday(): Date {
        return this.birthday
    }

    getCprGender(): "Male" | "Female" {
        let lastDigit: number = parseInt(this.cpr.charAt(this.cpr.length - 1))
        if (lastDigit % 2 == 0)
            return "Female"
        else
            return "Male"
    }
}

class Employee extends Person implements CanReceivePayment {
    private salary: number

    constructor(name: string, cpr: string, address: string, birthday: Date, salary: number) {
        super(name, cpr, address, birthday)
        this.salary = salary
    }

    getSalary(): number {
        return this.salary
    }

    giveRaise(raise: number): void {
        this.salary += raise
    }
}

function f(e: CanReceivePayment): void {
    console.log(e.getSalary())
}

const e = new Employee("", "saldkfj-ljk", "dlaækfjasklj", new Date(), 0987)
f(e)
