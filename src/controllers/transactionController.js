const transactionService = require("../services/transactionService");
const logger = require("../utils/logger");

module.exports = {
	getTransactionDetails: async (req, res) => {
		const { transactionId } = req.params;
		logger.info(`Fetching transaction details for ID: ${transactionId}`);
		try {
			const data = await transactionService.fetchTransactionDetails(
				transactionId
			);
			logger.info(
				`Transaction details fetched successfully for ID: ${transactionId}`
			);
			res.status(200).json(data);
		} catch (error) {
			logger.error(
				`Error fetching transaction details for ID: ${transactionId} - ${error.message}`
			);
			res.status(error.status || 500).json({ message: error.message });
		}
	},
	getCashLimitForPos: async (req, res) => {
		const { startDate, endDate } = req.query;
		logger.info(
			`Fetching cash limit for POS from ${startDate} to ${endDate}`
		);
		try {
			const data = await transactionService.fetchCashLimitForPos(
				startDate,
				endDate
			);
			logger.info(
				`Cash limit for POS fetched successfully from ${startDate} to ${endDate}`
			);
			res.status(200).json(data);
		} catch (error) {
			logger.error(
				`Error fetching cash limit for POS from ${startDate} to ${endDate} - ${error.message}`
			);
			res.status(error.status || 500).json({ message: error.message });
		}
	},
	getAgentBankingLimit: async (req, res) => {
		const { startDate, endDate } = req.query;
		logger.info(
			`Fetching agent banking limit from ${startDate} to ${endDate}`
		);
		try {
			const data = await transactionService.fetchAgentBankingLimit(
				startDate,
				endDate
			);
			logger.info(
				`Agent banking limit fetched successfully from ${startDate} to ${endDate}`
			);
			res.status(200).json(data);
		} catch (error) {
			logger.error(
				`Error fetching agent banking limit from ${startDate} to ${endDate} - ${error.message}`
			);
			res.status(error.status || 500).json({ message: error.message });
		}
	},
	getCumulativeCashLimit: async (req, res) => {
		const { startDate, endDate } = req.query;
		logger.info(
			`Fetching cumulative cash limit from ${startDate} to ${endDate}`
		);
		try {
			const data = await transactionService.fetchCumulativeCashLimit(
				startDate,
				endDate
			);
			logger.info(
				`Cumulative cash limit fetched successfully from ${startDate} to ${endDate}`
			);
			res.status(200).json(data);
		} catch (error) {
			logger.error(
				`Error fetching cumulative cash limit from ${startDate} to ${endDate} - ${error.message}`
			);
			res.status(error.status || 500).json({ message: error.message });
		}
	},
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
