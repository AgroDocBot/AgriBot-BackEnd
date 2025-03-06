-- DropIndex
DROP INDEX "CropField_ownerId_fieldname_key";

-- CreateTable
CREATE TABLE "RobotData" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "timeUsed" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lastBattery" INTEGER NOT NULL DEFAULT 100,
    "lastUsed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RobotData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RobotData_userId_key" ON "RobotData"("userId");

-- AddForeignKey
ALTER TABLE "RobotData" ADD CONSTRAINT "RobotData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
