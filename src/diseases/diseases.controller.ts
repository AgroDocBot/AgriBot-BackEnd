import { Controller, Post, Body, Put, Delete, Get, Param } from '@nestjs/common';
import { DiseasesService } from './diseases.service';

@Controller('diseases')
export class DiseasesController {
    constructor(private diseaseService: DiseasesService) {}

    @Get('all')
    async getAll() {
        return await this.diseaseService.readAll();
    }

    @Get(':diseaseName')
    async getDisease(@Param('diseaseName') diseaseName : string) {
        return this.diseaseService.getDisease(diseaseName);
    }

}
