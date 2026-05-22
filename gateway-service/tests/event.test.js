const request = require("supertest");

const accountServiceClient = require(
    "../src/utils/accountServiceClient"
);
const app = require("../src/server");

describe("Gateway Event APIs", () => {

    test("should return health status", async () => {

        const response = await request(app)
            .get("/health");

        expect(response.statusCode).toBe(200);

        expect(response.body.status).toBe("UP");

    });

    test("should reject invalid event", async () => {

        const response = await request(app)
            .post("/events")
            .send({
                amount: -100
            });

        expect(response.statusCode).toBe(400);

    });

    test("should prevent duplicate events", async () => {

        accountServiceClient.post = jest.fn()
            .mockResolvedValue({
                data: {
                    success: true
                }
            });

        const uniqueEventId = `evt-${Date.now()}`;

        const payload = {
            eventId: uniqueEventId,
            accountId: "acct-1",
            type: "CREDIT",
            amount: 100,
            currency: "USD",
            eventTimestamp: "2026-05-22T12:00:00Z"
        };

        const firstResponse = await request(app)
            .post("/events")
            .send(payload);

        const secondResponse = await request(app)
            .post("/events")
            .send(payload);

        expect(firstResponse.statusCode).toBe(201);

        expect(secondResponse.statusCode).toBe(200);

        expect(secondResponse.body.message)
            .toBe("Duplicate event");

    });

    test("should retrieve events by account", async () => {

        const response = await request(app)
            .get("/events?account=acct-1");

        expect(response.statusCode).toBe(200);

        expect(Array.isArray(response.body)).toBe(true);

    });

    test("should return trace id header", async () => {

        const response = await request(app)
            .get("/health");

        expect(response.headers["x-trace-id"])
            .toBeDefined();

    });

    test("should handle account service failure gracefully", async () => {

        accountServiceClient.post = jest.fn()
            .mockRejectedValue(
                new Error("Service unavailable")
            );

        const payload = {
            eventId: `evt-failure-${Date.now()}`,
            accountId: "acct-failure",
            type: "CREDIT",
            amount: 100,
            currency: "USD",
            eventTimestamp: "2026-05-22T12:00:00Z"
        };

        const response = await request(app)
            .post("/events")
            .send(payload);

        expect(response.statusCode).toBe(503);

    });
});