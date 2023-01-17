import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import configuration from '../../config/configuration';

type AuthToken = {
  access_token: string;
} | null;

export function Auth() {
  return UseInterceptors(new AuthInterceptor());
}

export class AuthInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return handler.handle().pipe(
      map(async (token: AuthToken) => {
        // Otherwise logout
        let authCookie = `Authentication=; HttpOnly; Path=/; Max-Age=0`;
        if (!!token && token.access_token) {
          // Login flow
          const expireTimeInMin = parseInt(
            `${configuration().jwt.expiresInMin}`,
            10,
          );
          const cookieAgeInSec = expireTimeInMin * 60;
          const currentDate = new Date();
          currentDate.setSeconds(currentDate.getSeconds() + cookieAgeInSec);
          // Max-Age not supported on Internet Explorer, thus adding expire attribute along with Max-Age
          const expireTime = currentDate.toUTCString();
          authCookie = `Authentication=${token.access_token};HttpOnly;Path=/;Expires=${expireTime};Max-Age=${cookieAgeInSec};`;
          const request = context.switchToHttp().getRequest();
          if (!request.headers.host.startsWith('localhost')) {
            // This is check on server host not on client host
            // If APIs running on https, then client running on https can only access cookie
            authCookie += 'Secure;';
          }
        }
        const response = context.switchToHttp().getResponse();
        response.setHeader('Set-Cookie', authCookie);
        if (!!token && token.access_token) {
          // Login flow
          response.status(HttpStatus.OK).json(token);
        } else {
          // Otherwise logout
          response.status(HttpStatus.OK);
        }
      }),
    );
  }
}
