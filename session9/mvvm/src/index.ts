import viewmodel from './viewmodel'
import view from './view'
import { createModel } from './model'

const init = async function() {
    const persons = await fetch('http://localhost:9090/persons').then(res => res.json())
    const employees = await fetch('http://localhost:9090/employees').then(res => res.json())
    const theModel = createModel(persons, employees)
    const vm = viewmodel(theModel)
    view(window, vm)
}

init()
