const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fetchMerchantTopCounts = require("./fetchMerchantTopCounts");
const fetchAgentTopCounts = require("./fetchAgentTopCounts");

const fetchMerchantTopCashInCashOut = require("./fetchMerchantTopCashInCashOut");
const fetchAgentTopCashInCashOut = require("./fetchAgentTopCashInCashOut");
const fetchCashLimitForPos = require("./fetchCashLimitForPos");
const fetchAgentBankingLimit = require("./fetchAgentBankingLimit");
const fetchCumulativeCashLimit = require("./fetchCumulativeCashLimit");
const {
	fetchMerchantCompliance,
	fetchAgentCompliance,
} = require("./complianceService");

module.exports = {
	fetchTransactionDetails: async (transactionId) => {
		return await prisma.transaction.findUnique({
			where: { transactionId },
		});
	},

	fetchCashLimitForPos,
	fetchAgentBankingLimit,
	fetchCumulativeCashLimit,

	fetchMerchantCompliance,
	fetchAgentCompliance,

	fetchMerchantTopCashInCashOut,
	fetchAgentTopCashInCashOut,

	fetchAgentTopCounts,
	fetchMerchantTopCounts,
};
