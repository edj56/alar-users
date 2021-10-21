import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GetAllFollowings, UsersStateModel } from '../users.actions';
import { UsersState } from '../users.state';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  @Select(UsersState) users$!: Observable<UsersStateModel>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetAllFollowings());
  }

}
