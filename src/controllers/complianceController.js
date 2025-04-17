const transactionService = require("../services/transactionService");
const logger = require("../utils/logger");

module.exports = {
	getMerchantCompliance: async (req, res) => {
		logger.info(`Fetching merchant compliance`);
		try {
			const data = await transactionService.fetchMerchantCompliance();
			logger.info(`Merchant compliance fetched successfully`);
			res.status(200).json(data);
		} catch (error) {
			logger.error(
				`Error fetching merchant compliance - ${error.message}`
			);
			res.status(error.status || 500).json({ message: error.message });
		}
	},

	getAgentCompliance: async (req, res) => {
		logger.info(`Fetching agent compliance`);
		try {
			const data = await transactionService.fetchAgentCompliance();
			logger.info(`Agent compliance fetched successfully`);
			res.status(200).json(data);
		} catch (error) {
			logger.error(`Error fetching agent compliance - ${error.message}`);
			res.status(error.status || 500).json({ message: error.message });
		}
	},
};
