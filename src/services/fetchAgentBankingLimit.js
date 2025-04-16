const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fetchAgentBankingLimit = async (date) => {
	const results = await prisma.pOSAggregate.groupBy({
		by: ["posId"], // Group by posId first
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

	// Fetch merchantAgentCode for each posId where category = 'Agent'
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
		},
	});

	// Map posId to merchantAgentCode
	const agentMap = agentDetails.reduce((map, agent) => {
		if (agent.merchantAgentCode) {
			// Ensure merchantAgentCode is not null
			map[agent.posId] = agent.merchantAgentCode;
		}
		return map;
	}, {});

	// Transform the results to group by merchantAgentCode
	const groupedResults = results.reduce((acc, result) => {
		const merchantAgentCode = agentMap[result.posId];
		if (!merchantAgentCode) return acc; // Skip if merchantAgentCode is null or undefined

		if (!acc[merchantAgentCode]) {
			acc[merchantAgentCode] = {
				merchantAgentCode,
				transactionSum: 0,
				percentage: 0,
			};
		}
		acc[merchantAgentCode].transactionSum += result._sum.volume;
		acc[merchantAgentCode].percentage += result._sum.volume / 1000;
		return acc;
	}, {});

	// Convert the grouped results to an array
	return Object.values(groupedResults);
};

module.exports = fetchAgentBankingLimit;
