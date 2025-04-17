const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fetchMerchantTopCashInCashOut = async (startDate, endDate) => {
	try {
		logger.info("Fetching Merchant Top Cash In/Out");

		const countResults = await prisma.pOSAggregate.groupBy({
			by: ["transactionType", "posId"],
			_sum: {
				volume: true,
			},
			_count: {
				id: true,
			},
			where: {
				transactionType: {
					in: ["Withdrawal", "Deposit"],
				},
				posId: {
					in: await prisma.merchantAgentInventory
						.findMany({
							where: { category: "Merchant" },
							select: { posId: true },
						})
						.then((merchants) => merchants.map((m) => m.posId)),
				},
				date: {
					gte: new Date(startDate),
					lte: new Date(endDate),
				},
			},
			orderBy: {
				_count: {
					id: "desc",
				},
			},
			take: 100,
		});

		const merchantDetails = await prisma.merchantAgentInventory.findMany({
			where: {
				posId: {
					in: countResults.map((result) => result.posId),
				},
			},
			select: {
				posId: true,
				merchantAgentCode: true,
				category: true,
				location: true,
			},
		});

		const merchantMap = merchantDetails.reduce((map, merchant) => {
			map[merchant.posId] = {
				merchantAgentCode: merchant.merchantAgentCode,
				category: merchant.category,
				location: merchant.location,
			};
			return map;
		}, {});

		return countResults.map((result) => ({
			transactionType: result.transactionType,
			posId: result.posId,
			merchantAgentCode:
				merchantMap[result.posId]?.merchantAgentCode || null,
			category: merchantMap[result.posId]?.category || null,
			location: merchantMap[result.posId]?.location || null,
			sum: result._sum.volume,
			count: result._count.id,
		}));
	} catch (error) {
		logger.error("Error fetching Merchant Top Cash In/Out: ", error);
		throw new errpr();
	}
};

module.exports = fetchMerchantTopCashInCashOut;
