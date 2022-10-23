import { Model, Employee, Person } from './model'

export type Observer = (_:Model) => void
export type Action = 
      { type: 'hire', employee: Employee, person: Person }
    | { type: 'none' }

export type ReduceStore = {
  addObserver(observer: Observer): void
  reduce(action: Action): void
}

export default (init_model: Model): ReduceStore => {
  let model = init_model
  const observers: Observer[] = []

  function reducer(action: Action, model: Model) {
    switch(action.type) {
      case 'hire':
        const { employee, person } = action
        return model.addEmployee(employee!).updatePerson(person!)

      default:
        return model
    }
  }

  const addObserver = (observer: Observer): void => {
    observers.push(observer)
  }

  const reduce = (action: Action ) => {
    model = reducer(action, model)
    observers.forEach(o => o(model))
  }

  return { addObserver, reduce }
}
