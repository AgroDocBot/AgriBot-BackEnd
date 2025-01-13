import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MeasurementsService {
    constructor(private prisma: PrismaService) {}

    async create(fieldId : number) {
        return await this.prisma.measurement.create({
          data : {
            fieldId : fieldId,
            duration: 0,
            explored: 0,
          }
        })
    }
    
    async edit(duration: number, explored: number, measurementId: number) {
        return await this.prisma.measurement.update({
            where: {
                id : Number(measurementId)
            },
            data : {
                duration,
                explored
            }
        })
    }

    async readAllByUser(username: string) {
        const user = await this.prisma.user.findFirst({
            where : {
                username : username
            }
        })
        return await this.prisma.measurement.findMany({
            where : {
                field : {
                    ownerId : user.id
                }
            }
        })
    }

    async readAllByField(fieldId : number) {
        return await this.prisma.measurement.findMany({
            where : {
                fieldId : Number(fieldId)
            }
        })
    }

    async delete(measurementId) {
        return await this.prisma.measurement.delete({
            where : {
                id : Number(measurementId)
            }
        })
    }
}
