const thermostatHistory = (sequelize, Sequelize = require('sequelize')) => {
  const ThermostatHistory = sequelize.define('ThermostatHistory', {
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
    timeStamp: {
      type: Sequelize.FLOAT
    },
    running: {
      type: Sequelize.BOOLEAN
    },
    currentTemp: {
      type: Sequelize.FLOAT
    },
    state: {
      type: Sequelize.ENUM('HEAT', 'OFF', 'COOL')
    }
  });

  ThermostatHistory.associate = models => {
    ThermostatHistory.belongsTo(models.Thermostat);
  };

  return ThermostatHistory;
};

export default thermostatHistory;
