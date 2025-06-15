/*
  Warnings:

  - You are about to drop the column `parentPingId` on the `Ping` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ping" DROP CONSTRAINT "Ping_parentPingId_fkey";

-- AlterTable
ALTER TABLE "Ping" DROP COLUMN "parentPingId",
ADD COLUMN     "parentId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Ping" ADD CONSTRAINT "Ping_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Ping"("id") ON DELETE SET NULL ON UPDATE CASCADE;
