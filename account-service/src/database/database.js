const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ".account-service-db.sqlite",
    logging: false,
});

module.exports = sequelize;