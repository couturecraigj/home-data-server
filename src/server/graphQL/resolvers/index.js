const resolverMap = {
  Query: {
    hello: () => 'world!',
    getWeather: (parent, args, context) =>
      context.db.models.Weather.getAllWeather(args, context),
    getWeatherForecast: (parent, args, context) =>
      context.db.models.WeatherForecast.getWeatherForecast(args, context)
  },
  Mutation: {
    addLocation: (parent, args, context) =>
      context.db.models.Location.addLocation(args.input, context),
    addRoom: (parent, args, context) => {
      const timeStamp = Date.now();

      return Promise.all([
        context.db.models.Day.ensureCreated(timeStamp, context),
        context.getAllWeather(args.input)
      ]).then(([day, weatherDetails]) => {
        return context.db.models.Location.ensureCreated(
          {
            lat: args.input.lat,
            lon: args.input.lon,
            name: weatherDetails.name
          },
          context
        ).then(location => {
          context.db.models.Day.Location.ensureCreated(
            {
              LocationId: location.id,
              DayId: day.id,
              sunset: weatherDetails.sys.sunset,
              sunrise: weatherDetails.sys.sunrise
            },
            context
          );

          return context.db.models.Weather.ensureCreated(
            {
              lat: args.input.lat,
              lon: args.input.lon,
              LocationId: location.id,
              day
            },
            context
          ).then(weather => {
            context.db.models.WeatherForecast.ensureCreated(
              { WeatherId: weather.id, ...args.input, days: 5, day },
              context
            );

            return context.db.models.Room.ensureCreated(
              { ...args.input, location, timeStamp, day },
              context
            );
          });
        });
      });
    }
  },
  WeatherForecast: {
    rain: parent => !parent.rain && 0,
    snow: parent => !parent.snow && 0
  }
};

export default resolverMap;
