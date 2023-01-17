import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base/base.repository';
import { ResponseParkingDto } from './dto/response-parking.dto';

@Injectable()
export class ParkingRepository extends BaseRepository<ResponseParkingDto> {
  constructor(entity: ResponseParkingDto[]) {
    super(entity);
  }
}
