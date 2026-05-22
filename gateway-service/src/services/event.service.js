const Event = require("../models/event.model");

const logger = require("../utils/logger");

const accountServiceClient = require(
    "../utils/accountServiceClient"
);

const processEvent = async (data, traceId) => {
    const {
        eventId,
        accountId,
        type,
        amount,
        currency,
        eventTimestamp,
        metadata
    } = data;

    // Check duplicate event
    const existingEvent = await Event.findOne({
        where: { eventId }
    });

    if (existingEvent) {
        return {
            duplicate: true,
            event: existingEvent
        };
    }

    // Store event locally first
    const event = await Event.create({
        eventId,
        accountId,
        type,
        amount,
        currency,
        eventTimestamp,
        metadata,
        traceId
    });



    try {
        // Call Account Service
        await accountServiceClient.post(
            `/accounts/${accountId}/transactions`,
            {
                transactionId: eventId,
                accountId,
                type,
                amount,
                currency,
                eventTimestamp,
                traceId
            },
            {
                headers: {
                    "x-trace-id": traceId
                }
            }
        );

        logger.info({
            traceId,
            eventId,
            message: "Event processed successfully"
        });

        return {
            duplicate: false,
            event
        };

    } catch (error) {

        logger.error({
            traceId,
            eventId,
            status: error.response?.status,
            error: error.message,
            message: "Account Service communication failed"
        });

        throw new Error(
            "Account Service unavailable"
        );
    }
};

const getEventById = async (eventId) => {
    return Event.findOne({
        where: { eventId }
    });
};

const getEventsByAccount = async (accountId) => {
    return Event.findAll({
        where: { accountId },
        order: [["eventTimestamp", "ASC"]]
    });
};

module.exports = {
    processEvent,
    getEventById,
    getEventsByAccount
};