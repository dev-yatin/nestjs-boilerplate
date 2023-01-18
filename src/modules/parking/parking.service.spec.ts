import { Test, TestingModule } from '@nestjs/testing';
import { ParkingService } from './parking.service';
import { ParkingRepository } from './parking.repository';
import configuration from '../../config/configuration';

describe('ParkingService', () => {
  let service: ParkingService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingService, ParkingRepository],
    }).compile();

    service = module.get<ParkingService>(ParkingService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Get Next Available Slot', async () => {
    const totalSlots = configuration().parking.totalSlots;
    // Very first slot
    expect(service.findNextAvailableSlot(totalSlots)).toEqual(0);
  });

  it('Get Next Available Slot When No Slot Available', async () => {
    // when no slot available
    expect(service.findNextAvailableSlot(0)).toEqual(-1);
  });
});
