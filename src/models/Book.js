const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  isbn: { type: Number, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  editorial: {
    type: String,
  },
});

const Book = model("Book", bookSchema);

module.exports = Book;
