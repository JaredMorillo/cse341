const express = require("express");
const app = express();
const routes = require("./routes");
const db = require("./database/db");
const bodyParser = require("body-parser");
const cors = require('cors');

// CORS configuration
const corsOptions = {
  origin: '*', // Be more specific in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

var options = {
  explorer: true
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.use("/", routes);

db.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database and App listening on port ${port}`);
    });
  }
});