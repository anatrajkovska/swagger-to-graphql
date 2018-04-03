require('babel-polyfill');
const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const graphQLSchema = require('swagger-to-graphql');

const proxyUrl = 'http://localhost:8000';
const pathToSwaggerSchema = `${__dirname}/dataBlocks.json`;

graphQLSchema(pathToSwaggerSchema, proxyUrl).then(schema => {
  app.use('/graphql', graphqlHTTP(() => {
    return {
      schema,
      graphiql: true
    };
  }));

  app.listen(3008, 'localhost', () => {
    console.info('http://localhost:3008/graphql');
  });
}).catch(e => {
  console.log(e);
});
