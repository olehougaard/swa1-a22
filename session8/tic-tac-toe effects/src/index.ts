import './index.css';
import * as ReactDOM from 'react-dom';
import { View } from './view'
import { store } from './store';

ReactDOM.render(View(store), document.getElementById('root'))
