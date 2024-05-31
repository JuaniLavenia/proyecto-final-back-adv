const { validationResult } = require("express-validator");
const logger = require("../loggers/logger");

const requestValidation = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).json({ errors: result.array() });
  logger.error("Error", result);
  next();
};

const errorMidleware = (err, req, res, next) => {
  console.log("Error", err);
  res.status(500);
  res.json({ message: "Internal server error" });
  logger.error("Internal server error", err);
};

module.exports = { requestValidation, errorMidleware };
