import { Test, TestingModule } from '@nestjs/testing';
import { RobotDataService } from './robot-data.service';

describe('RobotDataService', () => {
  let service: RobotDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RobotDataService],
    }).compile();

    service = module.get<RobotDataService>(RobotDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
