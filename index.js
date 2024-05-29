const app = require("./src/app.js");
const logger = require("./src/loggers/logger.js");

const PORT = process.env.PORT;

app.listen(PORT, () =>
  logger.info(`Server running at: http://localhost:${PORT}`)
);
