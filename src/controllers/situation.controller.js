const Loan = require("../models/Loan");
const mongoose = require("mongoose");
const PurchaseOrder = require("../models/PurchaseOrder");

const createLoan = async (req, res, next) => {
  try {
    const { userId, bookId, quantity } = req.body;
    if (!bookId) return res.status(400).json({ message: "El libro no existe" });

    const loan = new Loan({
      user: userId,
      books: [{ book: bookId, quantity }],
    });
    await loan.save();

    res.status(201).json({ data: loan, error: [] });
  } catch (err) {
    next(err);
  }
};

const getLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.status(200).json({ message: "Lista de prestamos", data: loans });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los prestamos" });
  }
};

const createPurchaseOrder = async (req, res, next) => {
  try {
    const { userId, bookId, quantity } = req.body;
    if (!bookId) return res.status(400).json({ message: "El libro no existe" });

    const purchaseOrder = new PurchaseOrder({
      user: userId,
      books: [{ book: bookId, quantity }],
    });
    await purchaseOrder.save();

    res.status(201).json({ data: purchaseOrder, error: [] });
  } catch (err) {
    next(err);
  }
};

const updateLoan = async (req, res, next) => {
  try {
    const { loanId, bookId, quantity } = req.body;

    const loan = await Loan.findByIdAndUpdate(loanId, { bookId, quantity });

    if (!loan)
      return res.status(400).json({ message: "Prestamo no encontrado" });

    res.json({ message: "Prestamo actualizado", data: loan });
  } catch (error) {
    next(error);
  }
};

const borrowedBooks = async (req, res, next) => {
  try {
    const loanId = req.params.id;

    const book = await Loan.findById(loanId).populate("books.book");
    if (!book) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    res.status(200).json({ data: book, error: [] });
  } catch (err) {
    next(err);
  }
};

const returnBook = async (req, res, next) => {
  try {
    const { loanId } = req.body;

    const loan = await Loan.findById(loanId).populate("books.book");
    if (!loan)
      return res.status(400).json({ message: "Prestamo no encontrado" });

    for (const item of loan.books) {
      const book = item.book;

      const quantityPurchased = item.quantity;

      // Actualizar el stock del producto
      book.stock += quantityPurchased;
      await book.save();
    }

    res
      .status(201)
      .json({ message: "Se devolvio correctamente el libro", error: [] });
  } catch (err) {
    next(err);
  }
};

const confirmPurchaseOrder = async (req, res, next) => {
  const { userId } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const order = await PurchaseOrder.findOne({
      user: userId,
      status: "PREPARING",
    })
      .populate("books.book")
      .session(session);

    for (const item of order.books) {
      const book = item.book;

      const quantity = item.quantity;

      if (book.stock < quantity) {
        res.json({ message: `No hay suficiente stock para ${book.name}`});
      }

      book.stock -= quantity;
      await book.save();
      console.log("Book saved");
    }

    order.status = "BUYED";
    await order.save();

    if (req.query.cancel === "YES")  res.json({ message: `Transaccion cancelada`});

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Compra confirmada" } );
  } catch (error) {
    next(error);
    await session.abortTransaction();
    session.endSession();

    res.json({ message: "No se pudo confirmar la compra" ,error: error.message });
  }
};

const confirmLoan = async (req, res, next) => {
  const { userId } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const loan = await Loan.findOne({ user: userId, status: "PREPARING" })
      .populate("books.book")
      .session(session);

    for (const item of loan.books) {
      const book = item.book;

      const quantity = item.quantity;

      if (book.stock < quantity) {
        res.json({ message: `No hay suficiente stock para ${book.name}`});
      }

      book.stock -= quantity;
      await book.save();
      console.log("Book saved");
    }

    loan.status = "CONFIRMED";
    await loan.save();

    if (req.query.cancel === "YES") res.json({ message: `Transaccion cancelada`});

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Prestamo confirmado" } );
  } catch (error) {
    next(error);
    await session.abortTransaction();
    session.endSession();

    res.json({ message: "No se pudo confirmar el prestamo" ,error: error.message });
  }
};

module.exports = {
  createLoan,
  getLoans,
  updateLoan,
  createPurchaseOrder,
  confirmPurchaseOrder,
  confirmLoan,
  borrowedBooks,
  returnBook,
};
