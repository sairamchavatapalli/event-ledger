const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Event = sequelize.define("Event", {
    eventId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    accountId: {
        type: DataTypes.STRING,
        allowNull: false
    },

    type: {
        type: DataTypes.ENUM("CREDIT", "DEBIT"),
        allowNull: false
    },

    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    currency: {
        type: DataTypes.STRING,
        defaultValue: "USD"
    },

    eventTimestamp: {
        type: DataTypes.DATE,
        allowNull: false
    },

    metadata: {
        type: DataTypes.JSON
    },

    traceId: {
        type: DataTypes.STRING
    }
});

module.exports = Event;