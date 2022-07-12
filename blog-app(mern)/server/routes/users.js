const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!(email && password && name)) {
      return res.status(404).send("all input is required");
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const token = await jwt.sign({ _id: user._id, email }, "this-is-your-token", {
      expiresIn: "5h",
    });

    user.token = token;
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(500).json({ message: "all field are required"});
    }

    const user = await User.findOne({ email });
    const decodedHashedPassword = await bcrypt.compare(password, user.password);
    if (!(user && decodedHashedPassword)) {
      return res.status(500).send("invalid login");
    }

    const token = await jwt.sign({ _id: user._id }, "this-is-your-token", {
      expiresIn: "2h",
    });
    if(token==='undefined') {
      return res.status(500).json({ message: "invalid token"})
    }
    user.token = token;
    req.token = token;
    req.user = user._id;
    // res.cookie(`access_token`, token, {
    //   // maxAge: 5000,
    //   // expires works the same as the maxAge
    //   // expires: new Date('01 12 2021'),
    //   // secure: true,
    //   httpOnly: true,
    //   // sameSite: "lax",
    // });
    res.status(200).send(user);
    // res.redirect('/')
  } catch (error) {
    res.status(500).send({message:"invalid credentials"});
    // console.log(error);
  }
});

module.exports = router;
