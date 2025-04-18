const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const logger = require("../../utils/logger");
const fetchTransactionLimit = require("../utils/fetchTransactionLimit");

const fetchCumulativeCashLimit = async (startDate, endDate) => {
	try {
		logger.info("Fetching cumulative cash limit");

		// Fetch transaction limit for CumulativeAgent Withdrawal Day
		const transactionLimit = await fetchTransactionLimit(
			"CumulativeAgent",
			"Withdrawal",
			"Day"
		);

		if (!transactionLimit) {
			logger.warn(
				`No transaction limit found for CumulativeAgent Withdrawal Day`
			);
			return null;
		}

		// Fetch cumulative cash limit grouped by cardNumber and date
		const results = await prisma.pOSAggregate.groupBy({
			by: ["cardNumber", "date", "posId"], // Include posId for joining with MerchantAgentInventory
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

		// Fetch BVN and MerchantAgent details for each cardNumber and posId
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

		const merchantAgentDetails =
			await prisma.merchantAgentInventory.findMany({
				where: {
					posId: {
						in: results.map((result) => result.posId),
					},
				},
				select: {
					posId: true,
					bankCode: true,
					location: true,
				},
			});

		// Map cardNumber to BVN
		const bvnMap = cardholderDetails.reduce((map, cardholder) => {
			if (cardholder.bvn) {
				map[cardholder.cardNumber] = cardholder.bvn;
			}
			return map;
		}, {});

		// Map posId to MerchantAgent details
		const merchantAgentMap = merchantAgentDetails.reduce((map, agent) => {
			map[agent.posId] = {
				bankCode: agent.bankCode,
				location: agent.location,
			};
			return map;
		}, {});

		// Transform the results to group by BVN and include MerchantAgent details
		const groupedResults = results.reduce((acc, result) => {
			const bvn = bvnMap[result.cardNumber];
			const merchantAgent = merchantAgentMap[result.posId];
			if (!bvn || !merchantAgent) return acc; // Skip if BVN or MerchantAgent details are missing

			if (!acc[bvn]) {
				acc[bvn] = {
					bvn,
					date: result.date,
					transactionSum: 0,
					percentage: 0,
					bankCode: merchantAgent.bankCode,
					location: merchantAgent.location,
				};
			}
			acc[bvn].transactionSum += result._sum.volume;
			acc[bvn].percentage +=
				(result._sum.volume / transactionLimit.limit) * 100 - 100;
			return acc;
		}, {});

		// Convert the grouped results to an array
		return Object.values(groupedResults);
	} catch (error) {
		logger.error("Error fetching cumulative cash limit: ", error);
		throw error;
	}
};

module.exports = fetchCumulativeCashLimit;
