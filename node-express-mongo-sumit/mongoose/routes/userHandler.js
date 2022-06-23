const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userSchema = require("../schemas/userSchema");
const User = new mongoose.model("User", userSchema);

router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      message: "sign up successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "signup failed",
    });
  }
});

router.post("/login", async (req, res) => {
  const user = await User.find({ user: req.body.user });
  if (user && user.length > 0) {
    const isPasswordValid = await bcrypt.hash(req.body.password, hash);

    if (isPasswordValid) {
    } else {
      res.status(401).json({
        error: "authentication failed",
      });
    }
  } else {
    res.status(401).json({
      error: "authentication failed",
    });
  }
});

module.exports = router;
