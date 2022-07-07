const express = require("express");
const book = require("../models/book");
const router = express.Router();
const auth = require("../middlewares/auth");
const ensureAuth = require("../middlewares/ensureAuth");

router.get("/", auth, async (req, res) => {
  book
    .find()
    .then((book) => {
      res.send(book);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/:id", async (req, res) => {
  book
    .findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) => res.status(500).send({ err: err.message }));
});

router.post("/",auth, (req, res) => {
  book
    .create(req.body)
    .then((book) => res.json({ msg: "Book added successfully" }))
    .catch((err) => console.log(err));
});

router.put("/:id", (req, res) => {
  book
    .findByIdAndUpdate(req.params.id, req.body)
    .then((book) => res.json({ msg: "Book upadated  successfully" }))
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
  book.findByIdAndRemove(req.params.id, req.body)
    .then((book) => res.json({ mgs: "Book entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a book" }));
});
module.exports = router;
