import { Controller, Post, UseGuards, HttpCode, Body } from '@nestjs/common';
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
import { LoginDto } from './dto/login.dto';
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
  async login(
    @GetCurrentUser() currentUser: IUser,
    @Body() loginDto: LoginDto,
  ) {
    const token = await this.authService.login(currentUser);
    return token;
  }

  @Post('logout')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiCookieAuth()
  @ApiOkResponse({ description: 'Logout user and expires cookie' })
  @Auth()
  async logout() {
    return null;
  }
}
