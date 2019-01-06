import cookieParser from 'cookie-parser';
import renderApp from './render-app';
import startSensing from '../sensors';

const express = require('express');

const applyApollo = require('./graphQL').default;

const app = express();

app.use(cookieParser('SECRET'));
app.use(express.static('public'));
applyApollo(app);

app.get('*', (req, res) => {
  renderApp(req, res);
});

startSensing();

export default app;
