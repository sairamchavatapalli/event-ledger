const express = require("express");

const router = express.Router();

const {
    processEvent,
    getEventById,
    getEventsByAccount
} = require("../controllers/event.controller");

const {
    validateEvent
} = require("../middleware/validation.middleware");

router.post(
    "/events",
    validateEvent,
    processEvent
);

router.get(
    "/events/:id",
    getEventById
);

router.get(
    "/events",
    getEventsByAccount
);

module.exports = router;