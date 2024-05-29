const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  author: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
