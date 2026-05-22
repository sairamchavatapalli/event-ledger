const eventService = require("../services/event.service");

const processEvent = async (req, res) => {
    try {
        const result = await eventService.processEvent(
            req.body,
            req.traceId
        );

        if (result.duplicate) {
            return res.status(200).json({
                message: "Duplicate event",
                data: result.event
            });
        }

        res.status(201).json({
            message: "Event processed successfully",
            data: result.event
        });

    } catch (error) {

        res.status(503).json({
            message: "Account Service unavailable",
            traceId: req.traceId,
            retryable: true
        });
    }
};

const getEventById = async (req, res) => {
    const event = await eventService.getEventById(
        req.params.id
    );

    if (!event) {
        return res.status(404).json({
            message: "Event not found"
        });
    }

    res.json(event);
};

const getEventsByAccount = async (req, res) => {
    const events = await eventService.getEventsByAccount(
        req.query.account
    );

    res.json(events);
};

module.exports = {
    processEvent,
    getEventById,
    getEventsByAccount
};