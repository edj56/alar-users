import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
    (data: unknown, host: ExecutionContext) => {
        const ctx = host.switchToHttp();

        const request = ctx.getRequest<Request>();

        return (request as any).user;
    },
);
