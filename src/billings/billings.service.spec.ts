import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BillingsService } from './billings.service';
import { Billing } from './entities/billing.entity';

describe('BillingsService', () => {
  let service: BillingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillingsService,
        {
          provide: getRepositoryToken(Billing),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<BillingsService>(BillingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
