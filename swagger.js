const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE 341 API',
    description: 'API Documentation for CSE 341'
  },
  host: 'cse341-vcsw.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);