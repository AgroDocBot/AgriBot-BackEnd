import { Controller, Post, Body, Put, Delete, Get, Param } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { Decimal } from '@prisma/client/runtime/library';

@Controller('fields')
export class FieldsController {
  constructor(private fieldsService: FieldsService) {}

  @Post('create')
  async create(@Body() body: { fieldname: string; crop: string; latitude: Decimal; longitude: Decimal; userId: number }) {
    return this.fieldsService.create(body.fieldname, body.crop, body.latitude, body.longitude, body.userId)
  }

  @Get('getfields/:userId')
  async getfields(@Param('userId')  userId : number) {
    return this.fieldsService.getfield(userId)
  }

  @Put('edit')
  async edit(@Body() body: { id: number, fieldname: string; crop: string; latitude: Decimal; longitude: Decimal; userId: number }) {
    return await this.fieldsService.edit(body.id ,body.fieldname, body.crop, body.latitude, body.longitude, body.userId)
  }

  @Delete('delete')
  async delete(@Body() body: {id: number}) {
    return this.fieldsService.delete(body.id)
  }
}
