const pino = require("pino");

const logger = pino({
    level: "info",
    base: {
        service: "gateway-service"
    },
    timestamp: pino.stdTimeFunctions.isoTime
});

module.exports = logger;