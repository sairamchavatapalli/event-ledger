const sequelize = require("./database");

require("../models/account.model");
require("../models/transaction.model");

const initializeDatabase = async () => {
  try {
    await sequelize.sync();

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
  }
};

module.exports = initializeDatabase;