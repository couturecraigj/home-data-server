const { platform } = require('os');

if (!['darwin', 'win32'].includes(platform())) {
  const find = require('local-devices');

  find().then(devices => console.log(devices));
  const temperature = require('./thermostat');

  temperature.read();
}
