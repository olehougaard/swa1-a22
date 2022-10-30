import { Model, createModel } from './model'
import { configureStore } from '@reduxjs/toolkit'

/*
Note: None of these types need to be defined, they can be inferred correctly by TypeScript.
The types are in here for documentation purposes.
*/
export type Observer = () => void

export type Action = {
  type: string,
  payload?: any,
  error?: any,
  meta?: any
}

export type DispatchAction = (action: Action) => void
export type GetState<State> = () => State

export type Thunk<State> = (dispatch: DispatchAction, getState: GetState<State>) => Promise<void>

export type DispatchActionOrThunk<State> = (a: Action | Thunk<State>) => void

export type Store<State> = {
  subscribe(observer: Observer): void
  dispatch: DispatchActionOrThunk<State>
  getState: GetState<State>
  replaceReducer(nextReducer: (s: State, a: Action) => State): void
}

function reducer(model: Model = createModel([], []), action: Action) {
  switch(action.type) {
    case 'init':
      const { persons, employees} = action.payload
      return createModel(persons, employees)
    case 'hire':
      const { employee, person } = action.payload
      return model.addEmployee(employee).updatePerson(person)
    default:
      return model
  }
}

export default configureStore({
  reducer
})
