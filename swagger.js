const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'W02 Project: Contacts Part 2 - Swagger File' 
},
  host: process.env.RENDER_EXTERNAL_URL ? process.env.RENDER_EXTERNAL_URL.split('https://')[1] : 'localhost:3000',
  schemes: process.env.RENDER_EXTERNAL_URL ? ['https'] : ['http']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);