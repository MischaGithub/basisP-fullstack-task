/*
  Warnings:

  - You are about to drop the column `parentId` on the `Ping` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ping" DROP CONSTRAINT "Ping_parentId_fkey";

-- AlterTable
ALTER TABLE "Ping" DROP COLUMN "parentId",
ADD COLUMN     "parentPingId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "role",
DROP COLUMN "updatedAt";

-- DropEnum
DROP TYPE "Role";

-- AddForeignKey
ALTER TABLE "Ping" ADD CONSTRAINT "Ping_parentPingId_fkey" FOREIGN KEY ("parentPingId") REFERENCES "Ping"("id") ON DELETE SET NULL ON UPDATE CASCADE;
