const express = require("express");

const router = express.Router();

const {
    applyTransaction,
    getBalance,
    getAccountDetails
} = require("../controllers/account.controller");

const {
    validateTransaction
} = require("../middleware/validation.middleware");

router.post(
    "/accounts/:accountId/transactions",
    validateTransaction,
    applyTransaction
);

router.get(
    "/accounts/:accountId/balance",
    getBalance
);

router.get(
    "/accounts/:accountId",
    getAccountDetails
);

module.exports = router;