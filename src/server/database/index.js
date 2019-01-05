const Sequelize = require('sequelize');

const models = require('./models').default;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  logging: false,
  storage: './db.sqlite'
});

sequelize
  .authenticate()
  .then(async () => {
    await models(sequelize, Sequelize);
    await sequelize.sync({ force: true });
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
