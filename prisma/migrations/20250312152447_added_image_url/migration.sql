/*
  Warnings:

  - Added the required column `imageUrl` to the `DiseasedPlant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `HealthyPlant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiseasedPlant" ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HealthyPlant" ADD COLUMN     "imageUrl" TEXT NOT NULL;
