export type Person = {
    id: number,
    name: string,
    employeeId?: number
}

export type Employee = {
    employeeId: number,
    salary: number,
    manager: boolean
}

export type Data = Person & {    
    salary?: number,
    manager?: boolean
}

export type DataFilter = (d:Data) => boolean

export type Model = {
    personData(): Data[]
    updatePerson(p: Person): Model
    addEmployee(e: Employee): Model
    filtered(filter: DataFilter): Model
    all(): Model
}

export const createModel = (persons: Person[], employees: Employee[], filter: (Data) => boolean = () => true): Model => {
    const employeeMap: { [eId: number]: Employee } = {}
    employees.forEach(e => employeeMap[e.employeeId] = e)

    const personData: () => Data[] = () => persons
        .map(p => ({ ...p, ...employeeMap[p.employeeId]}))
        .filter(filter)

    const updatePerson: (p:Person) => Model = p => createModel(persons.map(pp => p.id == pp.id? p : pp), employees, filter)
    const addEmployee: (e:Employee) => Model = e => createModel(persons, employees.concat(e), filter)

    const filtered: (f:DataFilter) => Model = filter => createModel(persons, employees, filter )
    const all: () => Model = () => createModel(persons, employees)

    return { personData, updatePerson, addEmployee, filtered, all }
}
