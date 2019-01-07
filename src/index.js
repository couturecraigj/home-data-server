import fs from 'fs';
import http from 'http';
import https from 'https';

const privateKey = fs.readFileSync('./key.pem');
const privateCert = fs.readFileSync('./cert.pem');

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
const securePort = process.env.SECURE_PORT;

const createServers = () => {
  if (securePort) {
    const httpsServer = https.createServer(
      {
        key: privateKey,
        cert: privateCert
      },
      (req, res) => app.handle(req, res)
    );

    httpsServer.listen(securePort);
  }

  http.createServer((req, res) => app.handle(req, res)).listen(port);
};

export default createServers();
