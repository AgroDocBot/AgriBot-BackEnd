import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FieldsModule } from './fields/fields.module';
import { MeasurementsModule } from './measurements/measurements.module';
import { DiseasesModule } from './diseases/diseases.module';
import { PlantsController } from './plants/plants.controller';
import { PlantsService } from './plants/plants.service';
import { PlantsModule } from './plants/plants.module';

@Module({
  imports: [PrismaModule, AuthModule, FieldsModule, MeasurementsModule, DiseasesModule, PlantsModule],
  controllers: [AppController, PlantsController],
  providers: [AppService, PlantsService],
})
export class AppModule {}
