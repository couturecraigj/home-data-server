const { platform } = require('os');

const startSensing = () => {
  console.log(platform());

  if (!['darwin', 'win32'].includes(platform())) {
    const find = require('./node_modules/local-devices');

    find().then(devices => console.log(devices));
    const temperature = require('./thermostat');

    temperature.read();
  }
};

module.exports = startSensing;
