const { Schema, model } = require("mongoose");

const itemSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Book",
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});

const loanSchema = new Schema({
  books: {
    type: [itemSchema],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  expireTime: {
    type: Date,
    default: () => {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 14);
      endDate.setHours(23, 59, 0, 0);
      return endDate;
    },
  },
  status: {
    type: String,
    enum: ["PREPARING", "CONFIRMED", "FINISHED"],
    default: "PREPARING",
  },
});

const Loan = model("Loan", loanSchema);

module.exports = Loan;
