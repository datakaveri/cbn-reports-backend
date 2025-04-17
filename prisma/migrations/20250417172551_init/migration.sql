-- CreateTable
CREATE TABLE "TransactionLimit" (
    "id" SERIAL NOT NULL,
    "person" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "grain" TEXT NOT NULL,
    "limit" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TransactionLimit_pkey" PRIMARY KEY ("id")
);
