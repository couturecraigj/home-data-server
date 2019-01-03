const express = require('express');
const applyApollo = require('./graphQL');

const app = express();
app.use(express.static('public'))
applyApollo(app);

app.get('*', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <script src="/dist/bundle.js" async defer></script>
    <title>Document</title>
  </head>
  <body>
    <div id="app-root">
      <h1>You Made it</h1>
    </div>
  </body>
  </html>`)
})

app.listen(8080, '0.0.0.0')