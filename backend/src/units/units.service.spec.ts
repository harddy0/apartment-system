import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UnitsService } from './units.service';
import { Unit } from './entities/unit.entity';

describe('UnitsService', () => {
  let service: UnitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UnitsService,
        {
          provide: getRepositoryToken(Unit),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UnitsService>(UnitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
