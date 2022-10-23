import * as ReactDOM from 'react-dom';
import { Model, Person, Employee, createModel } from './model'
import store from './store'
import createView from './view'
import { createDispatcher} from './dispatcher'

async function init() {
    try {
        const person_res = await fetch('http://localhost:9090/persons')
        const persons: Person[] = await person_res.json()
        const employee_res = await fetch('http://localhost:9090/employees')
        const employees: Employee[] = await employee_res.json()
        const model: Model = createModel(persons, employees)
        let renderer = (dom:JSX.Element) => ReactDOM.render(dom, document.getElementById('root'))
        const theStore = store(model)
        let dispatcher = createDispatcher(theStore)
        const view = createView(dispatcher)
        theStore.addObserver(m => renderer(view(m)))
        renderer(view(model))
    } catch (err) {
        console.log(err)
    }
}

init()
