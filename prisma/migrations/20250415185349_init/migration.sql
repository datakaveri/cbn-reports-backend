/*
  Warnings:

  - Added the required column `amount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currencyCode` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entity` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchantId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionFee` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "currencyCode" TEXT NOT NULL,
ADD COLUMN     "entity" TEXT NOT NULL,
ADD COLUMN     "merchantId" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "transactionFee" DOUBLE PRECISION NOT NULL;
