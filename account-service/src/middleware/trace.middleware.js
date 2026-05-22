const { v4: uuidv4 } = require("uuid");

const traceMiddleware = (req, res, next) => {
  const incomingTraceId = req.headers["x-trace-id"];

  req.traceId = incomingTraceId || uuidv4();

  res.setHeader("x-trace-id", req.traceId);

  next();
};

module.exports = traceMiddleware;