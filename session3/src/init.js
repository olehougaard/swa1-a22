import model from './model.js'
import presenter from './presenter.js'
import view from './view.js'

function display(theView, persons, employees = []) {
    const theModel = model(persons, employees)
    const thePresenter = presenter(theModel, theView)
    theView.listen(thePresenter.onAction)
    theView.update(theModel)
}

async function init() {
    const theView = view(window)
    try {
        const response = await fetch('http://localhost:9090/persons')
        if (!response.ok) throw response.statusText
        const persons = await response.json()
        const empRes = await fetch('http://localhost:9090/employees')
        if (!empRes.ok) throw empRes.statusText
        const employees = await empRes.json()
        display(theView, persons, employees)
    } catch (e) {
        theView.displayError(e)
    }
}

init()
