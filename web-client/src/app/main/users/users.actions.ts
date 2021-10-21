import { IUser } from './users.interfaces';
import { IFilterOptions, IPaginationResult } from '../../shared/models/filter.model';

export class UsersStateModel {
  data?: IUser[];
  pagination?: IPaginationResult;
  isLoading?: boolean;
}

export class GetAll {
  static readonly type = '[Users] Get All';
  constructor(public payload: IFilterOptions) {}
}
