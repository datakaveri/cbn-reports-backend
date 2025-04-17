const transactionService = require("../services/transactionService");

module.exports = {
	getTransactionDetails: async (req, res) => {
		const { transactionId } = req.params;
		try {
			const data = await transactionService.fetchTransactionDetails(
				transactionId
			);
			res.status(200).json(data);
		} catch (error) {
			res.status(error.status || 500).json({ message: error.message });
		}
	},
	getCashLimitForPos: async (req, res) => {
		const { startDate, endDate } = req.query;
		try {
			const data = await transactionService.fetchCashLimitForPos(
				startDate,
				endDate
			);
			res.status(200).json(data);
		} catch (error) {
			res.status(error.status || 500).json({ message: error.message });
		}
	},
	getAgentBankingLimit: async (req, res) => {
		const { startDate, endDate } = req.query;
		try {
			const data = await transactionService.fetchAgentBankingLimit(
				startDate,
				endDate
			);
			res.status(200).json(data);
		} catch (error) {
			res.status(error.status || 500).json({ message: error.message });
		}
	},
	getCumulativeCashLimit: async (req, res) => {
		const { startDate, endDate } = req.query;
		try {
			const data = await transactionService.fetchCumulativeCashLimit(
				startDate,
				endDate
			);
			res.status(200).json(data);
		} catch (error) {
			res.status(error.status || 500).json({ message: error.message });
		}
	},
	getMerchantCompliance: async (req, res) => {
		try {
			const data = await transactionService.fetchMerchantCompliance();
			res.status(200).json(data);
		} catch (error) {
			res.status(error.status || 500).json({ message: error.message });
		}
	},
	getAgentCompliance: async (req, res) => {
		try {
			const data = await transactionService.fetchAgentCompliance();
			res.status(200).json(data);
		} catch (error) {
			res.status(error.status || 500).json({ message: error.message });
		}
	},
	getMerchantTopCashInCashOut: async (req, res) => {
		const { startDate, endDate } = req.query;
		try {
			const data = await transactionService.fetchMerchantTopCashInCashOut(
				startDate,
				endDate
			);
			res.status(200).json(data);
		} catch (error) {
			res.status(error.status || 500).json({ message: error.message });
		}
	},
	getAgentTopCashInCashOut: async (req, res) => {
		const { startDate, endDate } = req.query;
		try {
			const data = await transactionService.fetchAgentTopCashInCashOut(
				startDate,
				endDate
			);
			res.status(200).json(data);
		} catch (error) {
			res.status(error.status || 500).json({ message: error.message });
		}
	},
	getMerchantTopCount: async (req, res) => {
		const { startDate, endDate } = req.query;
		try {
			const data = await transactionService.fetchMerchantTopCounts(
				startDate,
				endDate
			);
			res.status(200).json(data);
		} catch (error) {
			res.status(error.status || 500).json({ message: error.message });
		}
	},
	getAgentTopCount: async (req, res) => {
		const { startDate, endDate } = req.query;
		try {
			const data = await transactionService.fetchAgentTopCounts(
				startDate,
				endDate
			);
			res.status(200).json(data);
		} catch (error) {
			res.status(error.status || 500).json({ message: error.message });
		}
	},
};
