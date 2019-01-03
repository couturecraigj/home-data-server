const room = (sequelize, Sequelize = require("sequelize")) => {
  const Room = sequelize.define("Room", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    currentTemp: {
      type: Sequelize.FLOAT
    },
    currentHumidity: {
      type: Sequelize.FLOAT
    },
    occupied: {
      type: Sequelize.BOOLEAN
    },
    running: {
      type: Sequelize.BOOLEAN
    },
    lat: {
      type: Sequelize.FLOAT
    },
    lon: {
      type: Sequelize.FLOAT
    }
  });

  Room.ensureCreated = async (
    { lat, lon, name, location, temperature, humidity, timeStamp, day },
    context
  ) => {
    const room = await Room.findOrCreate({
      where: {
        lat,
        lon,
        name,
        LocationId: location.id
      },
      defaults: {
        currentTemp: temperature,
        currentHumidity: humidity
      }
    }).spread(async (room, created) => {
      if (!created) {
        room.currentTemp = temperature;
        room.currentHumidity = humidity;
        await room.save();
      }
      return room;
    });
    await context.db.models.RoomHistory.create({
      DayId: day.id,
      timeStamp,
      RoomId: room.id,
      temp: temperature,
      humidity
    });
    return room;
  };

  Room.associate = models => {
    Room.belongsTo(models.Location);
    Room.belongsTo(models.Zone);
    Room.hasOne(models.Thermostat);
    Room.hasMany(models.Device);
  };

  return Room;
};

module.exports = room;
