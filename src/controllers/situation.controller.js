const Loan = require('../models/Loan')
const mongoose = require('mongoose')
const PurchaseOrder = require('../models/PurchaseOrder')
const User = require('../models/User')



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

const returnBook = async (req, res, next) => {

    try {
        const { loanId } = req.body

        const loan = await Loan.findById(loanId).populate('books.book')
        if (!loan) return res.status(400).json({ message: 'Prestamo no encontrado' })

        for (const item of loan.books) {
          
            const book = item.book
         
            const quantityPurchased = item.quantity

            // Actualizar el stock del producto
            book.stock += quantityPurchased
            await book.save()
        }

        res.status(201).json({ message: 'Se devolvio correctamente el libro', error: [] })
    } catch (err) {
        next(err)
    }
}


const confirmPurchaseOrder = async (req, res, next) => {
    const { userId, bookId } = req.body
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const user=
            await User.findById({ user: userId, email, username })
            if (!user) return res.status(400).json({ message: 'El usuario no existe' })
            .session(session)

        const book = await Book.findById({ book: bookId, available })
        if (!book) return res.status(400).json({ message: 'El libro no existe' })
        if (!available) return res.status(400).json({ message: 'El libro no esta disponible' })
        
        const loan = new Loan({ user: userId, books: [{ book: bookId, quantity }] })
        await loan.save()
        

        for (const item of purchaseOrder.books) {
            
            const book = item.book
           
            const quantityPurchased = item.quantity

            if (book.stock < quantityPurchased) {
                throw new Error(`No hay suficiente stock para ${book.name}`)
            }

            book.stock -= quantityPurchased
            await book.save()
            console.log('Book saved')
        }


        if (req.query.cancel === 'YES') throw new Error('Cancel transaction')

        await session.commitTransaction()
        session.endSession()

        res.json(purchaseOrder)
    } catch (error) {
        next(error)
        await session.abortTransaction()
        session.endSession()

        res.json({ message: error.message })
    }
}


module.exports = {
    createLoan,
    updateLoan,
    createPurchaseOrder,
    borrowedBooks,
    returnBook,
    createBook,
    createUser
}