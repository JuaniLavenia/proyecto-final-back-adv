require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => logger.info("mongoose conectado"))
  .catch((err) =>
    logger.error("No se pudo conectar con la base de datos", err)
  );

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());

const cors = require("cors");

app.get("/", (req, res) => {
  res.send("Bienvenido");
});

app.use(cors());
app.use("/api", require("./routes/book.routes"));

module.exports = {
  app,
};
