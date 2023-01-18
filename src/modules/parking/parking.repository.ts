import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base/base.repository';
import { ResponseParkingDto } from './dto/response-parking.dto';

@Injectable()
export class ParkingRepository extends BaseRepository<ResponseParkingDto> {
  constructor() {
    super([]);
  }

  /**
   * To find next available slot
   * @param totalSlots Total number of slots allowed
   * @returns Next available slot
   */
  findNextAvailableSlot(totalSlots: number) {
    if (this.entity.length < totalSlots) {
      return this.entity.length;
    }
    return -1;
  }
}
