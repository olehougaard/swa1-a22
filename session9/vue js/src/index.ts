import { createModel, Employee, Person } from './model'
import viewmodel from './viewmodel'
import { createApp } from 'vue'

async function init() {
  const persons: Person[] = await fetch('http://localhost:9090/persons').then(res => res.json())
  const employees: Employee[] = await fetch('http://localhost:9090/employees').then(res => res.json())
  const theModel = createModel(persons, employees)
  const vm = viewmodel(theModel)
  const app = createApp(vm)
  app.mount('#base')
}

init()
