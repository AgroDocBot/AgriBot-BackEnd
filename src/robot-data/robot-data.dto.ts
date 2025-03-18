// src/robotData/robotData.dto.ts

export class CreateRobotDataDto {
    userId: number;
  }
  
  export class UpdateRobotDataDto {
    userId: number;
    lastBattery?: number;
    timeUsed?: number;
  }
  