import { ReduceStore } from './store'

export type Dispatcher = (_:{ [x: string]: any; type: string; }) => Promise<void>

export const createDispatcher =  (store: ReduceStore) => async ({type, ...params}: { [x: string]: any; type: string; }) =>  {
    switch(type) {
      case 'hire':
        const { id } = params
        const salary = window.prompt('Salary?')
        if (salary) {
          const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
          const employee = await fetch('http://localhost:9090/employees',
            { method: 'POST', 
              body: JSON.stringify({ salary, manager: false }), 
              headers}).then(res => res.json())
          const person = await fetch('http://localhost:9090/persons/' + id,
            { method: 'PATCH', 
              body: JSON.stringify({ employeeId: employee.employeeId }), 
              headers}).then(res => res.json())
          store.reduce({type, employee, person})
        }
        break;

      default:
    }
}
