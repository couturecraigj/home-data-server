const device = (sequelize, Sequelize = require("sequelize")) => {
  const Device = sequelize.define("Device", {
    ipAddress: {
      type: Sequelize.STRING
    },
    macAddress: {
      type: Sequelize.STRING
    }
  });

  Device.associate = models => {
    Device.belongsTo(models.Zone);
    Device.belongsTo(models.Room);
    Device.hasMany(models.RoomHistory);
    Device.belongsTo(models.Thermostat);
    Device.belongsTo(models.Location);
  };

  return Device;
};

module.exports = device;
