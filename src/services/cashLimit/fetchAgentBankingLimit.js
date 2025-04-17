const { PrismaClient } = require("@prisma/client");
const logger = require("../../utils/logger");
const prisma = new PrismaClient();
const fetchTransactionLimit = require("../utils/fetchTransactionLimit");

const fetchAgentBankingLimit = async (startDate, endDate) => {
	logger.info(
		`Fetching cash limit for Agent from ${startDate} to ${endDate}`
	);
	try {
		const transactionLimit = await fetchTransactionLimit(
			"Customer",
			"Transaction",
			"Day"
		);

		if (!transactionLimit) {
			logger.warn(
				`No transaction limit found for Customer Transaction Day`
			);
			return null;
		} else {
			const results = await prisma.pOSAggregate.groupBy({
				by: ["posId", "date"], // Group by posId and date
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
							gt: transactionLimit.limit, // Only include groups where the sum of volume is greater than 1000
						},
					},
				},
			});

			// Fetch merchantAgentCode and location for each posId where category = 'Agent'
			const agentDetails = await prisma.merchantAgentInventory.findMany({
				where: {
					posId: {
						in: results.map((result) => result.posId),
					},
					category: "Agent", // Filter only agents
				},
				select: {
					posId: true,
					merchantAgentCode: true,
					location: true,
				},
			});

			// Map posId to merchantAgentCode and location
			const agentMap = agentDetails.reduce((map, agent) => {
				if (agent.merchantAgentCode) {
					// Ensure merchantAgentCode is not null
					map[agent.posId] = {
						merchantAgentCode: agent.merchantAgentCode,
						location: agent.location,
					};
				}
				return map;
			}, {});

			// Transform the results to include merchantAgentCode, location, and percentage
			const groupedResults = results.reduce((acc, result) => {
				const agentInfo = agentMap[result.posId];
				if (!agentInfo) return acc; // Skip if no agent information is found

				const { merchantAgentCode, location } = agentInfo;

				if (!acc[merchantAgentCode]) {
					acc[merchantAgentCode] = {
						merchantAgentCode,
						location,
						date: result.date,
						transactionSum: 0,
						percentage: 0,
					};
				}
				acc[merchantAgentCode].transactionSum += result._sum.volume;
				acc[merchantAgentCode].percentage +=
					(result._sum.volume / transactionLimit.limit) * 100 - 100;
				return acc;
			}, {});

			// Convert the grouped results to an array
			logger.info(
				`Fetched cash limit for Agent from ${startDate} to ${endDate}`
			);
			return Object.values(groupedResults);
		}
	} catch (error) {
		logger.error("Error fetching cash limit for Agent", error);
		throw new error();
	}
};

module.exports = fetchAgentBankingLimit;
