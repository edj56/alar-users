import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GetAll, UsersStateModel } from '../users.actions';
import { UsersState } from '../users.state';
import {IPaginationResult} from "../../../shared/models/filter.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Select(UsersState) users$!: Observable<UsersStateModel>;
  query: string = '';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetAll({ page: 1, perPage: 10 }));
  }

  onPaginate({ page, perPage }: Partial<IPaginationResult>) {
    this.store.dispatch(new GetAll({ page: page!, perPage: perPage! }));
  }

  onSearch(q: string) {
    this.store.dispatch(new GetAll({ q, page: 1, perPage: 10 }));
  }
}
