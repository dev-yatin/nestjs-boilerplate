import { Controller, Post, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUser } from './mock.users';
import { LocalAuthGuard } from './local-auth.guard';
import { GetCurrentUser } from '../../util/decorators/get-current-user.decorator';
import { SetRoutePublic } from '../../util/decorators/set-route-public.decorator';
import { Auth } from '../../util/interceptors/auth.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @SetRoutePublic()
  @UseGuards(LocalAuthGuard)
  @Auth()
  async login(@GetCurrentUser() currentUser: IUser) {
    const token = await this.authService.login(currentUser);
    return token;
  }

  @HttpCode(200)
  @Post('logout')
  @Auth()
  async logout() {
    return null;
  }
}
