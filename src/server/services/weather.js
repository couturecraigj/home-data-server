const weather = require("openweather-apis");
const memoizee = require("memoizee");

weather.setLang("en");
weather.setUnits("metric");
weather.setAPPID(process.env.WEATHER_API_KEY);

const getAllWeather = memoizee(
  ({ lat, lon }) => {
    weather.setCoordinate(lat, lon);
    return new Promise((resolve, reject) => {
      weather.getAllWeather(function(err, JSONObj) {
        if (err) return reject(err);
        return resolve(JSONObj);
      });
    });
  },
  {
    normalizer: function(args) {
      return JSON.stringify(args);
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
    normalizer: function(args) {
      return JSON.stringify(args);
    },
    maxAge: 60000
  }
);

module.exports = {
  getAllWeather,
  getWeatherForecastForDays
}