"use strict";

// load modules
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// reference routes
const routes = require("./routes");

// imports the sequelize models
const Sequelize = require("sequelize");
const models = require("./models");

// Get references to our models
const User = models.User;
const Course = models.Course;

// new sequelize instance
const db = new Sequelize({
  dialect: "sqlite",
  storage: "./fsjstd-restapi.db"
});

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";

// tests my sequalize connection and sync models with the db
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    // sync the models with the database
    return db.sync();
  })
  // print all my User records to the console
  .then(() => {
    return User.findAll();
  })
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  // print all my Course records to the console
  .then(() => {
    return Course.findAll();
  })
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  // or catch any error and just print can't establish connection to the db
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan("dev"));

// for parsing json content from request body
app.use(express.json());

// TODO setup your api routes here

// setup a friendly greeting for the root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the REST API project!"
  });
});

// send to our api router in routes.js
app.use("/api", routes);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found"
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

// set our port
app.set("port", process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get("port"), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
