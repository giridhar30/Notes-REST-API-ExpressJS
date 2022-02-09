const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();
const port = 3000;

// messy code...
// // adding middlewares
// app.use("/", () => console.log("request to home!"));

// // defining routes
// app.get("/", (req, res) => res.send("site under construction"));

// importing routes
const homeRoute = require("./routes/home");
const postsRoute = require("./routes/posts");

// using middlewares to link routes
app.use("/", homeRoute);
app.use("/posts", postsRoute);

// connecting to DB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () =>
  console.log("Connected to postsApp DB!")
);

// making the port listen to requests
app.listen(port, () =>
  console.log(`App available on http://localhost:${port}`)
);
