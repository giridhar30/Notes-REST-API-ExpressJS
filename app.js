const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

class App {
  app;
  port;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.initializeMiddlewares();
    this.connectToDatabase();
    this.initializeRoutes();
  }

  initializeMiddlewares() {
    // using a middleware to parse request bodies for all requests
    this.app.use(express.json());
    // middleware to config cors
    this.app.use(cors());
  }

  initializeRoutes() {
    // importing routes
    const homeRoute = require("./routes/home.route");
    const notesRoute = require("./routes/notes.route");
    const authRoute = require("./routes/auth.route");

    // using middlewares to link routes
    this.app.use("/", homeRoute);
    this.app.use("/api/notes", notesRoute);
    this.app.use("/api/user", authRoute);
  }

  connectToDatabase() {
    const options = {
      useNewUrlParser: true,
    };

    mongoose.connect(process.env.DB_URL, options, (err) => {
      if (err) {
        console.log(`${err} connecting to DB`);
      } else {
        console.log("Connected to notesApp DB!");
      }
    });
  }

  listen() {
    this.app.listen(process.env.PORT, () =>
      console.log(`App available on http://localhost:${process.env.PORT}`)
    );
  }
}

module.exports = App;
