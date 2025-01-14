-- CreateTable
CREATE TABLE `Disease` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `diseaseName` VARCHAR(191) NOT NULL,
    `affectedParts` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Disease_diseaseName_key`(`diseaseName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlantType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plantName` VARCHAR(191) NOT NULL,
    `latinName` VARCHAR(191) NOT NULL,
    `variety` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PlantType_plantName_key`(`plantName`),
    UNIQUE INDEX `PlantType_latinName_key`(`latinName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DiseaseOnPlantType` (
    `plantTypeId` INTEGER NOT NULL,
    `diseaseid` INTEGER NOT NULL,

    PRIMARY KEY (`plantTypeId`, `diseaseid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DiseaseOnPlantType` ADD CONSTRAINT `DiseaseOnPlantType_plantTypeId_fkey` FOREIGN KEY (`plantTypeId`) REFERENCES `PlantType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DiseaseOnPlantType` ADD CONSTRAINT `DiseaseOnPlantType_diseaseid_fkey` FOREIGN KEY (`diseaseid`) REFERENCES `Disease`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
