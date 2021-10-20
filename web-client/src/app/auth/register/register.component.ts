import { Component, OnDestroy } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IRegisterRequest } from './register.interfaces';
import { Register } from '../auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  user: IRegisterRequest = {
    username: '',
    email: '',
    password: '',
    birthDate: '',
    gender: 'm',
    firstName: '',
    lastName: '',
  };

  destroyed$ = new Subject<void>();

  constructor(
    private router: Router,
    private store: Store,
    private actions$: Actions,
  ) {
    this.actions$.pipe(ofActionSuccessful(Register), takeUntil(this.destroyed$))
      .subscribe(() => this.router.navigate(['/auth/login']));
  }

  onSubmit() {
    this.store.dispatch(new Register(this.user));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
