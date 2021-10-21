import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IFilterOptions, IFilterResult } from '../../shared/models/filter.model';
import { IUser } from './users.interfaces';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getAll(options: IFilterOptions): Observable<IFilterResult<IUser>> {
    return this.http.get<IFilterResult<IUser>>('/api/users', { params: { ...options } });
  }

  getAllFollowings(): Observable<IUser[]> {
    return this.http.get<IUser[]>('/api/profile/followings');
  }

  follow(followingId: number): Observable<boolean> {
    return this.http.post<boolean>('/api/profile/followings', { followingId });
  }
}
