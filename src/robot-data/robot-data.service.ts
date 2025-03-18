import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { CreateRobotDataDto, UpdateRobotDataDto } from './robot-data.dto';

@Injectable()
export class RobotDataService {
  constructor(private prisma: PrismaService) {}

  async createOrUpdate(userId: number) {
    const existingData = await this.prisma.robotData.findUnique({
      where: { userId },
    });

    if (!existingData) {
      return this.prisma.robotData.create({
        data: { userId },
      });
    }

    return existingData;
  }

  async updateBattery(userId: number, lastBattery: number) {
    const data = await this.prisma.robotData.findUnique({ where: { userId } });

    if (!data) throw new NotFoundException('RobotData not found');

    return this.prisma.robotData.update({
      where: { userId },
      data: { lastBattery, lastUsed: new Date() },
    });
  }

  async updateUsage(userId: number, timeIncrement: number) {
    const data = await this.prisma.robotData.findUnique({ where: { userId } });

    if (!data) throw new NotFoundException('RobotData not found');

    return this.prisma.robotData.update({
      where: { userId },
      data: { 
        timeUsed: data.timeUsed + timeIncrement, 
        lastUsed: new Date() 
      },
    });
  }

  async getRobotData(userId: number) {
    return this.prisma.robotData.findUnique({ where: { userId } });
  }
}
