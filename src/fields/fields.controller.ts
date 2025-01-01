import { Controller, Post, Body, Put, Delete, Get } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { Decimal } from '@prisma/client/runtime/library';

@Controller('fields')
export class FieldsController {
  constructor(private fieldsService: FieldsService) {}

  @Post('create')
  async create(@Body() body: { fieldname: string; crop: string; latitude: Decimal; longitude: Decimal; userId: number }) {
    return this.fieldsService.create(body.fieldname, body.crop, body.latitude, body.longitude, body.userId)
  }

  @Get('getfields')
  async getfields(@Body() body: {userId : number}) {
    return this.fieldsService.getfield(body.userId)
  }

  @Put('edit')
  async edit(@Body() body: { fieldname: string; crop: string; latitude: Decimal; longitude: Decimal; userId: number }) {
    return this.fieldsService.edit(body.fieldname, body.crop, body.latitude, body.longitude, body.userId)
  }

  @Delete('delete')
  async delete(@Body() body: { fieldname: string; userId: number }) {
    return this.fieldsService.delete(body.fieldname, body.userId)
  }
}
