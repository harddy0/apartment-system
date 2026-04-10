import { Test, TestingModule } from '@nestjs/testing';
import { BillingsController } from './billings.controller';
import { BillingsService } from './billings.service';

describe('BillingsController', () => {
  let controller: BillingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingsController],
      providers: [
        {
          provide: BillingsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BillingsController>(BillingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
