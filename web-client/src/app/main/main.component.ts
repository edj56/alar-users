import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AuthStateModel, Logout } from '../auth/auth.actions';
import { AuthState } from '../auth/auth.state';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Select(AuthState) auth$!: Observable<AuthStateModel>;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
