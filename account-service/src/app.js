const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");


const accountRoutes = require("./routes/account.routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    service: "account-service"
  });
});

app.use(accountRoutes);

module.exports = app;