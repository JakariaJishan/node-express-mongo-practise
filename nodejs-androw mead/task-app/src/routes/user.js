const express = require("express");
const User = require("../model/user");
const router = express.Router();

router.post("/user", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => res.status(200).send(user))
    .catch((err) => res.status(500).send(err.message));
});

router.get("/users", (req, res) => {
  User.find({})
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});


module.exports = router;