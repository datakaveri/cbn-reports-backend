/*
  Warnings:

  - You are about to drop the column `acquiringInstitutionId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `additionalAmounts` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `authorizationCode` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `cardAcceptorName` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `cardExpiryDate` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `cardSequenceNumber` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `forwardingInstitutionId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `localTransactionDate` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `localTransactionTime` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `mac` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `merchantCategoryCode` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `posConditionCode` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `posDataCode` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `posEntryMode` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `primaryAccountNumber` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `processingCode` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `responseCode` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `retrievalReferenceNumber` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `serviceRestrictionCode` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `systemTraceAuditNumber` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `terminalId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `track2Data` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transactionAmount` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transmissionDateTime` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currencyCode` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entity` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionDate` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "acquiringInstitutionId",
DROP COLUMN "additionalAmounts",
DROP COLUMN "authorizationCode",
DROP COLUMN "cardAcceptorName",
DROP COLUMN "cardExpiryDate",
DROP COLUMN "cardSequenceNumber",
DROP COLUMN "forwardingInstitutionId",
DROP COLUMN "localTransactionDate",
DROP COLUMN "localTransactionTime",
DROP COLUMN "mac",
DROP COLUMN "merchantCategoryCode",
DROP COLUMN "posConditionCode",
DROP COLUMN "posDataCode",
DROP COLUMN "posEntryMode",
DROP COLUMN "primaryAccountNumber",
DROP COLUMN "processingCode",
DROP COLUMN "responseCode",
DROP COLUMN "retrievalReferenceNumber",
DROP COLUMN "serviceRestrictionCode",
DROP COLUMN "systemTraceAuditNumber",
DROP COLUMN "terminalId",
DROP COLUMN "track2Data",
DROP COLUMN "transactionAmount",
DROP COLUMN "transmissionDateTime",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "currencyCode" TEXT NOT NULL,
ADD COLUMN     "entity" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "transactionDate" TIMESTAMP(3) NOT NULL;
