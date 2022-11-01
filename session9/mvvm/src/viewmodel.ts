import { BoundProperty, boundProperty } from "./bound_property"
import { Data, Model } from "./model"

export type ViewModel = {
  bindSalary: (p: BoundProperty<number>) => void,
  bindPersonData: (p: BoundProperty<Data[]>) => void,
  hire: (id: number) => void,
  personData: BoundProperty<Data[]>
}

export default (init_model: Model): ViewModel => {
  let model = init_model

  const salary = boundProperty.initialized(0)
  const personData = boundProperty.initialized(model.personData())
  
  const hire = async (id: number) => {
    if (salary.get() > 0) {
      const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
      const employee_res = await fetch('http://localhost:9090/employees', { method: 'POST', body: JSON.stringify({salary: salary.get(), manager:false}), headers })
      const employee = await employee_res.json()
      const { employeeId } = employee
      const person_res = await fetch('http://localhost:9090/persons/' + id, { method: 'PATCH', body: JSON.stringify({ employeeId }), headers })
      const person = await person_res.json()
      model = model.addEmployee(employee).updatePerson(person)
      personData.set(model.personData())
      salary.set(0)
    }  
  }  

  return { bindSalary: salary.doubleBind, bindPersonData: personData.singleBind, hire, personData }
}
