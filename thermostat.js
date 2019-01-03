const sensorLib = require("node-dht-sensor");
const fetch = require("node-fetch");

const addRoom = variables =>
  fetch("http://192.168.0.106:8080/", {
    method: "POST",
    body: JSON.stringify({
      query: `mutation AddRoom($input: RoomInput!) {
        addRoom(input: $input) {
          id
        }
      }`,
      variables
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
const convertToFahrenheit = temp => {
  return (temp * 9) / 5 + 32;
};

const sensor = {
  sensors: [
    {
      name: "Office",
      type: 11,
      pin: 4,
      reading: ""
    }
  ],
  read: function() {
    for (let sens of this.sensors) {
      let b = sensorLib.read(sens.type, sens.pin);
      let reading = `${sens.name}: ${b.temperature.toFixed(
        1
      )}°C, ${b.humidity.toFixed(1)}%`;

      if (reading === sens.reading) continue;
      sens.reading = reading;
      try {
        addRoom({
          input: {
            name: sens.name,
            lat: 42.9557296,
            lon: -72.3180388,
            humidity: b.humidity,
            temperature: b.temperature
          }
        });
      } catch (error) {
        console.error(error);
      }
    }

    setTimeout(function() {
      sensor.read();
    }, 30000);
  }
};

sensor.read();
