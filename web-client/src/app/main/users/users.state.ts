import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import {Follow, GetAll, GetAllFollowings, UsersStateModel} from './users.actions';
import { UsersService } from './users.service';

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    followings: [],
    data: [],
    pagination: {
      page: 1,
      perPage: 10,
      total: 0,
    },
    isLoading: false,
  }
})
@Injectable({
  providedIn: 'root'
})
export class UsersState {
  constructor(private usersService: UsersService) {}

  @Action(GetAll)
  getAll({ patchState }: StateContext<UsersStateModel>, data: GetAll) {
    patchState({ isLoading: true });

    return this.usersService.getAll(data.payload).pipe(tap(
      ({ data, pagination }) => patchState({ data, pagination }),
      ({ error }) => console.log(error),
      () => patchState({ isLoading: false })
    ));
  }

  @Action(GetAllFollowings)
  getAllFollowings({ patchState }: StateContext<UsersStateModel>, data: GetAllFollowings) {
    patchState({ isLoading: true });

    return this.usersService.getAllFollowings().pipe(tap(
      (followings) => patchState({ followings }),
      ({ error }) => console.log(error),
      () => patchState({ isLoading: false })
    ));
  }

  @Action(Follow)
  follow({ patchState }: StateContext<UsersStateModel>, data: Follow) {
    patchState({ isLoading: true });

    return this.usersService.follow(data.payload).pipe(tap(
      () => {},
      ({ error }) => console.log(error),
      () => patchState({ isLoading: false })
    ));
  }
}
