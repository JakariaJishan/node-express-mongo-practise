const express = require("express");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/user", async (req, res) => {
  const user = new User(req.body);

  const hashedPassword = await bcrypt.hash(user.password, 8);

  user.password = hashedPassword;

  const token = await user.generateAuthToken();

  user
    .save()
    .then(() => res.status(200).send({ user, token }))
    .catch((err) => res.status(500).send(err.message));
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).send("not found");
  }
});

router.get("/users", auth, (req, res) => {
  res.send(req.user);
  // User.find({})
  //   .then((result) => {
  //     res.status(200).send(result);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error.message);
  //   });
});

router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send("done");
  } catch (error) {
    res.send({ error });
  }
});
router.post("/user/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("done");
  } catch (error) {
    res.send({ error });
  }
});

module.exports = router;
