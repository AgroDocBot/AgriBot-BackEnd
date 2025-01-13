import { Module } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DiseasesController } from './diseases.controller';
import { DiseasesService } from './diseases.service';

@Module({
  imports: [PrismaModule],
  controllers: [DiseasesController],
  providers: [DiseasesService]
})
export class DiseasesModule {}
