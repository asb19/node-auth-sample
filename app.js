const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require("dotenv").config();


const { PORT, MONGODB_URI, NODE_ENV,ORIGIN } = require("./config");

//swagger

const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    openapi: '3.0.0',
    info: {
      title: 'Test API',
      version: '1.0.0',
      description: 'Test Express API with autogenerated swagger doc',
    },
    servers: [
      {
        url: 'http://localhost:3400/',
        description: 'Development server',
      },
    ],
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ['./src/router/*.js'],
};

const specs = swaggerJsdoc(options);

// routes
const authRoutes = require("./src/router/auth.route");
const countryRoutes = require("./src/router/country.route");
const { logError, returnError } = require("./src/handlers/error.handler");


// init express app
const app = express();

app.use(
  cors({
    credentials: true,
    origin: ORIGIN,
    optionsSuccessStatus: 200,
  })
);


// middlewares

const messageMap = {
  1: "success",
  0: "error"
}



app.use(express.json());



// index route

app.get("/", (req, res) => {
  res.status(200).json({
    type: "success",
    message: "server is up and running",
    data: null,
  });
});

// routes middlewares

app.use("/api/auth", authRoutes);
app.use("/api/country", countryRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));





app.use(logError)
app.use(returnError)




// page not found error handling  middleware

app.use("*", (req, res, next) => {
  const error = {
    status: 404,
    message: "API_ENDPOINT_NOT_FOUND_ERR",
  };
  next(error);
});




async function main() {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log("database connected");

    app.listen(PORT, () => console.log(`Server listening on port ${PORT}, process- ${process.pid}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
