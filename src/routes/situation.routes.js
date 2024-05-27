const express = require('express');
const { getLoans, createBook, getBooks, confirmLoan, confirmPurchaseOrder } = require('../controllers/situation.controller');
const { createLoan, createPurchaseOrder, updateLoan, borrowedBooks } = require('../controllers/situation.controller');
const situationRouter = express.Router();

situationRouter.post('/create-loan', createLoan);
situationRouter.post('/create-book', createBook);
situationRouter.get('/loans', getLoans);
situationRouter.post('/confirm-loan', confirmLoan);
situationRouter.get('/books', getBooks);
situationRouter.post('/create-purchase-order', createPurchaseOrder);
situationRouter.post('/confirm-purchase-order', confirmPurchaseOrder);
situationRouter.put('/loan/:id', updateLoan);
situationRouter.get('/loan/:id/borrowed-books', borrowedBooks);


module.exports = situationRouter;