import { Component, OnDestroy } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";

import { ILoginRequest } from './login.interfaces';
import { Login } from '../auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  user: ILoginRequest = {
    email: '',
    password: '',
  };

  destroyed$ = new Subject<void>();

  constructor(
    private router: Router,
    private store: Store,
    private actions$: Actions,
  ) {
    this.actions$.pipe(ofActionSuccessful(Login), takeUntil(this.destroyed$))
      .subscribe(() => this.router.navigate(['/']));
  }

  onSubmit() {
    this.store.dispatch(new Login(this.user));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
