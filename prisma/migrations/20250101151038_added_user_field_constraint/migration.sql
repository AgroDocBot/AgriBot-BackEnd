/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,fieldname]` on the table `CropField` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `CropField_ownerId_fieldname_key` ON `CropField`(`ownerId`, `fieldname`);
