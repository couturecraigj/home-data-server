const zone = (sequelize, Sequelize = require('sequelize')) => {
  const Zone = sequelize.define('Zone', {
    name: {
      type: Sequelize.STRING
    }
  });

  Zone.associate = models => {
    Zone.hasMany(models.Room);
    Zone.hasMany(models.Device);
    Zone.hasOne(models.Thermostat);
  };

  return Zone;
};

export default zone;
