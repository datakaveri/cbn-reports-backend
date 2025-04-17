const transactionService = require("../services/transactionService");
const logger = require("../utils/logger");

module.exports = {
	getMerchantTopCashInCashOut: async (req, res) => {
		const { startDate, endDate } = req.query;
		logger.info(
			`Fetching merchant top cash in/cash out from ${startDate} to ${endDate}`
		);
		try {
			const data = await transactionService.fetchMerchantTopCashInCashOut(
				startDate,
				endDate
			);
			logger.info(
				`Merchant top cash in/cash out fetched successfully from ${startDate} to ${endDate}`
			);
			res.status(200).json(data);
		} catch (error) {
			logger.error(
				`Error fetching merchant top cash in/cash out from ${startDate} to ${endDate} - ${error.message}`
			);
			res.status(error.status || 500).json({ message: error.message });
		}
	},

	getAgentTopCashInCashOut: async (req, res) => {
		const { startDate, endDate } = req.query;
		logger.info(
			`Fetching agent top cash in/cash out from ${startDate} to ${endDate}`
		);
		try {
			const data = await transactionService.fetchAgentTopCashInCashOut(
				startDate,
				endDate
			);
			logger.info(
				`Agent top cash in/cash out fetched successfully from ${startDate} to ${endDate}`
			);
			res.status(200).json(data);
		} catch (error) {
			logger.error(
				`Error fetching agent top cash in/cash out from ${startDate} to ${endDate} - ${error.message}`
			);
			res.status(error.status || 500).json({ message: error.message });
		}
	},

	getMerchantTopCount: async (req, res) => {
		const { startDate, endDate } = req.query;
		logger.info(
			`Fetching merchant top count from ${startDate} to ${endDate}`
		);
		try {
			const data = await transactionService.fetchMerchantTopCounts(
				startDate,
				endDate
			);
			logger.info(
				`Merchant top count fetched successfully from ${startDate} to ${endDate}`
			);
			res.status(200).json(data);
		} catch (error) {
			logger.error(
				`Error fetching merchant top count from ${startDate} to ${endDate} - ${error.message}`
			);
			res.status(error.status || 500).json({ message: error.message });
		}
	},

	getAgentTopCount: async (req, res) => {
		const { startDate, endDate } = req.query;
		logger.info(`Fetching agent top count from ${startDate} to ${endDate}`);
		try {
			const data = await transactionService.fetchAgentTopCounts(
				startDate,
				endDate
			);
			logger.info(
				`Agent top count fetched successfully from ${startDate} to ${endDate}`
			);
			res.status(200).json(data);
		} catch (error) {
			logger.error(
				`Error fetching agent top count from ${startDate} to ${endDate} - ${error.message}`
			);
			res.status(error.status || 500).json({ message: error.message });
		}
	},
};
