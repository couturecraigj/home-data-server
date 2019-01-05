const memoizee = require('memoizee');
const weather = require('openweather-apis');

weather.setLang('en');
weather.setUnits('metric');
weather.setAPPID(process.env.WEATHER_API_KEY);

const getAllWeather = memoizee(
  async ({ lat, lon, locationId }, context) => {
    if (locationId) {
      const location = await context.db.models.Location.findOne({
        where: { id: locationId }
      });

      weather.setCoordinate(location.lat, location.lon);
    } else {
      weather.setCoordinate(lat, lon);
    }

    return new Promise((resolve, reject) => {
      weather.getAllWeather(function(err, JSONObj) {
        if (err) return reject(err);

        return resolve(JSONObj);
      });
    });
  },
  {
    normalizer(args) {
      return JSON.stringify(args[0]);
    },
    maxAge: 60000
  }
);
const getWeatherForecastForDays = memoizee(
  ({ lat, lon, days }) => {
    weather.setCoordinate(lat, lon);

    return new Promise((resolve, reject) => {
      weather.getWeatherForecastForDays(days, function(err, JSONObj) {
        if (err) return reject(err);

        return resolve(JSONObj);
      });
    });
  },
  {
    normalizer(args) {
      return JSON.stringify(args);
    },
    maxAge: 60000
  }
);

export { getAllWeather, getWeatherForecastForDays };
