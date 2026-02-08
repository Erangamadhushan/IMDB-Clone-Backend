const request = require("supertest");
const app = require("../../app");

describe("Auth Routes", () => {
    describe("GET /api/health", () => {
        test("should return server status", async () => {
            const response = await request(app).get("/api/health");
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("status", "ok");
            expect(response.body).toHaveProperty("message", "Server is running");
        });
    });
})

