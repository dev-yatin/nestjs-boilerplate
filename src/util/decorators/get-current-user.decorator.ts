import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!request.user) return null;
    return request.user;
  },
);
