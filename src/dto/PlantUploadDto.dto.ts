export class PlantUploadDto {
    measurementId: number;
    plants: {
      latitude: number;
      longitude: number;
      crop: string;
      result: string;
    }[];
  }
  