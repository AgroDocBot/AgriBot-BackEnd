import { Controller, Post, Body, Put, Delete, Get, Param } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';

@Controller('measurements')
export class MeasurementsController {
    constructor(private measurementsService: MeasurementsService) {}

    @Post('create')
    async create(@Body() body: { fieldId : number }) {
        return this.measurementsService.create(body.fieldId)
    }

    @Get('read/:username')
    async readAllByUser(@Param('username') username: string) {
        return this.measurementsService.readAllByUser(username);
    }

    @Get('read/:fieldId')
    async readAllByFieldId(@Param('fieldId') fieldId : number) {
        return this.measurementsService.readAllByField(fieldId);
    }

    @Delete('delete')
    async delete(@Body() body: {measurementId : number}) {
        return this.measurementsService.delete(body.measurementId);
    }

    @Put('edit')
    async edit(@Body() body: {measurementId: number, explored: number, duration: number}) {
        return this.measurementsService.edit(body.measurementId,body.explored, body.duration)
    }
}
