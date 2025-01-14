-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CropField" (
    "id" SERIAL NOT NULL,
    "fieldname" TEXT NOT NULL,
    "crop" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "CropField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measurement" (
    "id" SERIAL NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "explored" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fieldId" INTEGER NOT NULL,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthyPlant" (
    "id" SERIAL NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "crop" TEXT NOT NULL,
    "measurementId" INTEGER NOT NULL,

    CONSTRAINT "HealthyPlant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiseasedPlant" (
    "id" SERIAL NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "crop" TEXT NOT NULL,
    "disease" TEXT NOT NULL,
    "measurementId" INTEGER NOT NULL,

    CONSTRAINT "DiseasedPlant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disease" (
    "id" SERIAL NOT NULL,
    "diseaseName" TEXT NOT NULL,
    "affectedParts" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Disease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantType" (
    "id" SERIAL NOT NULL,
    "plantName" TEXT NOT NULL,
    "latinName" TEXT NOT NULL,
    "variety" TEXT NOT NULL,

    CONSTRAINT "PlantType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiseaseOnPlantType" (
    "plantTypeId" INTEGER NOT NULL,
    "diseaseid" INTEGER NOT NULL,

    CONSTRAINT "DiseaseOnPlantType_pkey" PRIMARY KEY ("plantTypeId","diseaseid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "CropField_ownerId_fieldname_key" ON "CropField"("ownerId", "fieldname");

-- CreateIndex
CREATE UNIQUE INDEX "Disease_diseaseName_key" ON "Disease"("diseaseName");

-- CreateIndex
CREATE UNIQUE INDEX "PlantType_plantName_key" ON "PlantType"("plantName");

-- CreateIndex
CREATE UNIQUE INDEX "PlantType_latinName_key" ON "PlantType"("latinName");

-- AddForeignKey
ALTER TABLE "CropField" ADD CONSTRAINT "CropField_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "CropField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthyPlant" ADD CONSTRAINT "HealthyPlant_measurementId_fkey" FOREIGN KEY ("measurementId") REFERENCES "Measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseasedPlant" ADD CONSTRAINT "DiseasedPlant_measurementId_fkey" FOREIGN KEY ("measurementId") REFERENCES "Measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseaseOnPlantType" ADD CONSTRAINT "DiseaseOnPlantType_plantTypeId_fkey" FOREIGN KEY ("plantTypeId") REFERENCES "PlantType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseaseOnPlantType" ADD CONSTRAINT "DiseaseOnPlantType_diseaseid_fkey" FOREIGN KEY ("diseaseid") REFERENCES "Disease"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
