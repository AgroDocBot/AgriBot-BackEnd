import { Module } from '@nestjs/common';
import { RobotDataService } from './robot-data.service';
import { RobotDataController } from './robot-data.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RobotDataService],
  controllers: [RobotDataController]
})
export class RobotDataModule {}
