-- CreateTable
CREATE TABLE "POSCashLimit" (
    "id" SERIAL NOT NULL,
    "posId" TEXT NOT NULL,
    "businessLocation" TEXT NOT NULL,
    "acquirerCode" TEXT NOT NULL,
    "cumulativeValue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "POSCashLimit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "POSCashLimit_posId_key" ON "POSCashLimit"("posId");
