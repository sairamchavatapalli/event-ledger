const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Account = sequelize.define("Account", {
   accountId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: "USD",
  }
});

module.exports = Account;