const express = require("express");
const transactionController = require("../controllers/transactionController");

const router = express.Router();

router.get(
  "/transaction/:transactionId",
  transactionController.getTransactionDetails
);

router.get("/cashlimit/pos/:posID", transactionController.getCashLimitForPos);
router.get(
  "/cashlimit/agent/:agentId",
  transactionController.getAgentBankingLimit
);

router.get(
  "/cashlimit/agent/cumulative/:agentId1",
  transactionController.getCumulativeCashLimit
);
router.get(
  "/compliance/merchant/:merchantId",
  transactionController.getMerchantCompliance
);

router.get(
  "/compliance/agent/:agentId",
  transactionController.getAgentCompliance
);

router.get(
  "/topcashincashout/merchant/:merchantId",
  transactionController.getMerchantTopCashInCashOut
);
router.get(
  "/topcashincashout/agent/:agentId",
  transactionController.getAgentTopCashInCashOut
);

module.exports = router;
