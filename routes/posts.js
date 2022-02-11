const express = require("express");
const { findById } = require("../models/Post");
const Post = require("../models/Post");
const router = express.Router();

// fetching all the posts
router.get("/", async (req, res) => {
  const fetchedPosts = await Post.find();
  res.json(fetchedPosts);
});

// fetching a specific post
router.get("/:postId", async (req, res) => {
  try {
    const specifiedPost = await Post.findById(req.params.postId);
    res.json(specifiedPost);
  } catch (err) {
    res.json({ message: `${err} is the error` });
  }
});

// posting a post
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
  });

  // old promise method
  // post
  //   .save()
  //   .then((data) => res.json(data))
  //   .catch((err) => res.json({ message: `${err} is the error` }));

  // new promise method
  try {
    const savedPost = await post.save();

    res.json(savedPost);
  } catch (err) {
    res.json({ message: `${err} is the error` });
  }
});

// deleting a post
router.delete("/:postId", async (req, res) => {
  try {
    const deletedPost = await Post.remove({ _id: req.params.postId });
    res.json(deletedPost);
  } catch (err) {
    res.json({ message: `${err} is the error` });
  }
});

// updating a post
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: `${err} is the error` });
  }
});

module.exports = router;
