const express = require("express");
const transactionController = require("../controllers/transactionController");

const router = express.Router();

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
	"/topcashincashout/merchant",
	transactionController.getMerchantTopCashInCashOut
);
router.get(
	"/topcashincashout/agent",
	transactionController.getAgentTopCashInCashOut
);

module.exports = router;
