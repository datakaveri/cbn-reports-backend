const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fetchCumulativeCashLimit = async (date) => {
	try {
		// Fetch cumulative cash limit grouped by BVN
		const results = await prisma.pOSAggregate.groupBy({
			by: ["cardNumber"], // Group by cardNumber first
			_sum: {
				volume: true, // Aggregate sum of volume
			},
			where: {
				date: new Date(date), // Filter by the provided date
			},
		});

		// Fetch BVN for each cardNumber
		const cardholderDetails = await prisma.cardholder.findMany({
			where: {
				cardNumber: {
					in: results.map((result) => result.cardNumber),
				},
			},
			select: {
				cardNumber: true,
				bvn: true,
			},
		});

		// Map cardNumber to BVN
		const bvnMap = cardholderDetails.reduce((map, cardholder) => {
			if (cardholder.bvn) {
				map[cardholder.cardNumber] = cardholder.bvn;
			}
			return map;
		}, {});

		// Transform the results to group by BVN
		const groupedResults = results.reduce((acc, result) => {
			const bvn = bvnMap[result.cardNumber];
			if (!bvn) return acc; // Skip if BVN is null or undefined

			if (!acc[bvn]) {
				acc[bvn] = {
					bvn,
					transactionSum: 0,
					percentage: 0,
				};
			}
			acc[bvn].transactionSum += result._sum.volume;
			acc[bvn].percentage += result._sum.volume / 1000;
			return acc;
		}, {});

		// Convert the grouped results to an array
		return Object.values(groupedResults).filter(
			(item) => item.transactionSum > 1000 // Apply HAVING clause
		);
	} catch (error) {
		console.error("Error in fetchCumulativeCashLimit:", error);
		throw error;
	}
};

module.exports = fetchCumulativeCashLimit;
