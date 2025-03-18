import { Test, TestingModule } from '@nestjs/testing';
import { RobotDataController } from './robot-data.controller';

describe('RobotDataController', () => {
  let controller: RobotDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RobotDataController],
    }).compile();

    controller = module.get<RobotDataController>(RobotDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
