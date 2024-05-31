const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  isbn: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  editorial: { type: String },
  activeLoans: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      startDate: { type: Date, default: Date.now },
      endDate: { type: Date },
      expireTime: {
        type: Date,
        default: () => {
          const endDate = new Date();
          endDate.setDate(endDate.getDate() + 14); // Añade 14 días
          endDate.setHours(23, 59, 0, 0); // Establece la hora a las 23:59
          return endDate;
        },
      },
    },
  ],
  loanHistory: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      startDate: { type: Date, default: Date.now },
      endDate: { type: Date },
    },
  ],
  purchaseHistory: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      date: { type: Date, default: Date.now },
    },
  ],
});

const Book = model("Book", bookSchema);

module.exports = Book;
