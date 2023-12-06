const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:4500/api'
};

const outputFile = './swagger-output.json';
const routes = ['./app/routes/index.js'];


swaggerAutogen(outputFile, routes, doc);