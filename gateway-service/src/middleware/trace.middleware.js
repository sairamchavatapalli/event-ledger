const { v4: uuidv4 } = require("uuid");

const traceMiddleware = (req, res, next) => {
    req.traceId = uuidv4();

    res.setHeader("x-trace-id", req.traceId);

    next();
};

module.exports = traceMiddleware;