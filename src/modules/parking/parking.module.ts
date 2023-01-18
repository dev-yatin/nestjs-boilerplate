import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingRepository } from './parking.repository';
import { ParkingController } from './parking.controller';

@Module({
  controllers: [ParkingController],
  providers: [ParkingRepository, ParkingService],
})
export class ParkingModule {}
