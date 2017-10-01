import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './app/reducers';
import App from './app';

let store = createStore(reducer);

const app = document.querySelector('#app');
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  app);
