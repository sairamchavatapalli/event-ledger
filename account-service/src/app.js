const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");


const accountRoutes = require("./routes/account.routes");
const traceMiddleware = require("./middleware/trace.middleware");
const logger = require("./utils/logger");

const app = express();

app.use(express.json());
app.use(traceMiddleware);
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use((req, res, next) => {
  logger.info({
    traceId: req.traceId,
    method: req.method,
    url: req.url
  });

  next();
});

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    service: "account-service"
  });
});

app.use(accountRoutes);

module.exports = app;