const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const traceMiddleware = require("./middleware/trace.middleware");
const logger = require("./utils/logger");
const eventRoutes = require("./routes/event.routes");
const {
    client,
    httpRequestCounter
} = require("./utils/metrics");
const sequelize = require("./database/database");

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute

    max: 100,

    message: {
        message: "Too many requests, please try again later"
    },

    standardHeaders: true,

    legacyHeaders: false
});

const app = express();

app.use(express.json());
app.use("/events", limiter);
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(traceMiddleware);

app.use((req, res, next) => {
    logger.info({
        traceId: req.traceId,
        method: req.method,
        url: req.url
    });

    next();
});

app.use((req, res, next) => {

    res.on("finish", () => {

        httpRequestCounter.inc({
            method: req.method,
            route: req.route?.path || req.path,
            status: res.statusCode
        });

    });

    next();
});

app.get("/health", async (req, res) => {

    try {

        await sequelize.authenticate();

        res.json({
            status: "UP",
            service: "gateway-service",
            database: "CONNECTED",
            timestamp: new Date().toISOString()
        });

    } catch (error) {

        res.status(503).json({
            status: "DOWN",
            service: "gateway-service",
            database: "DISCONNECTED"
        });

    }

});


app.use(eventRoutes);

app.get("/metrics", async (req, res) => {

    res.set(
        "Content-Type",
        client.register.contentType
    );

    const metrics = await client.register.metrics();

    res.send(metrics);
});

module.exports = app;