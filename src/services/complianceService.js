const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fetchMerchantCompliance = async () => {
	// Step 1: Fetch non-compliant merchants from MerchantAgentDetails
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
			bankCode: true,
			category: true,
		},
	});

	// Step 2: Fetch merchant inventory details for the corresponding codes
	const merchantCodes = nonCompliantMerchants.map(
		(merchant) => merchant.code
	);
	const merchantInventories = await prisma.merchantAgentInventory.findMany({
		where: {
			merchantAgentCode: {
				in: merchantCodes,
			},
		},
		select: {
			merchantAgentCode: true,
			location: true,
			category: true,
		},
	});

	// Step 3: Map merchantAgentCode to inventory details
	const inventoryMap = merchantInventories.reduce((map, inventory) => {
		map[inventory.merchantAgentCode] = {
			location: inventory.location,
			category: inventory.category,
		};
		return map;
	}, {});

	// Step 4: Combine merchant details with inventory details
	return nonCompliantMerchants.map((merchant) => ({
		id: merchant.id,
		code: merchant.code,
		bankCode: merchant.bankCode,
		category: merchant.category,
		location: inventoryMap[merchant.code]?.location || null,
	}));
};

const fetchAgentCompliance = async () => {
	// Step 1: Fetch non-compliant merchants from MerchantAgentDetails
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
			bankCode: true,
			category: true,
		},
	});

	// Step 2: Fetch merchant inventory details for the corresponding codes
	const agentCodes = nonCompliantAgents.map((merchant) => merchant.code);
	const agentInventories = await prisma.merchantAgentInventory.findMany({
		where: {
			merchantAgentCode: {
				in: agentCodes,
			},
		},
		select: {
			merchantAgentCode: true,
			location: true,
			category: true,
		},
	});

	// Step 3: Map merchantAgentCode to inventory details
	const inventoryMap = agentInventories.reduce((map, inventory) => {
		map[inventory.merchantAgentCode] = {
			location: inventory.location,
			category: inventory.category,
		};
		return map;
	}, {});

	// Step 4: Combine merchant details with inventory details
	return nonCompliantAgents.map((merchant) => ({
		id: merchant.id,
		code: merchant.code,
		bankCode: merchant.bankCode,
		category: merchant.category,
		location: inventoryMap[merchant.code]?.location || null,
	}));
};

module.exports = {
	fetchMerchantCompliance,
	fetchAgentCompliance,
};
