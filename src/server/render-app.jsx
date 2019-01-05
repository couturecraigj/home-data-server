import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import { StaticRouter as Router } from 'react-router-dom';
import createClient from './apollo-client';
import App from '../common/App';

// eslint-disable-next-line import/no-dynamic-require
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const renderApp = (req, res) => {
  const context = {};
  const styleSheet = new ServerStyleSheet();
  const client = createClient(req, res);
  const app = (
    <Router location={req.url} context={context}>
      <App client={client} />
    </Router>
  );

  const markup = renderToString(styleSheet.collectStyles(app));

  if (context.url) {
    return res.redirect(context.url);
  }

  const helmet = Helmet.renderStatic();
  const styleTags = styleSheet.getStyleTags();

  return res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    ${
      assets.client.css
        ? `<link rel="stylesheet" href="${assets.client.css}">`
        : ''
    }
    <script src="${assets.client.js}" crossorigin async defer></script>
    ${helmet.title.toString()}
    ${styleTags}
  </head>
  <body>
    <div id="root">${markup}</div>
  </body>
  </html>`);
};

export default renderApp;
