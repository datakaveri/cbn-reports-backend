/*
  Warnings:

  - Added the required column `TransactionType` to the `POSAggregate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "POSAggregate" ADD COLUMN     "TransactionType" TEXT NOT NULL;
