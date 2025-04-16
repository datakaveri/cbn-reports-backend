const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fetchMerchantTopCashInCashOut = require("./fetchMerchantTopCashInCashOut");
const fetchAgentTopCashInCashOut = require("./fetchAgentTopCashInCashOut");

module.exports = {
	fetchTransactionDetails: async (transactionId) => {
		return await prisma.transaction.findUnique({
			where: { transactionId },
		});
	},

	fetchCashLimitForPos: async (posID) => {
		return await prisma.pOSCashLimit.findUnique({
			where: { posId: posID },
		});
	},

	fetchAgentBankingLimit: async (agentId) => {
		return { agentId, limit: 100000 };
	},

	fetchCumulativeCashLimit: async (agentId1) => {
		return { agentId1, cumulativeLimit: 1000000 };
	},

	fetchMerchantCompliance: async (merchantId) => {
		return { merchantId, complianceStatus: "Compliant" };
	},

	fetchAgentCompliance: async (agentId) => {
		return { agentId, complianceStatus: "Non-Compliant" };
	},

	fetchMerchantTopCashInCashOut,
	fetchAgentTopCashInCashOut,
};
