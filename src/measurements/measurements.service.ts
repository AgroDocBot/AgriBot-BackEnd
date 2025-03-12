import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MeasurementsService {
    constructor(private prisma: PrismaService) {}

    async create(fieldId : number) {
        return await this.prisma.measurement.create({
          data : {
            fieldId : Number(fieldId),
            duration: 0,
            explored: 0,
          }
        })
    }
    
    async edit(measurementId: number, explored: number, duration: number) {
        try {
          console.log('Attempting to update measurement with ID:', measurementId);
      
          const updatedMeasurement = await this.prisma.measurement.update({
            where: { id: measurementId },
            data: { explored : Number(explored), duration : Number(duration) },
          });
      
          console.log('Update successful:', updatedMeasurement);
          return updatedMeasurement;
        } catch (error) {
          if (error.code === 'P2025') {
            // Handle "Record not found" error
            throw new Error(`Measurement with ID ${measurementId} not found.`);
          } else {
            // Handle other Prisma errors
            console.error('Error updating measurement:', error);
            throw error;
          }
        }
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
