const Book = require("../models/Book");

// Post
const createBook = async (req, res) => {
  try {
    const { isbn, title, author, editorial, price, stock } = req.body;
    const allBooks = await Book.find();
    let libroRepetido = allBooks.find(
      (e) => e.isbn == isbn || (e.title == title && e.author == author)
    );
    if (libroRepetido) {
      res.status(400).json({ message: "Libro ya existente" });
    } else {
      const book = new Book({
        isbn,
        title,
        author,
        editorial,
        price,
        stock,
      });
      await book.save();
      res.status(201).json({ message: "¡Libro Creado!" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Gets
const getBook = async (req, res) => {
  try {
    const book = await Book.findById({ _id: req.params.id });
    if (!book) {
      return res.status(404).json({ message: "Libro no encontrado." });
    }
    res.status(200).json({ message: "Info del libro", libro: book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el libro" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find(
      {},
      {
        isbn: 1,
        title: 1,
        author: 1,
        price: 1,
        stock: 1,
        editorial: 1,
        activeLoans: 1,
        loanHistory: 1,
      }
    );
    res.status(200).json({ message: "Lista de libros", libros: books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los libros" });
  }
};

// Put
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.status(200).json({ message: "Libro modificado", libro: book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al modificar el libro" });
  }
};

// Delete
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.status(200).json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el Libro" });
  }
};

module.exports = {
  createBook,
  getBook,
  getAllBooks,
  updateBook,
  deleteBook,
};
