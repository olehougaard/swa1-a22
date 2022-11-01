import { BoundProperty, boundProperty } from "./bound_property"
import { Data } from "./model"
import { ViewModel } from "./viewmodel"

export default (window: Window, viewmodel: ViewModel) => {
    const document = window.document
    const table_body = document.getElementById('employee_data')
    const salary = document.getElementById('salary') as HTMLInputElement

    const salaryProperty: BoundProperty<string> = boundProperty.fromAttribute(salary, 'value', l => salary.addEventListener('change', l))

    viewmodel.bindSalary(boundProperty.computed(salaryProperty, parseFloat, x => x.toString()))

    const personRow = (p: Data) => {
        const tr = document.createElement('tr')
        tr.insertCell().append(p.id.toString())
        tr.insertCell().append(p.name)
        if (p.employeeId) {
            tr.insertCell().append(p.employeeId.toString())
            tr.insertCell().append(p.salary?.toString() ?? "0")
            tr.insertCell().append(Boolean(p.manager).toString())
        } else {
            const button = tr.insertCell().appendChild(document.createElement('button'))
            button.append("Hire")
            button.onclick = () => {
                viewmodel.hire(p.id)
            }
            tr.insertCell()
            tr.insertCell()
        }
        return tr
    }

   
    const personData: BoundProperty<Data[]> = boundProperty.initialized([])

    personData.onChange(persons => table_body.replaceChildren(...persons.map(personRow)))
    viewmodel.bindPersonData(personData)
}
