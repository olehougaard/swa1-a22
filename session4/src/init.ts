import { createModel, Model, Person, Employee } from './model'
import { createPresenter, Presenter } from './presenter'
import { createView, View } from './view'

function display(view: View, persons: Person[], employees: Employee[] = []) {
    const model: Model = createModel(persons, employees)
    const presenter: Presenter = createPresenter(model, view)
    view.listen(presenter.onAction)
    view.update(model)
}

async function init() {
    const view: View = createView(window)
    try {
        const response = await fetch('http://localhost:9090/persons')
        if (!response.ok) throw response.statusText
        const persons: Person[] = await response.json()
        const empRes = await fetch('http://localhost:9090/employees')
        if (!empRes.ok) throw empRes.statusText
        const employees: Employee[] = await empRes.json()
        display(view, persons, employees)
    } catch (e) {
        view.displayError(e.toString())
    }
}

init()
