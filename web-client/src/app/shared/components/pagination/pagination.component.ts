import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { IPaginationResult } from '../../models/filter.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() options!: IPaginationResult;

  @Output() paginate: EventEmitter<Partial<IPaginationResult>> = new EventEmitter<Partial<IPaginationResult>>();

  pages: Array<string | number> = [];

  get lastPage() {
    return Math.ceil(this.options.total / this.options.perPage);
  }

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options && changes.options.currentValue) {
      this.pages = this.paginationGenerator(
        this.options.page,
        this.lastPage,
      );
    }
  }

  selectPage(page: number | string) {
    this.paginate.emit({
      page: Number(page),
      perPage: this.options.perPage,
    });
  }

  paginationGenerator(current: number, last: number, width = 2) {
    const left = current - width;
    const right = current + width + 1;
    const range = [];
    const rangeWithDots: Array<number | string> = [];
    let l: number;

    for (let i = 1; i <= last; i += 1) {
      if (i === 1 || i === last || (i >= left && i <= right)) {
        range.push(i);
      } else if (i < left) {
        i = left - 1;
      } else if (i > right) {
        range.push(last);
        break;
      }
    }

    range.forEach(i => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  isClickable(page: number | string) {
    return page !== '...';
  }
}
