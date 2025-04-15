/*
  Warnings:

  - You are about to drop the column `amount` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `currencyCode` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `entity` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transactionDate` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `acquiringInstitutionId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `additionalAmounts` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorizationCode` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardAcceptorName` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardExpiryDate` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardSequenceNumber` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forwardingInstitutionId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localTransactionDate` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localTransactionTime` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mac` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchantCategoryCode` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posConditionCode` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posDataCode` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posEntryMode` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryAccountNumber` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processingCode` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responseCode` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `retrievalReferenceNumber` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceRestrictionCode` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `systemTraceAuditNumber` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `terminalId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `track2Data` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionAmount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transmissionDateTime` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "amount",
DROP COLUMN "currencyCode",
DROP COLUMN "entity",
DROP COLUMN "status",
DROP COLUMN "transactionDate",
ADD COLUMN     "acquiringInstitutionId" TEXT NOT NULL,
ADD COLUMN     "additionalAmounts" TEXT NOT NULL,
ADD COLUMN     "authorizationCode" TEXT NOT NULL,
ADD COLUMN     "cardAcceptorName" TEXT NOT NULL,
ADD COLUMN     "cardExpiryDate" TEXT NOT NULL,
ADD COLUMN     "cardSequenceNumber" TEXT NOT NULL,
ADD COLUMN     "forwardingInstitutionId" TEXT NOT NULL,
ADD COLUMN     "localTransactionDate" TEXT NOT NULL,
ADD COLUMN     "localTransactionTime" TEXT NOT NULL,
ADD COLUMN     "mac" TEXT NOT NULL,
ADD COLUMN     "merchantCategoryCode" TEXT NOT NULL,
ADD COLUMN     "posConditionCode" TEXT NOT NULL,
ADD COLUMN     "posDataCode" TEXT NOT NULL,
ADD COLUMN     "posEntryMode" TEXT NOT NULL,
ADD COLUMN     "primaryAccountNumber" TEXT NOT NULL,
ADD COLUMN     "processingCode" TEXT NOT NULL,
ADD COLUMN     "responseCode" TEXT NOT NULL,
ADD COLUMN     "retrievalReferenceNumber" TEXT NOT NULL,
ADD COLUMN     "serviceRestrictionCode" TEXT NOT NULL,
ADD COLUMN     "systemTraceAuditNumber" TEXT NOT NULL,
ADD COLUMN     "terminalId" TEXT NOT NULL,
ADD COLUMN     "track2Data" TEXT NOT NULL,
ADD COLUMN     "transactionAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "transmissionDateTime" TIMESTAMP(3) NOT NULL;
