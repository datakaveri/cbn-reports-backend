const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fetchMerchantTopCashInCashOut = async (startDate, endDate) => {
	const volumeResults = await prisma.pOSAggregate.groupBy({
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
			_sum: {
				volume: "desc",
			},
		},
		take: 100,
	});

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
				in: volumeResults.map((result) => result.posId),
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

	return {
		top100Volume: volumeResults.map((result) => ({
			transactionType: result.transactionType,
			posId: result.posId,
			merchantAgentCode:
				merchantMap[result.posId]?.merchantAgentCode || null,
			category: merchantMap[result.posId]?.category || null,
			location: merchantMap[result.posId]?.location || null,
			sum: result._sum.volume,
			count: result._count.id,
		})),
		top100Count: countResults.map((result) => ({
			transactionType: result.transactionType,
			posId: result.posId,
			merchantAgentCode:
				merchantMap[result.posId]?.merchantAgentCode || null,
			category: merchantMap[result.posId]?.category || null,
			location: merchantMap[result.posId]?.location || null,
			sum: result._sum.volume,
			count: result._count.id,
		})),
	};
};

module.exports = fetchMerchantTopCashInCashOut;
