const { PrismaClient } = require("@prisma/client");
const logger = require("../utils/logger");
const prisma = new PrismaClient();

module.exports = async function fetchCashLimitForPos(startDate, endDate) {
	logger.info(`Fetching cash limit for POS from ${startDate} to ${endDate}`);
	try {
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
						gt: 1000, // Only include groups where the sum of volume is greater than 1000
					},
				},
			},
		});

		// Fetch merchantAgentCode and location for each posId
		const merchantDetails = await prisma.merchantAgentInventory.findMany({
			where: {
				posId: {
					in: results.map((result) => result.posId),
				},
			},
			select: {
				posId: true,
				merchantAgentCode: true,
				location: true,
			},
		});

		// Map posId to merchantAgentCode and location
		const merchantMap = merchantDetails.reduce((map, merchant) => {
			map[merchant.posId] = {
				merchantAgentCode: merchant.merchantAgentCode,
				location: merchant.location,
			};
			return map;
		}, {});

		// Transform the results to include merchantAgentCode, location, and percentage
		const transformedResults = results.map((item) => {
			const merchantInfo = merchantMap[item.posId] || {
				merchantAgentCode: null,
				location: null,
			};
			return {
				posId: item.posId,
				merchantAgentCode: merchantInfo.merchantAgentCode,
				location: merchantInfo.location,
				date: item.date,
				transactionSum: item._sum.volume,
				percentage: item._sum.volume / 1000, // Calculate percentage
			};
		});

		logger.info("Cash limit fetched successfully");
		return transformedResults;
	} catch (error) {
		logger.error(`Error fetching cash limit: ${error.message}`);
		throw error;
	}
};
