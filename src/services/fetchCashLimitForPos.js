const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fetchCashLimitForPos = async (date) => {
	const results = await prisma.pOSAggregate.groupBy({
		by: ["posId"],
		_sum: {
			volume: true,
		},
		where: {
			date: new Date(date), // Filter by the provided date
		},
		having: {
			volume: {
				_sum: {
					gt: 1000, // Only include groups where the sum of volume is greater than 1000
				},
			},
		},
	});

	// Transform the results to include Percentage
	return results.map((item) => ({
		posId: item.posId,
		transactionSum: item._sum.volume,
		percentage: item._sum.volume / 1000, // Calculate percentage
	}));
};

module.exports = fetchCashLimitForPos;
