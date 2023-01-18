import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { SetRoutePublic } from './util/decorators/set-route-public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  @SetRoutePublic()
  @ApiTags('Health')
  @HttpCode(HttpStatus.OK)
  getHealth() {
    return { status: 'ok' };
  }
}
