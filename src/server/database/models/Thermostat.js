const thermostat = (sequelize, Sequelize = require("sequelize")) => {
  const Thermostat = sequelize.define("Thermostat", {
    heatingMin: {
      type: Sequelize.FLOAT
    },
    heatingMax: {
      type: Sequelize.FLOAT
    },
    coolingMin: {
      type: Sequelize.FLOAT
    },
    coolingMax: {
      type: Sequelize.FLOAT
    },
    occupied: {
      type: Sequelize.BOOLEAN
    },
    running: {
      type: Sequelize.BOOLEAN
    },
    state: {
      type: Sequelize.ENUM("HEAT", "OFF", "COOL")
    }
  });

  Thermostat.associate = models => {
    Thermostat.belongsTo(models.Zone);
    Thermostat.belongsTo(models.Room);
    Thermostat.hasMany(models.Device);
    Thermostat.hasMany(models.ThermostatHistory);
  };

  return Thermostat;
};

module.exports = thermostat;
