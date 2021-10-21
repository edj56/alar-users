import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import {Follow, GetAll, UsersStateModel} from '../users.actions';
import { UsersState } from '../users.state';
import {IFilterOptions, IPaginationResult} from "../../../shared/models/filter.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Select(UsersState) users$!: Observable<UsersStateModel>;

  filters: IFilterOptions = {
    page: 1,
    perPage: 25,
    q: '',
  };

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetAll(this.filters));
  }

  onPaginate({ page, perPage }: Partial<IPaginationResult>) {
    this.filters.page = page!;
    this.filters.perPage = perPage!;

    this.store.dispatch(new GetAll(this.filters));
  }

  onSearch() {
    this.filters.page = 1;

    this.store.dispatch(new GetAll(this.filters));
  }

  follow(followingId: number) {
    this.store.dispatch(new Follow(followingId));
  }
}
