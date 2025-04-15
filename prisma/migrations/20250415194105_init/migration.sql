/*
  Warnings:

  - Added the required column `period` to the `POSCashLimit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "POSCashLimit" ADD COLUMN     "period" TEXT NOT NULL;
