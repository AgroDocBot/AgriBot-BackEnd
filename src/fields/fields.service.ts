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
        ownerId : userId
      }
    })
  }

  async edit(fieldname: string, crop: string, latitude: Decimal, longitude: Decimal, userId : number) {
    return await this.prisma.cropField.update({
      where: {
        ownerId_fieldname : {
          ownerId : userId,
          fieldname : fieldname
        }
      },
      data : {
        fieldname,
        crop,
        latitude,
        longitude
      }
    })
  }

  async delete(fieldname : string, userId : number) {
    return await this.prisma.cropField.delete({
      where : {
        ownerId_fieldname : {
          ownerId : userId,
          fieldname
        }
      }
    })
  }

  async getfield(userId : number) {
    return await this.prisma.cropField.findMany({
      where : {
        ownerId : userId
      }
    })
  }
}
