const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  ISBN: { type: Number },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  editorial: {
    type: String,
  },
});

const Book = model("Book", bookSchema);

module.exports = Book;
