const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'W02 Project: Contacts Part 2 - Swagger File' 
},
  host: 'localhost:3000',
  schemes: ['https', 'http']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);