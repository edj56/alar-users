export interface IFilterOptions {
  q?: string;
  sortField?: string;
  sortOrder?: string;
  page: number;
  perPage: number;
}

export interface IPaginationResult {
  page: number;
  perPage: number;
  total: number;
}

export interface IFilterResult<TEntity> {
  data: TEntity[];
  pagination: IPaginationResult;
}
