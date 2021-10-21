import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { GetAll, UsersStateModel } from './users.actions';
import { UsersService } from './users.service';

@State<UsersStateModel>({
  name: 'users',
  defaults: {
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
}
