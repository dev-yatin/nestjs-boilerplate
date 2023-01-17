import { Request, Response, NextFunction } from 'express';

import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: any, res: Response, next: NextFunction) {
    let jwt;
    if (req?.cookies?.Authentication) jwt = req?.cookies?.Authentication;
    if (!jwt) jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (jwt && jwt.length > 0) {
      const user = this.jwtService.decode(jwt);
      // Append Jwt decoded user in request
      req.user = user;
    }
    next();
  }
}

export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  next();
}
