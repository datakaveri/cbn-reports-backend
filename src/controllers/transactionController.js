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
};
