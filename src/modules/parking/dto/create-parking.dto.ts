import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  IsInt,
  Max,
  Min,
} from 'class-validator';
import configuration from '../../../config/configuration';

export class CreateParkingDto {
  @ApiProperty({ type: 'string', required: true, name: 'licensePlateNumber' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[^\s].*$/)
  licensePlateNumber: string;

  @ApiProperty({ type: 'number', required: true, name: 'slotNumber' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(configuration().parking.totalSlots)
  slotNumber: string;
}
