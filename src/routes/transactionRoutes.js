const express = require("express");
const swaggerUi = require("swagger-ui-express");
const transactionController = require("../controllers/transactionController");
const docsController = require("../controllers/docsController");
const logger = require("../utils/logger");

const router = express.Router();

// Middleware to log incoming requests
router.use((req, res, next) => {
	logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);
	next();
});

// Transaction routes
router.get(
	"/transaction/:transactionId",
	transactionController.getTransactionDetails
);

router.get("/cashlimit/pos", transactionController.getCashLimitForPos);
router.get("/cashlimit/agent", transactionController.getAgentBankingLimit);
router.get(
	"/cashlimit/agent/cumulative",
	transactionController.getCumulativeCashLimit
);

router.get("/compliance/merchant", transactionController.getMerchantCompliance);
router.get("/compliance/agent", transactionController.getAgentCompliance);

router.get(
	"/topcashincashout/merchant/volume",
	transactionController.getMerchantTopCashInCashOut
);
router.get(
	"/topcashincashout/agent/volume",
	transactionController.getAgentTopCashInCashOut
);
router.get(
	"/topcashincashout/merchant/count",
	transactionController.getMerchantTopCount
);
router.get(
	"/topcashincashout/agent/count",
	transactionController.getAgentTopCount
);

// Add /docs route to serve Swagger documentation
router.use("/docs", swaggerUi.serve, docsController.serveDocs);

module.exports = router;
