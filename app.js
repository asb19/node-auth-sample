const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const { PORT, MONGODB_URI, NODE_ENV,ORIGIN } = require("./config.js");

// routes
const authRoutes = require("./router/auth.route");
const countryRoutes = require("./router/country.route");


// init express app
const app = express();

// middlewares



app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ORIGIN,
    optionsSuccessStatus: 200,
  })
);


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

    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
