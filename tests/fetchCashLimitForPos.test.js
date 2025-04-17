const fetchCashLimitForPos = require("../src/services/cashLimit/fetchCashLimitForPos");

describe("fetchCashLimitForPos Service", () => {
	it("should fetch cash limits for POS", async () => {
		const startDate = "2025-04-01";
		const endDate = "2025-04-15";
		const result = await fetchCashLimitForPos(startDate, endDate);
		expect(result).toBeInstanceOf(Array);
		expect(result[0]).toHaveProperty("posId");
		expect(result[0]).toHaveProperty("transactionSum");
	});

	it("should throw an error for invalid dates", async () => {
		await expect(
			fetchCashLimitForPos("invalid", "invalid")
		).rejects.toThrow();
	});
});
