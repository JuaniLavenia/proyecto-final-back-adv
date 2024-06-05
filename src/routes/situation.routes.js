const express = require("express");
const {
  getLoans,
  confirmLoan,
  confirmPurchaseOrder,
  createLoan,
  createPurchaseOrder,
  updateLoan,
  borrowedBooks,
  returnBook
} = require("../controllers/situation.controller");
const situationRouter = express.Router();

situationRouter.get("/loans", getLoans);
situationRouter.post("/create-loan", createLoan);
situationRouter.post("/confirm-loan", confirmLoan);
situationRouter.put("/loan/:id", updateLoan);
situationRouter.post("/create-purchase-order", createPurchaseOrder);
situationRouter.post("/confirm-purchase-order", confirmPurchaseOrder);
situationRouter.get("/loan/:id/borrowed-books", borrowedBooks);
situationRouter.post("/loan/return-book", returnBook);

module.exports = situationRouter;
