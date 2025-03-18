import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { RobotDataService } from './robot-data.service';
import { UpdateRobotDataDto } from './robot-data.dto';

@Controller('robot-data')
export class RobotDataController {
  constructor(private readonly robotDataService: RobotDataService) {}

  @Post(':userId')
  async createOrUpdate(@Param('userId') userId: number) {
    return this.robotDataService.createOrUpdate(Number(userId));
  }

  @Put('battery/:userId')
  async updateBattery(
    @Param('userId') userId: number,
    @Body() { lastBattery }: UpdateRobotDataDto
  ) {
    return this.robotDataService.updateBattery(Number(userId), lastBattery);
  }

  @Put('usage/:userId')
  async updateUsage(
    @Param('userId') userId: number,
    @Body() { timeUsed }: UpdateRobotDataDto
  ) {
    return this.robotDataService.updateUsage(Number(userId), timeUsed);
  }

  @Get(':userId')
  async getRobotData(@Param('userId') userId: number) {
    return this.robotDataService.getRobotData(Number(userId));
  }
}
