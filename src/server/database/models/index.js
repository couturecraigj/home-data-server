const Day = require('./Day').default;
const Device = require('./Device').default;
const FuelDelivery = require('./FuelDelivery').default;
const Location = require('./Location').default;
const Room = require('./Room').default;
const RoomHistory = require('./RoomHistory').default;
const Thermostat = require('./Thermostat').default;
const ThermostatHistory = require('./ThermostatHistory').default;
const Weather = require('./Weather').default;
const WeatherForecast = require('./WeatherForecast').default;
const Zone = require('./Zone').default;

const models = {
  Day,
  Device,
  FuelDelivery,
  Location,
  Room,
  RoomHistory,
  Thermostat,
  ThermostatHistory,
  Weather,
  WeatherForecast,
  Zone
};

const configure = (sequelize, Sequelize) => {
  for (const key in models) {
    const model = models[key];

    models[key] = model(sequelize, Sequelize);
  }

  for (const key in models) {
    const model = models[key];

    if (model.associate) model.associate(sequelize.models);
  }
};

export default configure;
