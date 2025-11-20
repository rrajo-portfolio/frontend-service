import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent {
  private readonly term$ = new Subject<string>();
  @Output() search = new EventEmitter<string>();

  constructor() {
    this.term$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => this.search.emit(term));
  }

  onSearch(term: string): void {
    this.term$.next(term);
  }
}
