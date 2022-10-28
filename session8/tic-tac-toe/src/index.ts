import './index.css';
import * as ReactDOM from 'react-dom';
import { View } from './view'
import { store } from './store';
import { Game } from './model';
import { initThunk } from './thunks';

ReactDOM.render(View(store), document.getElementById('root'))
const game: Game = { gameNumber: 1, board: [['', '', ''], ['', '', ''], ['', '', '']], inTurn: 'X', stalemate: false }
store.dispatch(initThunk)
