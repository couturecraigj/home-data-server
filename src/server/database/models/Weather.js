const weather = (sequelize, Sequelize = require("sequelize")) => {
  const Weather = sequelize.define("Weather", {
    timeStamp: {
      type: Sequelize.FLOAT
    },
    temp: {
      type: Sequelize.FLOAT
    },
    humidity: {
      type: Sequelize.FLOAT
    },
    pressure: {
      type: Sequelize.FLOAT
    },
    tempMin: {
      type: Sequelize.FLOAT
    },
    tempMax: {
      type: Sequelize.FLOAT
    },
    windSpeed: {
      type: Sequelize.FLOAT
    },
    visibility: {
      type: Sequelize.FLOAT
    },
    windDegrees: {
      type: Sequelize.FLOAT
    }
  });

  Weather.ensureCreated = async ({ LocationId, lat, lon, day }, context) => {
    const weatherDetails = await context.getAllWeather({ lat, lon });
    return Weather.findOrCreate({
      where: {
        LocationId,
        timeStamp: weatherDetails.dt
      },
      defaults: {
        DayId: day.id,
        temp: weatherDetails.main.temp,
        pressure: weatherDetails.main.pressure,
        tempMax: weatherDetails.main.temp_max,
        tempMin: weatherDetails.main.temp_min,
        visibility: weatherDetails.visibility,
        windSpeed: weatherDetails.wind.speed,
        windDegrees: weatherDetails.wind.deg,
        humidity: weatherDetails.main.humidity
      }
    }).spread(weather => weather);
  };

  Weather.associate = models => {
    Weather.belongsTo(models.Location);
    Weather.hasMany(models.WeatherForecast);
    Weather.belongsTo(models.Day);
  };

  return Weather;
};

module.exports = weather;
