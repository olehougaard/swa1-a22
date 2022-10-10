type Person = {
  readonly name: string
  readonly age: number
}

const createPerson = (name: string, age: number) => ({name, age})

type Company = {
  readonly name: string
  readonly address: string
  readonly employees: Readonly<Person[]>
}

const createCompany = (name: string, address: string, employees: Person[] = []): Company => 
  ({name, address, employees})

const addEmployee = (c: Company, e: Person): Company => 
    createCompany(c.name, c.address, [...c.employees, e])
const removeEmployee = (c: Company, e: Person): Company => 
    createCompany(c.name, c.address, c.employees.filter(ee => e.name !== ee.name))
