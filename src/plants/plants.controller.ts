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

  @Put('diseased/edit')
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

  @Get('healthy/user/:userId')
  async getHealthyPlantsByUser(@Param('userId') userId: number) {
    return await this.plantService.getHealthyPlantsByUser(Number(userId));
  }

  @Get('diseased/user/:userId')
  async getDiseasedPlantsByUser(@Param('userId') userId: number) {
    return await this.plantService.getDiseasedPlantsByUser(Number(userId));
  }

  @Get('healthy/field/:fieldId')
  async getHealthyPlantsByField(@Param('fieldId') fieldId: number) {
    return await this.plantService.getHealthyPlantsByField(Number(fieldId));
  }

  @Get('diseased/field/:fieldId')
  async getDiseasedPlantsByField(@Param('fieldId') fieldId: number) {
    return await this.plantService.getDiseasedPlantsByField(Number(fieldId));
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
