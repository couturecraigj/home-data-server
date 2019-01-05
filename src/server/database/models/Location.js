import memoize from 'memoizee';

const location = (sequelize, Sequelize = require('sequelize')) => {
  const Location = sequelize.define('Location', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lon: {
      type: Sequelize.FLOAT
    },
    lat: {
      type: Sequelize.FLOAT
    }
  });

  Location.associate = models => {
    Location.belongsToMany(models.Day, {
      through: models.Day.Location
    });
    Location.hasMany(models.Room);
    Location.hasMany(models.Device);
    Location.hasMany(models.Weather);
  };

  Location.ensureCreated = ({ lat, lon, name }) => {
    return Location.findOrCreate({
      where: {
        lat,
        lon
      },
      defaults: {
        name
      }
    }).spread(location => location);
  };

  Location.find = memoize(
    async ({ where: { id } }) => {
      const location = await Location.findById(+id);

      if (!location) throw new Error('No Location in System yet');

      return location;
    },
    {
      normalizer: ([query]) => JSON.stringify(query),
      promise: true
    }
  );

  Location.addLocation = async ({ lat, lon, name }, context) => {
    if (!name) {
      const weatherDetails = await context.services.weather.getAllWeather({
        lat,
        lon
      });

      name = weatherDetails.name;
    }

    const location = await Location.findOrCreate({
      where: {
        lat,
        lon
      },
      defaults: {
        name
      }
    }).spread(location => location);

    context.res.cookie('locationId', location.id, { httpOnly: true });

    return location;
  };

  return Location;
};

export default location;
