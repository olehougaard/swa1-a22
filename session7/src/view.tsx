import * as React from 'react'
import { Model, Data } from './model'
import {Dispatcher} from './dispatcher'

type Props = {person: Data, dispatcher: Dispatcher}

const EmployeeData = ({person: {id, employeeId, salary, manager}, dispatcher}: Props): React.ReactElement[] => {
    if (employeeId) 
        return [<td key='empId'>{employeeId}</td>, <td key='salary'>{salary!}</td>, <td key='manager'>{manager!.toString()}</td>]
    else
        return [<td colSpan={3} key='hire'>
            <button onClick = {() => dispatcher({type:'hire', id})}>Hire</button>
        </td>]
}

const PersonData = ({person, dispatcher}: Props): React.ReactElement[] => [
    <td key='id'>{person.id}</td>,
    <td key='name'>{person.name}</td>,
    ...EmployeeData({person, dispatcher})
] 

const PersonRow = (props: Props) => (
    <tr>
        {PersonData(props)}
    </tr>
)

const PersonDataBody = ({model, dispatcher}: { model: Model, dispatcher: Dispatcher }) => (
    <tbody>
        {
            model.personData().map((person: Data) => <PersonRow key={person.id.toString()} {...{person, dispatcher}}/>)
        }
    </tbody>
)

export default (dispatcher: Dispatcher) => (model: Model) => (
    <div id='base'>
        <h1>People</h1>
        <table id='employees'>
            <thead><tr><td>Id</td><td>Name</td><td>Employee id</td><td>Salary</td><td>Manager</td></tr></thead>
            <PersonDataBody model={model} dispatcher={dispatcher}/>
        </table>
    </div>
)
