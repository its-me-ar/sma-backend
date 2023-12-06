const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

const doc = {
  info: {
    title: "SMA API's",
    description: 'Backend Express APP'
  },
  host: 'localhost:4500/api',

};

const outputFile = './swagger-output.json';
const routes = ['./app/routes/index.js'];


swaggerAutogen(outputFile, routes, doc);