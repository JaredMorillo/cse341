const express = require("express");
const app = express();
const routes = require("./routes");
const db = require("./database/db");
const bodyParser = require("body-parser");
const cors = require('cors');

// Configurar middlewares ANTES de las rutas
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS: permitir Content-Type y otros headers en preflight
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // Si es preflight request, responder inmediatamente
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const options = {
  explorer: true
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// Rutas
app.use('/', routes);

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

const port = process.env.PORT || 3000;

db.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});