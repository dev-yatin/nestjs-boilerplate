import { Injectable } from '@nestjs/common';
import { ResponseParkingDto } from './dto/response-parking.dto';
import { ParkingRepository } from './parking.repository';
import { BaseService } from '../../base/base.service';

@Injectable()
export class ParkingService extends BaseService<ResponseParkingDto> {
  constructor(private readonly parkingRepo: ParkingRepository) {
    super(parkingRepo);
  }

  /**
   * To find next available parking slot
   * @param totalSlots Total number of slots allowed
   * @returns Next available slot
   */
  findNextAvailableSlot(totalSlots: number) {
    return this.parkingRepo.findNextAvailableSlot(totalSlots);
  }
}
