import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import configuration from '../../config/configuration';

@Module({
  imports: [
    PassportModule.register({}),
    JwtModule.register({
      secret: configuration().jwt.secret,
      signOptions: {
        expiresIn: `${configuration().jwt.expiresInMin}m`,
      },
    }),
  ],
  exports: [AuthService, JwtModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
