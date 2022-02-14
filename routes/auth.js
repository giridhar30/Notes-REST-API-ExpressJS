const express = require("express");
const User = require("../models/User");
const { validateRegistration } = require("../validation");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.status(400).send(`${err} is the error`);
  }
});

module.exports = router;
