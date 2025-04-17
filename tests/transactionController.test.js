const request = require("supertest");
const app = require("../src/index"); // Import your Express app

describe("Transaction Controller", () => {
	it("should fetch transaction details", async () => {
		const response = await request(app).get("/api/transaction/TXN001");
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("transactionId", "TXN001");
	});

	it("should return 404 for non-existent transaction", async () => {
		const response = await request(app).get("/api/transaction/INVALID_ID");
		expect(response.status).toBe(404);
	});
});
