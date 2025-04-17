const request = require("supertest");
const app = require("../src/index");

describe("Docs Controller", () => {
	it("should serve Swagger documentation", async () => {
		const response = await request(app).get("/api/docs");
		expect(response.status).toBe(200);
		expect(response.text).toContain("Swagger UI");
	});
});
