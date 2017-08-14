import React from 'react';
import ReactDom from 'react-dom';
import { App, setupAdvanceUpload } from './form';

const app = document.querySelector('#app');
ReactDom.render(<App />, app);
setupAdvanceUpload();
