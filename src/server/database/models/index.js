const Room = require("./Room");
const RoomHistory = require("./RoomHistory");
const Weather = require("./Weather");
const WeatherForecast = require("./WeatherForecast");
const Thermostat = require("./Thermostat");
const ThermostatHistory = require("./ThermostatHistory");
const Zone = require("./Zone");
const Device = require("./Device");
const Day = require("./Day");
const Location = require("./Location");
const FuelDelivery = require("./FuelDelivery");

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
  Zone,
};

const configure = (sequelize, Sequelize) => {
  Object.entries(models).forEach(([key, model]) => {
    models[key] = model(sequelize, Sequelize);
  });
  Object.values(models).forEach(model => {
    if (model.associate) model.associate(sequelize.models);
  });
};

module.exports = configure;
