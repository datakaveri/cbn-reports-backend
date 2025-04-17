const { PrismaClient } = require("@prisma/client");
const logger = require("../../utils/logger");
const prisma = new PrismaClient();

module.exports = async function fetchTransactionLimit(person, type, grain) {
	logger.info(
		`Fetching transaction limit for person: ${person}, type: ${type}, grain: ${grain}`
	);
	try {
		const transactionLimit = await prisma.transactionLimit.findFirst({
			where: {
				person,
				type,
				grain,
			},
		});

		if (!transactionLimit) {
			logger.warn(
				`No transaction limit found for person: ${person}, type: ${type}, grain: ${grain}`
			);
			return null;
		}

		logger.info(
			`Transaction limit fetched successfully for person: ${person}, type: ${type}, grain: ${grain}`
		);
		return transactionLimit;
	} catch (error) {
		logger.error(`Error fetching transaction limit: ${error.message}`);
		throw error;
	}
};
