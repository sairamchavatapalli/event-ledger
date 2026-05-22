const sequelize = require("./database");

require("../models/event.model");

const initializeDatabase = async () => {
    try {
        await sequelize.sync();

        console.log("Gateway database connected");
    } catch (error) {
        console.error("Database initialization failed", error);
    }
};

module.exports = initializeDatabase;