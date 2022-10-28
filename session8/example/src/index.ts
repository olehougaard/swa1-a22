import * as ReactDOM from 'react-dom';
import { initThunk } from './thunks';
import store from './store'
import createView from './view'

async function init() {
    try {
        let renderer = (dom:JSX.Element) => ReactDOM.render(dom, document.getElementById('root'))
        const view = createView(store.dispatch)
        store.subscribe(() => renderer(view(store.getState())))
        store.dispatch(initThunk)
    } catch (err) {
        console.log(err)
    }
}

init()
