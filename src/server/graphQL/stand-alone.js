const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const sequelize = require("../database");
const services = require("../services");

const server = new ApolloServer({
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

server.listen(8080);
