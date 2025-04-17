const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const logger = require("../../utils/logger");
const fetchTransactionLimit = require("../utils/fetchTransactionLimit");

const fetchCumulativeCashLimit = async (startDate, endDate) => {
	try {
		logger.info("Fetching cumulative cash limit");

		const transactionLimit = await fetchTransactionLimit(
			"CumulativeAgent",
			"Withdrawal",
			"Day"
		);

		if (!transactionLimit) {
			logger.warn(
				`No transaction limit found for CumulativeAgent Withdrawal Week`
			);
			return null;
		} else {
			console.log(transactionLimit.limit);

			// Fetch cumulative cash limit grouped by cardNumber
			const results = await prisma.pOSAggregate.groupBy({
				by: ["cardNumber", "date"], // Group by cardNumber and date
				_sum: {
					volume: true, // Aggregate sum of volume
				},
				where: {
					date: {
						gte: new Date(startDate),
						lte: new Date(endDate), // Filter by the provided date
					},
				},
				having: {
					volume: {
						_sum: {
							gt: 1000, // Only include groups where the sum of volume is greater than 1000
						},
					},
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
						date: result.date,
						transactionSum: 0,
						percentage: 0,
					};
				}
				acc[bvn].transactionSum += result._sum.volume;
				acc[bvn].percentage += (result._sum.volume / 1000) * 100 - 100;
				return acc;
			}, {});

			// Convert the grouped results to an array1000
			return Object.values(groupedResults);
		}
	} catch (error) {
		logger.error("Error fetching cumulative cash limit: ", error);
		throw error;
	}
};

module.exports = fetchCumulativeCashLimit;
