import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlantsService {
  constructor(private readonly prisma: PrismaService) {}

  async addHealthyPlant(data: {
    latitude: number;
    longitude: number;
    crop: string;
    measurementId: number;
  }) {
    return await this.prisma.healthyPlant.create({
      data,
    });
  }

  async addDiseasedPlant(data: {
    latitude: number;
    longitude: number;
    crop: string;
    disease: string;
    measurementId: number;
  }) {
    return await this.prisma.diseasedPlant.create({
      data,
    });
  }

  async getHealthyPlants(measurementId : number) {
    return await this.prisma.healthyPlant.findMany({
        where: {
            measurementId
        }
    });
  }

  async getDiseasedPlants(measurementId : number) {
    return await this.prisma.diseasedPlant.findMany({
        where: {
            measurementId
        }
    });
  }

  async deleteHealthyPlant(id: number) {
    return await this.prisma.healthyPlant.delete({
      where: { id },
    });
  }

  async deleteDiseasedPlant(id: number) {
    return await this.prisma.diseasedPlant.delete({
      where: { id },
    });
  }
}
