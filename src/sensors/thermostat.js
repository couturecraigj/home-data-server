/* eslint-disable import/no-unresolved, node/no-missing-require */
try {
  const fetch = require('node-fetch');
  const tempSensor = require('node-dht-sensor');

  const addRoom = variables =>
    fetch('http://127.0.0.1:8080/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query: `mutation AddRoom($input: RoomInput!) {
          addRoom(input: $input) {
            id
          }
        }`,
        variables
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      // eslint-disable-next-line no-console
      .catch(console.error);

  const sensor = {
    sensors: [
      {
        name: 'Office',
        type: 11,
        pin: 4,
        reading: ''
      }
    ],
    read() {
      for (const sens of this.sensors) {
        const b = tempSensor.read(sens.type, sens.pin);
        const reading = `${sens.name}: ${b.temperature.toFixed(
          1
        )}°C, ${b.humidity.toFixed(1)}%`;

        if (reading === sens.reading) continue;

        sens.reading = reading;

        addRoom({
          input: {
            name: sens.name,
            lat: 42.9557296,
            lon: -72.3180388,
            humidity: b.humidity,
            temperature: b.temperature
          }
        });
      }

      setTimeout(function() {
        sensor.read();
      }, 30000);
    }
  };

  module.exports = sensor;
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(error);
  module.exports = { read: () => {} };
}

/* eslint-enable import/no-unresolved, node/no-missing-require */
