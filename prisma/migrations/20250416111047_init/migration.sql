-- CreateTable
CREATE TABLE "MerchantAgentDetails" (
    "id" SERIAL NOT NULL,
    "bvn" TEXT NOT NULL,
    "bankCode" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "nin" TEXT,
    "tin" TEXT,

    CONSTRAINT "MerchantAgentDetails_pkey" PRIMARY KEY ("id")
);
