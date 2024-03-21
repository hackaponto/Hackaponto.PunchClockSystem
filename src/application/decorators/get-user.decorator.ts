import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    const user = request?.user;
    return {
      userId: user?.sub,
    };
  },
);
