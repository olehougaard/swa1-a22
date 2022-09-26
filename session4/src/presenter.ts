import { Employee, Person, Model } from './model'
import { View } from './view'

export type Presenter = {
  onAction(e: Event): Promise<void>
}

export function createPresenter(init_model: Model, view: View): Presenter {
  let model: Model = init_model

  const onAction = async ({type, ...params}) =>  {
    switch(type) {
      case 'hire':
        const { id } = params
        const salary = view.prompt('Salary?')
        if (salary) {
          try {
            const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
            const employeeResponse = await fetch('http://localhost:9090/employees', { method: 'POST', body: JSON.stringify({salary, manager:false}), headers })
            if (!employeeResponse.ok) throw new Error(await employeeResponse.text())
            const employee: Employee = await employeeResponse.json()
            const personResponse = await fetch('http://localhost:9090/persons/' + id, { method: 'PATCH', body: JSON.stringify(employee), headers })
            const person: Person = await personResponse.json()
            model = model.addEmployee(employee).updatePerson(person)
            view.update(model)
          } catch (e) {
            view.displayError(e.toString())
          }
        }
        break;
    }
  }

  return { onAction }
}
