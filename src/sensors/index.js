const { platform } = require('os');

const startSensing = async () => {
  if (!['darwin', 'win32'].includes(platform())) {
    // const find = require('local-devices');

    // await find().then(devices =>
    //   console.log(
    //     devices.filter(({ mac }) => mac !== '<incomplete>')
    //     // .map(v => ({ ...v, vendor: oui(v.mac) }))
    //   )
    // );
    const temperature = require('./thermostat');

    temperature.read();
  }
};

export default startSensing;
