import memoize from 'memoizee';
import { delay } from './utilities';

const weatherForecast = (sequelize, Sequelize = require('sequelize')) => {
  const WeatherForecast = sequelize.define('WeatherForecast', {
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

  WeatherForecast.getWeatherForecast = memoize(
    async ({ lat, lon, days }, context) => {
      await delay(60);

      if (!lat && !lon) {
        if (!context.req.cookies.locationId)
          throw new Error('There needs to be a location to get weather');

        await delay(60);

        try {
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

      const weatherForecast = await context.services.weather.getWeatherForecastForDays(
        {
          lat,
          lon,
          days
        }
      );
      const weather = await context.db.models.Weather.getAllWeather(
        { lat, lon },
        context
      );
      const forecasts = [];

      for (const forecast of weatherForecast.list) {
        const result = await WeatherForecast.findOrCreate({
          where: {
            timeStamp: forecast.dt,
            WeatherId: weather.id
          },
          defaults: {
            DayId: context.dayId,
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
        }).spread(weather => weather);

        forecasts.push(result);
      }

      return forecasts;
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

  return WeatherForecast;
};

export default weatherForecast;
