import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: 'string', required: true, name: 'username' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[^\s].*$/)
  username: string;

  @ApiProperty({ type: 'string', required: true, name: 'password' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[^\s].*$/)
  password: string;
}
