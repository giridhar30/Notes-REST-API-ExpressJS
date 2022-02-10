const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// using a middleware to parse request bodies for all requests
app.use(bodyParser.json());

// messy code...
/* // adding middlewares
app.use("/", () => console.log("request to home!"));

// defining routes
app.get("/", (req, res) => res.send("site under construction")); */

// importing routes
const homeRoute = require("./routes/home");
const postsRoute = require("./routes/posts");

// using middlewares to link routes
app.use("/", homeRoute);
app.use("/posts", postsRoute);

// connecting to DB
const options = {
  useNewUrlParser: true,
};
mongoose.connect(process.env.DB_URL, options, (err) => {
  if (err) {
    console.log(`${err} connecting to DB`);
  } else {
    console.log("Connected to postsApp DB!");
  }
});

// making the port listen to requests
app.listen(port, () =>
  console.log(`App available on http://localhost:${port}`)
);
