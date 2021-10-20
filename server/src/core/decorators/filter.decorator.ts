import { applyDecorators, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';

import { IFilterEntities } from '../interfaces/filter.interface';

export const FilterEntities = createParamDecorator(
    (data: unknown, host: ExecutionContext): IFilterEntities => {
        const ctx = host.switchToHttp();

        const request = ctx.getRequest<Request>();

        const {
            q,
            sortField,
            sortOrder,
            page,
            perPage,
        } = request.query;

        const sort = sortField ? { field: sortField, order: sortOrder || 'asc' } : null;
        const pagination = {
            page: Number(page || 1),
            perPage: Number(perPage || 10),
        };

        return {
            query: q,
            sort,
            pagination,
        } as IFilterEntities;
    },
);

export const ApiFilterQueries = () => applyDecorators(
    ApiQuery({ name: 'q', required: false }),
    ApiQuery({ name: 'sortField', required: false }),
    ApiQuery({ name: 'sortOrder', required: false }),
    ApiQuery({ name: 'page', required: false }),
    ApiQuery({ name: 'perPage', required: false }),
);
