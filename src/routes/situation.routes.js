const express = require('express')
const {  } = require('../controllers/situations.controller')
const { createLoan, createPurchaseOrder, updateLoan, borrowedBooks, createBook, createUser } = require('../controllers/situation.controller')
const situationRouter = express.Router()

situationRouter.post('/create-loan', createLoan)
situationRouter.post('/create-purchase-order', createPurchaseOrder)
situationRouter.put('/loan/:id', updateLoan)
situationRouter.get('/loan/:id/borrowed-books', borrowedBooks)
situationRouter.post('/create-book', createBook)
situationRouter.post('/user', createUser)


module.exports = situationRouter