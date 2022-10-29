import './index.css';
import * as ReactDOM from 'react-dom';
import { View } from './view'
import { store } from './store';
import { initThunk, pollGamesThunk } from './thunks';

ReactDOM.render(View(store), document.getElementById('root'))
store.dispatch(initThunk)
store.dispatch(pollGamesThunk(250))
