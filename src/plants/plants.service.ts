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

  async getHealthyPlantsByUser(userId : number) {
    return await this.prisma.healthyPlant.findMany({
        where: {
          measurement: {
            field: {
              ownerId: userId
            }
          }
        }
    });
  }

  async getDiseasedPlantsByUser(userId : number) {
    return await this.prisma.diseasedPlant.findMany({
        where: {
          measurement: {
            field: {
              ownerId: userId
            }
          }
        }
    });
  }

  async editHealthyPlant(id: number, imageUrl: string) {
    return await this.prisma.healthyPlant.update({
      where: { id },
      data: {
        imageUrl: imageUrl
      }
    })
  }

  async editDiseasedPlant(id: number, imageUrl: string) {
    return await this.prisma.diseasedPlant.update({
      where: { id },
      data: {
        imageUrl: imageUrl
      }
    })
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
