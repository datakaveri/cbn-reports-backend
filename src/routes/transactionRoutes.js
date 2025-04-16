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

module.exports = router;
