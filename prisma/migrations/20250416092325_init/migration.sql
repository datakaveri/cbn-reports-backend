-- CreateTable
CREATE TABLE "POSAggregate" (
    "id" SERIAL NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "posId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hour" INTEGER NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "POSAggregate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchantAgentInventory" (
    "id" SERIAL NOT NULL,
    "bankCode" TEXT NOT NULL,
    "posId" TEXT NOT NULL,
    "merchantAgentCode" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "MerchantAgentInventory_pkey" PRIMARY KEY ("id")
);
