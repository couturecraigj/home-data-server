const location = (sequelize, Sequelize = require("sequelize")) => {
  const Location = sequelize.define("Location", {
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

  return Location;
};

module.exports = location;
