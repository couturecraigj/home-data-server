const { ApolloServer } = require('apollo-server-express');

const resolvers = require('./resolvers').default;
const sequelize = require('../database').default;
const services = require('../services');
const typeDefs = require('./typeDefs').default;

const applyApollo = app => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
      const timeStamp = Date.now();
      const day = await sequelize.models.Day.ensureCreated(timeStamp);

      return {
        req,
        res,
        timeStamp,
        dayId: day.id,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        db: sequelize,
        services
      };
    }
  });

  apolloServer.applyMiddleware({ app });

  return app;
};

export default applyApollo;
