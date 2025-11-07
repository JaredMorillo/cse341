const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'W02 Project: Contacts Part 2 - Swagger File' 
},
  host: process.env.NODE_ENV === 'production' ? 'cse341-vcsw.onrender.com' : 'localhost:3000',
  schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);