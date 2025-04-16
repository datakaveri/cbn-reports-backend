-- CreateTable
CREATE TABLE "Cardholder" (
    "id" SERIAL NOT NULL,
    "bvn" TEXT NOT NULL,
    "bankCode" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,

    CONSTRAINT "Cardholder_pkey" PRIMARY KEY ("id")
);
