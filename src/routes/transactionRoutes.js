const express = require("express");
const swaggerUi = require("swagger-ui-express");
const transactionController = require("../controllers/transactionController");
const cashLimitController = require("../controllers/cashLimitController");
const complianceController = require("../controllers/complianceController");
const topCountsController = require("../controllers/topCountsController");
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

router.get("/cashlimit/pos", cashLimitController.getCashLimitForPos);
router.get("/cashlimit/agent", cashLimitController.getAgentBankingLimit);
router.get(
	"/cashlimit/agent/cumulative",
	cashLimitController.getCumulativeCashLimit
);

router.get("/compliance/merchant", complianceController.getMerchantCompliance);
router.get("/compliance/agent", complianceController.getAgentCompliance);

router.get(
	"/topcashincashout/merchant/volume",
	topCountsController.getMerchantTopCashInCashOut
);
router.get(
	"/topcashincashout/agent/volume",
	topCountsController.getAgentTopCashInCashOut
);
router.get(
	"/topcashincashout/merchant/count",
	topCountsController.getMerchantTopCount
);
router.get(
	"/topcashincashout/agent/count",
	topCountsController.getAgentTopCount
);

// Add /docs route to serve Swagger documentation
router.use("/docs", swaggerUi.serve, docsController.serveDocs);

module.exports = router;
