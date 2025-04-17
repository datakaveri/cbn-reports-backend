-- CreateTable
CREATE TABLE "ISO8583TransactionLog" (
    "id" SERIAL NOT NULL,
    "transactionId" TEXT NOT NULL,
    "ISO8583Log" TEXT NOT NULL,

    CONSTRAINT "ISO8583TransactionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ISO8583TransactionLog_transactionId_key" ON "ISO8583TransactionLog"("transactionId");
