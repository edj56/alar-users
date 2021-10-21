import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IPaginationResult } from '../../models/filter.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() options!: IPaginationResult;

  @Output() paginate: EventEmitter<Partial<IPaginationResult>> = new EventEmitter<Partial<IPaginationResult>>();

  get pages() {
    return new Array(Math.ceil(this.options.total / this.options.perPage))
      .fill(0)
      .map((_, i) => i + 1);
  }

  constructor() {}

  selectPage(page: number) {
    this.paginate.emit({
      page,
      perPage: this.options.perPage,
    });
  }
}
