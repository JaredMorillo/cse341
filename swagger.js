const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE 341 API',
    description: 'API Documentation for CSE 341',
  },
  host: ['localhost:3000', 'cse341-vcsw.onrender.com'],
  schemes: ['http', 'https'],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'X-API-Key',
      description: 'Your API Key',
    },
  },
};

const outputFile = './swagger-output.json';
const routes = ['./server.js', './routes/*.js'];

swaggerAutogen(outputFile, routes, doc);