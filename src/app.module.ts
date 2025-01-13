import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FieldsModule } from './fields/fields.module';
import { MeasurementsModule } from './measurements/measurements.module';
import { DiseasesModule } from './diseases/diseases.module';

@Module({
  imports: [PrismaModule, AuthModule, FieldsModule, MeasurementsModule, DiseasesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
