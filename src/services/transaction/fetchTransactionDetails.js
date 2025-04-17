const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function fetchTransactionDetails(transactionId) {
	try {
		return await prisma.transaction.findUnique({
			where: { transactionId },
		});
	} catch (error) {
		throw new Error(`Error fetching transaction details: ${error.message}`);
	}
};
