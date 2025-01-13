import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiseasesService {
    constructor(private prisma: PrismaService) {}

    async readAll() {
        return await this.prisma.disease.findMany({});
    }

    async getDisease(diseaseName : string) {
        return await this.prisma.disease.findMany({
            where: {
                diseaseName
            }
        })
    }

}
