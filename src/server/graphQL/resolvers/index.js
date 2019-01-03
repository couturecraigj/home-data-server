const resolverMap = {
  Query: {
    hello: () => "world!"
  },
  Mutation: {
    addRoom: async (parent, args, context) => {
      const timeStamp = Date.now();
      try {
        const day = await context.db.models.Day.ensureCreated(
          timeStamp,
          context
        );
        const weatherDetails = await context.getAllWeather(args.input);

        let location = await context.db.models.Location.ensureCreated(
          {
            lat: args.input.lat,
            lon: args.input.lon,
            name: weatherDetails.name
          },
          context
        );
        context.db.models.Day.Location.ensureCreated(
          {
            LocationId: location.id,
            DayId: day.id,
            sunset: weatherDetails.sys.sunset,
            sunrise: weatherDetails.sys.sunrise
          },
          context
        );

        const weather = await context.db.models.Weather.ensureCreated(
          {
            lat: args.input.lat,
            lon: args.input.lon,
            LocationId: location.id,
            day
          },
          context
        );
        await context.db.models.WeatherForecast.ensureCreated(
          { WeatherId: weather.id, ...args.input, days: 5, day },
          context
        );

        const room = await context.db.models.Room.ensureCreated(
          { ...args.input, location, timeStamp, day },
          context
        );
        return room;
      } catch (error) {
        console.error(new Date(timeStamp), error);
      }
    }
  }
};

module.exports = resolverMap;
