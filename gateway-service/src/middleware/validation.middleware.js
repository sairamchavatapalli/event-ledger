const validateEvent = (req, res, next) => {
    const {
        eventId,
        accountId,
        type,
        amount,
        currency,
        eventTimestamp
    } = req.body;

    if (!eventId) {
        return res.status(400).json({
            message: "eventId is required"
        });
    }

    if (!accountId) {
        return res.status(400).json({
            message: "accountId is required"
        });
    }

    if (!["CREDIT", "DEBIT"].includes(type)) {
        return res.status(400).json({
            message: "type must be CREDIT or DEBIT"
        });
    }

    if (!amount || amount <= 0) {
        return res.status(400).json({
            message: "amount must be greater than 0"
        });
    }

    if (!currency) {
        return res.status(400).json({
            message: "currency is required"
        });
    }

    if (!eventTimestamp) {
        return res.status(400).json({
            message: "eventTimestamp is required"
        });
    }

    next();
};

module.exports = {
    validateEvent
};