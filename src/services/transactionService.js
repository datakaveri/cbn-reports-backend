const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  fetchTransactionDetails: async (transactionId) => {
    return await prisma.transaction.findUnique({
      where: { transactionId },
    });
  },

  fetchCashLimitForPos: async (posID) => {
    // Logic to fetch cash limit for a POS
    return await prisma.pOSCashLimit.findUnique({
      where: { posId: posID },
    });
  },
  fetchAgentBankingLimit: async (agentId) => {
    // Logic to fetch agent banking limit
    return { agentId, limit: 100000 };
  },
  fetchCumulativeCashLimit: async (agentId1) => {
    // Logic to fetch cumulative cash limit
    return { agentId1, cumulativeLimit: 1000000 };
  },

  fetchMerchantCompliance: async (merchantId) => {
    // Logic to fetch merchant compliance
    return { merchantId, complianceStatus: "Compliant" };
  },
  fetchAgentCompliance: async (agentId) => {
    // Logic to fetch agent compliance
    return { agentId, complianceStatus: "Non-Compliant" };
  },

  fetchMerchantTopCashInCashOut: async (merchantId) => {
    // Logic to fetch top cash in/out for a merchant
    return { merchantId, topCashIn: 100000, topCashOut: 80000 };
  },
  fetchAgentTopCashInCashOut: async (agentId) => {
    // Logic to fetch top cash in/out for an agent
    return { agentId, topCashIn: 50000, topCashOut: 40000 };
  },
};
