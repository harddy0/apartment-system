import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MaintenanceRequestsService } from './maintenance-requests.service';
import { MaintenanceRequest } from './entities/maintenance-request.entity';

describe('MaintenanceRequestsService', () => {
  let service: MaintenanceRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MaintenanceRequestsService,
        {
          provide: getRepositoryToken(MaintenanceRequest),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MaintenanceRequestsService>(MaintenanceRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
