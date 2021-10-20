interface ISort {
    field: string;
    order: 'asc' | 'desc';
}

interface IPagination {
    page: number;
    perPage: number;
}

interface IPaginationResult extends IPagination {
    total: number;
}

export interface IFilterEntities {
    query?: string;
    sort?: ISort;
    pagination: IPagination;
}

export interface IFilterResult<T> {
    data: T[];
    pagination: IPaginationResult;
}
