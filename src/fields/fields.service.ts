import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class FieldsService {
  constructor(private prisma: PrismaService) {}

  async create(fieldname: string, crop: string, latitude: Decimal, longitude: Decimal, userId: number) {
    return await this.prisma.cropField.create({
      data : {
        fieldname : fieldname,
        crop : crop,
        latitude : latitude,
        longitude : longitude,
        ownerId : Number(userId)
      }
    })
  }

  async edit(id: number, fieldname: string, crop: string, latitude: Decimal, longitude: Decimal, userId : number) {
    return await this.prisma.cropField.update({
      where: {
        id
      },
      data : {
        fieldname,
        crop,
        latitude,
        longitude
      }
    })
  }

  async delete(id: number) {
    return await this.prisma.cropField.delete({
      where : {
        id
      }
    })
  }

  async getfield(userId : number) {
    return await this.prisma.cropField.findMany({
      where : {
        ownerId : Number(userId)
      }
    })
  }
}
