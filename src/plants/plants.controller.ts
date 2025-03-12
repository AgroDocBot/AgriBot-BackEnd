import { Controller, Get, Post, Delete, Param, Body, Put } from '@nestjs/common';
import { PlantsService } from './plants.service';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantService: PlantsService) {}

  @Post('healthy/add')
  async addHealthyPlant(@Body() body: { latitude: number; longitude: number; crop: string; measurementId: number }) {
    return await this.plantService.addHealthyPlant(body);
  }

  @Post('diseased/add')
  async addDiseasedPlant(@Body() body: { latitude: number; longitude: number; crop: string; disease: string; measurementId: number }) {
    return await this.plantService.addDiseasedPlant(body);
  }

  @Put('healthy/edit')
  async editHealthyPlant(@Body() body: { id: number, imageUrl: string }) {
    return await this.plantService.editHealthyPlant(body.id, body.imageUrl);
  }

  @Put('healthy/edit')
  async editDiseasedPlant(@Body() body: { id: number, imageUrl: string }) {
    return await this.plantService.editDiseasedPlant(body.id, body.imageUrl);
  }

  @Get('healthy/measurement/:measurementId')
  async getHealthyPlantsByMeasurement(@Param('measurementId') measurementId: number) {
    return await this.plantService.getHealthyPlants(Number(measurementId));
  }

  @Get('diseased/measurement/:measurementId')
  async getDiseasedPlantsByMeasurement(@Param('measurementId') measurementId: number) {
    return await this.plantService.getDiseasedPlants(Number(measurementId));
  }

  @Delete('healthy/:id')
  async deleteHealthyPlant(@Param('id') id: number) {
    return await this.plantService.deleteHealthyPlant(Number(id));
  }

  @Delete('diseased/:id')
  async deleteDiseasedPlant(@Param('id') id: number) {
    return await this.plantService.deleteDiseasedPlant(Number(id));
  }
}
