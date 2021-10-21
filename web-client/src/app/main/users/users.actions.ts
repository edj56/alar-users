import { IUser } from './users.interfaces';
import { IFilterOptions, IPaginationResult } from '../../shared/models/filter.model';

export class UsersStateModel {
  data?: IUser[];
  pagination?: IPaginationResult;
  followings?: IUser[];
  isLoading?: boolean;
}

export class GetAll {
  static readonly type = '[Users] Get All';
  constructor(public payload: IFilterOptions) {}
}


export class GetAllFollowings {
  static readonly type = '[Users] Get All Followings';
  constructor() {}
}

export class Follow {
  static readonly type = '[Users] Follow';
  constructor(public payload: number) {}
}
