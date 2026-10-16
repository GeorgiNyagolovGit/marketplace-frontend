import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface ProductFilters {
  keyword: string;
  categoryId: number | null;
}

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-filter.component.html'
})
export class ProductFilterComponent {
  @Output() filtersChange = new EventEmitter<ProductFilters>();

  keyword = '';
  categoryId: number | null = null;

  applyFilters(): void {
    this.filtersChange.emit({
      keyword: this.keyword.trim().toLowerCase(),
      categoryId: this.categoryId
    });
  }

  resetFilters(): void {
    this.keyword = '';
    this.categoryId = null;
    this.applyFilters();
  }
}