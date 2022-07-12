const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  published_date: {
    type: Date,
    default: Date.now,
  },

  updated_date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  book_pic: {
    data: Buffer,
    contentType: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const book = mongoose.model("Book", bookSchema);

module.exports = book;
