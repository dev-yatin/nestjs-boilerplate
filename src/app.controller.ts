import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Health')
  @Get('/health')
  @HttpCode(HttpStatus.OK)
  getHealth() {
    return { status: 'ok' };
  }
}
