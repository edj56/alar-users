import { FindManyOptions, Like, Repository } from 'typeorm';

import { IFilterEntities, IFilterResult } from '../interfaces/filter.interface';

export async function filterEntitiesHelper<TEntity>(
    repository: Repository<TEntity>,
    filter: IFilterEntities,
    searchedFields: Array<keyof TEntity> = [],
): Promise<IFilterResult<TEntity>> {

    const options: FindManyOptions<TEntity> = {};

    if (filter.query && filter.query.trim()) {
        const q = filter.query.trim();
        options.where = searchedFields.map((field) => ({ [field]: Like(`%${q}%`) }));
    }

    if (filter.sort) {
        options.order = {};
        options.order[filter.sort.field] = filter.sort.field.toUpperCase();
    }

    const total = await repository.count(options);

    options.take = filter.pagination.perPage;
    options.skip = (filter.pagination.page - 1) * filter.pagination.perPage;

    return {
        data: await repository.find(options),
        pagination: {
            total,
            page: filter.pagination.page,
            perPage: filter.pagination.perPage,
        }
    };
}
