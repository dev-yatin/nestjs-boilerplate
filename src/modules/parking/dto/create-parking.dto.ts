import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateParkingDto {
  @ApiProperty({ type: 'string', required: true, name: 'licensePlateNumber' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[^\s].*$/)
  licensePlateNumber: string;
}
