import { DispatchAction, GetState, Store, Thunk } from './store'
import { Model, Person, Employee } from './model'

export async function initThunk(dispatch: Store<Model>['dispatch'], _: Store<Model>['getState']) {
  const person_res = await fetch('http://localhost:9090/persons')
  const persons: Person[] = await person_res.json()
  const employee_res = await fetch('http://localhost:9090/employees')
  const employees: Employee[] = await employee_res.json()
  dispatch({type: 'init', payload: { persons, employees }})
}

export function hireThunk(id: number, salary: number): Thunk<Model> {
  return async function(dispatch: DispatchAction, _: GetState<Model>) {
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    const employee = await fetch('http://localhost:9090/employees',
      { method: 'POST', 
        body: JSON.stringify({ salary, manager: false }), 
        headers}).then(res => res.json())
    const person = await fetch('http://localhost:9090/persons/' + id,
      { method: 'PATCH', 
        body: JSON.stringify({ employeeId: employee.employeeId }), 
        headers}).then(res => res.json())
    dispatch({type: 'hire', payload: {employee, person}})    
  }
}

