const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fetchAgentTopCashInCashOut = async (startDate, endDate) => {
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
						where: { category: "Agent" },
						select: { posId: true },
					})
					.then((agents) => agents.map((a) => a.posId)),
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
						where: { category: "Agent" },
						select: { posId: true },
					})
					.then((agents) => agents.map((a) => a.posId)),
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

	const agentDetails = await prisma.merchantAgentInventory.findMany({
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

	const agentMap = agentDetails.reduce((map, agent) => {
		map[agent.posId] = {
			merchantAgentCode: agent.merchantAgentCode,
			category: agent.category,
			location: agent.location,
		};
		return map;
	}, {});

	return {
		top100Volume: volumeResults.map((result) => ({
			transactionType: result.transactionType,
			posId: result.posId,
			merchantAgentCode:
				agentMap[result.posId]?.merchantAgentCode || null,
			category: agentMap[result.posId]?.category || null,
			location: agentMap[result.posId]?.location || null,
			sum: result._sum.volume,
			count: result._count.id,
		})),
		top100Count: countResults.map((result) => ({
			transactionType: result.transactionType,
			posId: result.posId,
			merchantAgentCode:
				agentMap[result.posId]?.merchantAgentCode || null,
			category: agentMap[result.posId]?.category || null,
			location: agentMap[result.posId]?.location || null,
			sum: result._sum.volume,
			count: result._count.id,
		})),
	};
};

module.exports = fetchAgentTopCashInCashOut;
