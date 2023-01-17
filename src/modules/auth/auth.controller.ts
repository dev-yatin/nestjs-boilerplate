import { Controller, Post, UseGuards, HttpCode } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IUser } from './mock.users';
import { LocalAuthGuard } from './local-auth.guard';
import { GetCurrentUser } from '../../util/decorators/get-current-user.decorator';
import { SetRoutePublic } from '../../util/decorators/set-route-public.decorator';
import { Auth } from '../../util/interceptors/auth.interceptor';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('Auth APIs')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Provide username and password to login.',
  })
  @ApiOkResponse({ description: 'Access token' })
  @ApiUnauthorizedResponse({
    description: 'If username password is not passed or is invalid.',
  })
  @SetRoutePublic()
  @UseGuards(LocalAuthGuard)
  @Auth()
  async login(@GetCurrentUser() currentUser: IUser) {
    const token = await this.authService.login(currentUser);
    return token;
  }

  @HttpCode(200)
  @ApiOkResponse({ description: 'Logout user and expires cookie' })
  @Post('logout')
  @Auth()
  async logout() {
    return null;
  }
}
