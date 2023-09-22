/*
  Warnings:

  - A unique constraint covering the columns `[referenceCode]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "referenceCode" TEXT,
ALTER COLUMN "status" SET DEFAULT 'unconfirmed';

-- CreateIndex
CREATE UNIQUE INDEX "Payment_referenceCode_key" ON "Payment"("referenceCode");
