const fuelDelivery = (sequelize, Sequelize = require("sequelize")) => {
  const FuelDelivery = sequelize.define("FuelDelivery", {
    type: {
      type: Sequelize.ENUM("DIESEL", "WOOD", "PELLET", "PROPANE", "ELECTRIC")
    },
    costPerUnit: {
      type: Sequelize.FLOAT
    },
    numberOfUnits: {
      type: Sequelize.FLOAT
    },
    timeStamp: {
      type: Sequelize.FLOAT
    }
  });

  FuelDelivery.associate = models => {
    FuelDelivery.belongsTo(models.Day.Location);
  };

  return FuelDelivery;
};

module.exports = fuelDelivery;
