const pino = require("pino");

const logger = pino({
    level: "info",
    base: {
        service: "account-service"
    },
    timestamp: pino.stdTimeFunctions.isoTime
});

module.exports = logger;