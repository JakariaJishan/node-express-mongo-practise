const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    res.status(500).json({
      error: "signup failed",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ user: req.body.user });
    if (user && user.length > 0) {
      const isPasswordValid = await bcrypt.hash(req.body.password, user[0].password);

      if (isPasswordValid) {
        //generate jwt token
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
          },
          process.env.JWT_TOKEN,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          token,
          message: "authentication success",
        });
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
  } catch (error) {
    console.log(error)
    res.status(401).json({
      error: "authentication failed",
    });
  }
});

module.exports = router;
