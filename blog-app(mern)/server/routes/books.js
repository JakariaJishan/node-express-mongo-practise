const express = require("express");
const book = require("../models/book");
const router = express.Router();
const auth = require("../middlewares/auth");
const ensureAuth = require("../middlewares/ensureAuth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

router.get("/", auth, async (req, res) => {
  book
    .find({ user: req.user._id })
    .then((book) => {
      res.send(book);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/:id", auth, async (req, res) => {
  book
    .findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) => res.status(500).send({ err: err.message }));
});

//multer file path

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    // checkFileType(file, cb);
    if (!file.originalname.endsWith(".jpg")) {
      return new Error("FileFormat invalid");
    }
    cb(null, true);
  },
});

// Check File Type
// function checkFileType(file, cb){
//   // Allowed ext
//   const filetypes = /jpeg|jpg|png|gif/;
//   // Check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime
//   const mimetype = filetypes.test(file.mimetype);

//   if(mimetype && extname){
//     return cb(null,true);
//   } else {
//     cb('Error: Images Only!');
//   }
// }

router.post(
  "/",
  auth,
  upload.single("book_pic"),
  (req, res) => {

    book
      .create({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        book_pic: {
          data: fs.readFileSync( './public/uploads/' + req.file.filename),
          contentType: 'image/png'
      },
        user: req.user._id,
      })
      .then((book) => res.send(book))
      .catch((err) => console.log(err));
  },
  (err, req, res, next) => {
    res.send({ error: err.message });
  }
);

router.put("/:id", auth, (req, res) => {
  book
    .findByIdAndUpdate(req.params.id, req.body)
    .then((book) => res.json({ msg: "Book upadated  successfully" }))
    .catch((err) => console.log(err));
});

router.delete("/:id", auth, (req, res) => {
  book
    .findByIdAndRemove(req.params.id, req.body)
    .then((book) => res.json({ mgs: "Book entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a book" }));
});
module.exports = router;
