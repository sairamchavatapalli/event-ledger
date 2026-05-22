const accountService = require("../services/account.service");
const logger = require("../utils/logger");

const applyTransaction = async (req, res) => {
    try {
        const result = await accountService.applyTransaction(req.body);

        if (result.duplicate) {
            return res.status(200).json({
                message: "Duplicate transaction",
                data: result.transaction
            });
        }

        res.status(201).json({
            message: "Transaction applied successfully",
            data: result
        });
    } catch (error) {
        logger.error({
            traceId: req.traceId,
            error: error.message
        });

        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getBalance = async (req, res) => {
    try {
        const account = await accountService.getBalance(
            req.params.accountId
        );

        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        res.json({
            accountId: account.accountId,
            balance: account.balance,
            currency: account.currency
        });
    } catch (error) {
        logger.error({
            traceId: req.traceId,
            error: error.message
        });
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getAccountDetails = async (req, res) => {
    try {
        const result = await accountService.getAccountDetails(
            req.params.accountId
        );

        if (!result) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        res.json(result);
    } catch (error) {
        logger.error({
            traceId: req.traceId,
            error: error.message
        });
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    applyTransaction,
    getBalance,
    getAccountDetails
};