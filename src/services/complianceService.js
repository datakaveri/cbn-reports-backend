const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fetchMerchantCompliance = async () => {
	const nonCompliantMerchants = await prisma.merchantAgentDetails.findMany({
		where: {
			bvn: null,
			tin: null,
			nin: null,
			category: "Merchant",
		},
		select: {
			id: true,
			code: true,
		},
	});

	return nonCompliantMerchants;
};

const fetchAgentCompliance = async () => {
	const nonCompliantAgents = await prisma.merchantAgentDetails.findMany({
		where: {
			bvn: null,
			tin: null,
			nin: null,
			category: "Agent",
		},
		select: {
			id: true,
			code: true,
		},
	});

	return nonCompliantAgents;
};

module.exports = {
	fetchMerchantCompliance,
	fetchAgentCompliance,
};
