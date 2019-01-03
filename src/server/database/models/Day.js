const day = (sequelize, Sequelize = require("sequelize")) => {
  const Day = sequelize.define("Day", {
    dayOfMonth: {
      type: Sequelize.INTEGER
    },
    month: {
      type: Sequelize.INTEGER
    },
    year: {
      type: Sequelize.INTEGER
    }
  });

  Day.Location = sequelize.define("DayLocation", {
    sunrise: {
      type: Sequelize.FLOAT
    },
    sunset: {
      type: Sequelize.FLOAT
    }
  });

  Day.Location.ensureCreated = ({ LocationId, DayId, sunset, sunrise }) => {
    return Day.Location.findOrCreate({
      where: {
        LocationId,
        DayId
      },
      defaults: {
        sunset,
        sunrise
      }
    }).spread(dayLocation => dayLocation);
  };

  Day.ensureCreated = timeStamp => {
    const date = new Date(timeStamp);
    return Day.findOrCreate({
      where: {
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        dayOfMonth: date.getDate()
      }
    }).spread(day => day);
  };

  Day.associate = models => {
    Day.belongsToMany(models.Location, {
      through: Day.Location
    });
    Day.Location.hasMany(models.FuelDelivery);
    Day.hasMany(models.WeatherForecast);
    Day.hasMany(models.Weather);
  };

  return Day;
};

module.exports = day;
