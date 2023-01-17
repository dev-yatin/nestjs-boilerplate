import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import configuration from '../../config/configuration';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          if (request?.cookies?.Authentication)
            return request?.cookies?.Authentication;
          return ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configuration().jwt.secret,
    });
  }

  validate(extractedJwt: any) {
    return {
      email: extractedJwt.email,
      fullName: extractedJwt.fullName,
    };
  }
}
