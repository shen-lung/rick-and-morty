import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import {
    combineReducers,
    createStore,
    applyMiddleware,
} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { episodesStore } from './store/reducers/episodes/episodesStore'

const reducers = combineReducers({
    episodesStore,
})
const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

import App from './App';
import './style.scss'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
