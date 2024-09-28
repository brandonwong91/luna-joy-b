/*
  Warnings:

  - You are about to drop the column `name` on the `Log` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Log_name_idx";

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "name",
ALTER COLUMN "sleepHours" DROP NOT NULL,
ALTER COLUMN "symptoms" DROP NOT NULL;
