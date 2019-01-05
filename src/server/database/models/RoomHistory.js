const roomHistory = (sequelize, Sequelize = require('sequelize')) => {
  const RoomHistory = sequelize.define('RoomHistory', {
    timeStamp: {
      type: Sequelize.FLOAT
    },
    flowing: {
      type: Sequelize.BOOLEAN
    },
    occupied: {
      type: Sequelize.BOOLEAN
    },
    temp: {
      type: Sequelize.FLOAT
    },
    humidity: {
      type: Sequelize.FLOAT
    }
  });

  RoomHistory.associate = models => {
    RoomHistory.belongsTo(models.Room);
    RoomHistory.belongsTo(models.Device);
    RoomHistory.belongsTo(models.Day);
  };

  return RoomHistory;
};

export default roomHistory;
