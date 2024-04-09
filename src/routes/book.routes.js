const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksController.js");

router.post("/book", booksController.createBook);

router.get("/books", booksController.getAllBooks);
router.get("/book/:id", booksController.getBook);

router.put("/book/:id", booksController.updateBook);

router.delete("/book/:id", booksController.deleteBook);

module.exports = router;
