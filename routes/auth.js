const bcryptjs = require("bcryptjs");
const express = require("express");
const User = require("../models/User");
const { validateRegistration } = require("../validation");
const router = express.Router();

router.post("/register", async (req, res) => {
  // validating the user
  const { error } = validateRegistration(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // checking if user already exists
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) return res.status(400).json({ error: "User already exists" });

  // encrypting the password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(req.body.password, salt);

  const user = new User({
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.json({ user: savedUser._id });
  } catch (err) {
    res.status(400).json({ error: `${err} is the error` });
  }
});

module.exports = router;
