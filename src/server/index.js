import cookieParser from 'cookie-parser';
import renderApp from './render-app';

const express = require('express');

const applyApollo = require('./graphQL').default;

require('../sensors');

const app = express();

app.use(cookieParser('SECRET'));
app.use(express.static('public'));
applyApollo(app);

app.get('*', (req, res) => {
  renderApp(req, res);
});

export default app;
