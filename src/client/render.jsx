import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../common/App';
import client from './apollo-client';

const render = () => {
  ReactDOM.hydrate(
    <BrowserRouter>
      <App client={client} />
    </BrowserRouter>,
    document.getElementById('root')
  );
};

export default render;
