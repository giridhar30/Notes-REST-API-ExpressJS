const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

router.get("/", (req, res) => res.send("we are on posts now"));

router.post("/", (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
  });

  post
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: `${err} is the error` }));
});

module.exports = router;
