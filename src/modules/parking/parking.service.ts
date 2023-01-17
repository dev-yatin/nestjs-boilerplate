import { Injectable } from '@nestjs/common';
import { ResponseParkingDto } from './dto/response-parking.dto';
import { ParkingRepository } from './parking.repository';
import { BaseService } from '../../base/base.service';

@Injectable()
export class ParkingService extends BaseService<ResponseParkingDto> {
  constructor(parkingRepo: ParkingRepository) {
    super(parkingRepo);
  }
}
