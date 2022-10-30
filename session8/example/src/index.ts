import * as ReactDOM from 'react-dom';
import { initThunk } from './thunks';
import store from './store'
import createView from './view'

async function init() {
    try {
        const view = createView(store.dispatch)
        store.subscribe(() => ReactDOM.render(view(store.getState()), document.getElementById('root')))
        store.dispatch(initThunk)
    } catch (err) {
        console.log(err)
    }
}

init()
