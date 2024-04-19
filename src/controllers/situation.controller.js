const Loan = require('../models/Loan')
const mongoose = require('mongoose')
const PurchaseOrder = require('../models/PurchaseOrder')

const createLoan = async (req, res, next) => {
    try {
        const { userId, bookId, book, quantity } = req.body

        if (quantity > book.stock) return res.status(400).json({ message: 'El libro no esta disponible' })

        const loan = new Loan({ user: userId, books: [{ book: bookId, quantity }] })
        await loan.save()

        res.status(201).json({ data: loan, error: [] })

    } catch (err) {
        next(err)
        
    }
    
}

const createPurchaseOrder = async (req, res, next) => {
    try {
        const { userId, bookId, quantity, book } = req.body

        if (quantity > book.stock) return res.status(400).json({ message: 'El libro no esta disponible' })

        const purchaseOrder = new PurchaseOrder({ user: userId, books: [{ book: bookId, quantity }] })
        await purchaseOrder.save()

        res.status(201).json({ data: purchaseOrder, error: [] })

    } catch (err) {
        next(err)
        
    }
    
}


const updateLoan = async (req, res, next) => {
    try {
        const { loanId, bookId, quantity } = req.body

        const loan = await Loan.findByIdAndUpdate(loanId, {bookId, quantity})

        if (!loan) return res.status(400).json({ message: 'Prestamo no encontrado' })

        res.json({ message: 'Prestamo actualizado', data: loan })
    } catch (error) {
        next(error)
    }
}

const borrowedBooks = async (req, res, next) => {
    try {
        const { loanId } = req.body

        const book = await Loan.findById(loanId).populate('books.book')
        if (!book) {
            return res.status(404).json({ message: 'Libro no encontrado' })
        }

        res.status(201).json({ data: book, error: [] })

    } catch (err) {
        next(err)
        
    }
    
}

module.exports = {
    createLoan,
    updateLoan,
    createPurchaseOrder,
    borrowedBooks
}