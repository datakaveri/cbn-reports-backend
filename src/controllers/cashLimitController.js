const transactionService = require("../services/transactionService");
const logger = require("../utils/logger");

module.exports = {
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
};
