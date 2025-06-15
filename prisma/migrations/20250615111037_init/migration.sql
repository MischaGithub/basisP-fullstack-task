/*
  Warnings:

  - You are about to drop the column `lat` on the `Ping` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `Ping` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `Ping` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `Ping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Ping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('AGENT', 'ADMIN');

-- AlterTable
ALTER TABLE "Ping" DROP COLUMN "lat",
DROP COLUMN "lng",
DROP COLUMN "timestamp",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'AGENT',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
