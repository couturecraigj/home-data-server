import express from 'express';

require('dotenv').config();
let app = require('./server').default;

if (module.hot) {
  module.hot.accept('./server', function() {
    // eslint-disable-next-line no-console
    console.log('🔁  HMR Reloading `./server`...');

    try {
      app = require('./server').default;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
  // eslint-disable-next-line no-console
  console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT || 3000;

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, function(err) {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);

      return;
    }

    // eslint-disable-next-line no-console
    console.log(`> Started on port ${port}`);
  });
