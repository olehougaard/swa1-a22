import { Model, Data } from './model'

export type Event = {
    type: string
}

export type Listener = (e:Event) => void

export type View = {
    addPerson(p: Data): void
    update(m: Model): void
    listen(l: Listener): void
    displayError(e: String): void
    prompt(message?:string, _default?: string): string
   
}

export function createView (window:Window): View {
    const document = window.document
    const table_body = document.getElementById('employee_data')
    const listeners: Listener[] = []

    const listen = (l: Listener) => listeners.push(l)

    const addPerson = (p: Data) => {
        const tr = table_body.appendChild(document.createElement('tr'))
        tr.insertCell().appendChild(document.createTextNode(p.id.toString()))
        tr.insertCell().appendChild(document.createTextNode(p.name))
        if (p.employeeId) {
            tr.insertCell().appendChild(document.createTextNode(p.employeeId.toString()))
            tr.insertCell().appendChild(document.createTextNode((p.salary ?? 0).toString()))
            tr.insertCell().appendChild(document.createTextNode((p.manager ?? false).toString()))
        } else {
            const button = tr.insertCell().appendChild(document.createElement('button'))
            button.appendChild(document.createTextNode("Hire"))
            button.onclick = () => {
                const event = { type: 'hire', id: p.id }
                listeners.forEach(l => l(event))
            }
            tr.insertCell()
            tr.insertCell()
        }
    }

    const displayError = (e: string) => {
        const msg_board = document.getElementById('error_messages')
        msg_board.innerText = e
    }

    const update = (model: Model) => {
        while(table_body.firstChild) table_body.removeChild(table_body.firstChild)
        model.personData().forEach(addPerson)
    }
    const prompt: (message?:string, _default?: string) => string = window.prompt.bind(window)

    return { addPerson, update, listen, prompt, displayError }
}
