import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Action, State, StateContext } from '@ngxs/store';
import { from } from "rxjs";

import { AuthService } from './auth.service';
import { AuthStateModel, Init, Login, Logout, Register } from './auth.actions';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    profile: undefined,
    isLoading: false,
    isLoggedIn: false,
  }
})
@Injectable({
  providedIn: 'root'
})
export class AuthState {
  constructor(private authService: AuthService) {}

  @Action(Init)
  init({ patchState }: StateContext<AuthStateModel>) {
    patchState({ isLoading: true });
    return this.authService.getMe().pipe(tap(
      (profile) => patchState({ isLoggedIn: true, profile }),
      () => patchState({ isLoggedIn: false, profile: undefined }),
      () => patchState({ isLoading: false })
    ));
  }

  @Action(Login)
  login({ patchState }: StateContext<AuthStateModel>, data: Login) {
    patchState({ isLoading: true });

    return this.authService.login(data.payload).pipe(tap(
      () => patchState({ isLoggedIn: true }),
      ({ error }) => console.log(error),
      () => patchState({ isLoading: false })
    ));
  }

  @Action(Register)
  register({ patchState }: StateContext<AuthStateModel>, data: Register) {
    patchState({ isLoading: true });

    return this.authService.register(data.payload).pipe(tap(
      () => patchState({ isLoggedIn: true }),
      ({ error }) => console.log(error),
      () => patchState({ isLoading: false })
    ));
  }

  @Action(Logout)
  logout({ patchState }: StateContext<AuthStateModel>) {
    patchState({ isLoading: true });

    return from(this.authService.logout()).pipe(tap(
      () => patchState({ isLoggedIn: false, profile: undefined }),
      ({ error }) => console.log(error),
      () => patchState({ isLoading: false })
    ));
  }
}
