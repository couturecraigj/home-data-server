import memoize from 'memoizee';
import { delay } from './utilities';

const weather = (sequelize, Sequelize = require('sequelize')) => {
  const Weather = sequelize.define('Weather', {
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

  Weather.getAllWeather = memoize(
    async ({ lat, lon } = {}, context) => {
      if (!lat && !lon) {
        if (!context.req.cookies.locationId)
          throw new Error('There needs to be a location to get weather');

        try {
          await delay(60);
          const location = await context.db.models.Location.find({
            where: {
              id: context.req.cookies.locationId
            }
          });

          lat = location.lat;
          lon = location.lon;
        } catch (error) {
          context.res.clearCookie('locationId');
          throw error;
        }
      }

      const weatherDetails = await context.services.weather.getAllWeather(
        {
          lat,
          lon,
          ...context.req.cookies
        },
        context
      );

      return Weather.findOrCreate({
        where: {
          LocationId: context.req.cookies.locationId,
          timeStamp: weatherDetails.dt
        },
        defaults: {
          DayId: context.dayId,
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
    },
    {
      normalizer: ([args, context]) => {
        return JSON.stringify({
          args,
          cookies: context.req.cookies,
          dayId: context.dayId
        });
      },
      maxAge: 60000,
      promise: true
    }
  );

  Weather.associate = models => {
    Weather.belongsTo(models.Location);
    Weather.hasMany(models.WeatherForecast);
    Weather.belongsTo(models.Day);
  };

  return Weather;
};

export default weather;
