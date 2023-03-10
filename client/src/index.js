import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import 'antd/dist/antd';
import {applyMiddleware, createStore} from 'redux'
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers'
import { composeWithDevTools } from '@redux-devtools/extension';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={createStoreWithMiddleware(Reducer,
    composeWithDevTools(

    )
  )}>
    <App />
  </Provider>
);

reportWebVitals();
