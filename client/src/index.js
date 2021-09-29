// no relative path needed
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import  ReactDOM  from 'react-dom';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, applyMiddleware(reduxThunk));

ReactDOM.render(
    //redux stores states(保存状态)（当状态修改时，redux可以让App自动渲染新的状态数据）
    //when there are new states available in redux, render() will be called again
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);

console.log('Stripe key is', process.env.REACT_APP_STRIPE_KEY);
console.log('environment is', process.env.NODE_ENV);