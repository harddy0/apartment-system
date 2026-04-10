import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LeasesService } from './leases.service';
import { Lease } from './entities/lease.entity';

describe('LeasesService', () => {
  let service: LeasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeasesService,
        {
          provide: getRepositoryToken(Lease),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<LeasesService>(LeasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
