const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// using a middleware to parse request bodies for all requests
app.use(express.json());
// middleware to config cors
app.use(cors());

// importing routes
const homeRoute = require("./routes/home");
const postsRoute = require("./routes/posts");
const authRoute = require("./routes/auth");

// using middlewares to link routes
app.use("/", homeRoute);
app.use("/posts", postsRoute);
app.use("/api/user", authRoute);

// connecting to DB
dotenv.config();
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
