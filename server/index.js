require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
// load schema and resolvers
const typeDefs = require('./schema/schema');
const resolvers = require('./resolver/resolver');

// mongodb
const mongodbMethods = require('./data/db');
const connectMongodb = async () => {
  try {
    console.log(process.env.MONGODB);
    mongoose
      .connect(process.env.MONGODB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then((result) => {
        console.log('mongoDB connected');
      });
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    mongodbMethods,
  }),
});
const app = express();
(async () => {
  await server.start();
  server.applyMiddleware({ app });
  await connectMongodb();
  app.listen({ port: 5000 }, () => {
    console.log(`Server is listening on http://localhost:5000${server.graphqlPath}`);
  });
})();
