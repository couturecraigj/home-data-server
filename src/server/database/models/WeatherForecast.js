const weatherForecast = (sequelize, Sequelize = require("sequelize")) => {
  const WeatherForecast = sequelize.define("WeatherForecast", {
    timeStamp: {
      type: Sequelize.FLOAT
    },
    pressure: {
      type: Sequelize.FLOAT
    },
    humidity: {
      type: Sequelize.FLOAT
    },
    rain: {
      type: Sequelize.FLOAT
    },
    snow: {
      type: Sequelize.FLOAT
    },
    clouds: {
      type: Sequelize.FLOAT
    },
    windDegrees: {
      type: Sequelize.FLOAT
    },
    windSpeed: {
      type: Sequelize.FLOAT
    },
    tempDay: {
      type: Sequelize.FLOAT
    },
    tempMin: {
      type: Sequelize.FLOAT
    },
    tempMax: {
      type: Sequelize.FLOAT
    },
    tempNight: {
      type: Sequelize.FLOAT
    },
    tempEve: {
      type: Sequelize.FLOAT
    },
    tempMorn: {
      type: Sequelize.FLOAT
    }
  });

  WeatherForecast.associate = models => {
    WeatherForecast.belongsTo(models.Weather);
    WeatherForecast.belongsTo(models.Day);
  };

  WeatherForecast.ensureCreated = async (
    { WeatherId, lat, lon, days },
    context
  ) => {
    const weatherForecast = await context.getWeatherForecast({
      lat,
      lon,
      days
    });

    return Promise.all([
      weatherForecast.list.map(async forecast =>
        WeatherForecast.findOrCreate({
          where: {
            timeStamp: forecast.dt,
            WeatherId
          },
          defaults: {
            DayId: await context.db.models.Day.ensureCreated(
              forecast.dt * 1000
            ).then(day => day.id),
            pressure: forecast.pressure,
            snow: forecast.snow,
            rain: forecast.rain,
            clouds: forecast.clouds,
            windSpeed: forecast.speed,
            windDegrees: forecast.deg,
            humidity: forecast.humidity,
            tempDay: forecast.temp.day,
            tempMin: forecast.temp.min,
            tempMax: forecast.temp.max,
            tempNight: forecast.temp.night,
            tempEve: forecast.temp.eve,
            tempMorn: forecast.temp.morn
          }
        }).spread(weather => weather)
      )
    ]);
  };

  return WeatherForecast;
};

module.exports = weatherForecast;
