import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ParkingService } from './parking.service';
import { CreateParkingDto } from './dto/create-parking.dto';
import configuration from '../../config/configuration';
import { TrimPipe } from '../../util/pipes/trim.pipe';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('Parking APIs')
@Controller()
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post('park')
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'Parking lot is full.' })
  async createParking(@Body(TrimPipe) createParkingDto: CreateParkingDto) {
    const nextAvailableSlot = this.parkingService.findNextAvailableSlot(
      configuration().parking.totalSlots,
    );
    if (nextAvailableSlot === -1) {
      throw new BadRequestException('Parking lot is full.');
    }
    const createdParking = await this.parkingService.create({
      ...createParkingDto,
      slotNumber: nextAvailableSlot,
    });
    return createdParking;
  }

  @Delete('unpark/:licensePlateNumber')
  @ApiParam({ name: 'licensePlateNumber', required: true })
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Car not found' })
  async removeParking(@Param('licensePlateNumber') licensePlateNumber: string) {
    const parking = await this.parkingService.findOne({ licensePlateNumber });
    if (!parking) {
      throw new NotFoundException('Car not found');
    }
    const idToRemove = parking._id;
    const removedParking = await this.parkingService.remove(idToRemove);
    if (!removedParking) {
      throw new NotFoundException('Car not found');
    }
    return removedParking;
  }

  @Get('slot/:slotNumber')
  @ApiParam({ name: 'slotNumber', required: true })
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'Provide valid slot number' })
  @ApiNotFoundResponse({ description: 'No car found on slot' })
  async findBySlot(@Param('slotNumber', ParseIntPipe) slotNumber: number) {
    if (isNaN(slotNumber)) {
      // NaN case
      throw new BadRequestException('Provide valid slot number');
    }
    const parking = await this.parkingService.findOne({ slotNumber });
    if (!parking) {
      throw new NotFoundException(`No car found on slot: ${slotNumber}`);
    }
    return parking;
  }
}
