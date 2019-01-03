const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const sequelize = require("../database");
const services = require("../services");

const applyApollo = (app) => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({
      req,
      res,
      ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
      db: sequelize,
      services
    })
  });
  apolloServer.applyMiddleware({app});
  return app;
}

module.exports = applyApollo

