const fetchTransactionDetails = require("./transaction/fetchTransactionDetails");
const fetchMerchantTopCounts = require("./topCounts/fetchMerchantTopCounts");
const fetchAgentTopCounts = require("./topCounts/fetchAgentTopCounts");

const fetchMerchantTopCashInCashOut = require("./cashInCashOut/fetchMerchantTopCashInCashOut");
const fetchAgentTopCashInCashOut = require("./cashInCashOut/fetchAgentTopCashInCashOut");
const fetchCashLimitForPos = require("./cashLimit/fetchCashLimitForPos");
const fetchAgentBankingLimit = require("./cashLimit/fetchAgentBankingLimit");
const fetchCumulativeCashLimit = require("./cashLimit/fetchCumulativeCashLimit");
const {
	fetchMerchantCompliance,
	fetchAgentCompliance,
} = require("./compliance/complianceService");

module.exports = {
	fetchTransactionDetails,

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
