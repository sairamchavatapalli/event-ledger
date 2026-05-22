const request = require("supertest");

const app = require("../src/server");

describe("Account APIs", () => {

    test("should return health status", async () => {

        const response = await request(app)
            .get("/health");

        expect(response.statusCode).toBe(200);

    });

    test("should apply transaction and update balance", async () => {

        const payload = {
            transactionId: "txn-test-1",
            accountId: "acct-test",
            type: "CREDIT",
            amount: 500,
            currency: "USD",
            eventTimestamp: "2026-05-22T12:00:00Z"
        };

        await request(app)
            .post("/accounts/acct-test/transactions")
            .send(payload);

        const balanceResponse = await request(app)
            .get("/accounts/acct-test/balance");

        expect(balanceResponse.body.balance)
            .toBe(500);

    });

});