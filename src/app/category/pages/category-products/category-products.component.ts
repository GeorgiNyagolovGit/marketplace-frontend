import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { Product } from '../../../product/models/product.model';
import { ProductListComponent } from '../../../product/components/product-list/product-list.component';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent implements OnInit {
  category: Category | null = null;
  products: Product[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id || Number.isNaN(id)) {
      this.errorMessage = 'Invalid category ID.';
      return;
    }

    this.loadCategory(id);
    this.loadProducts(id);
  }

  loadCategory(id: number): void {
    this.categoryService.getById(id).subscribe({
      next: (category) => {
        this.category = category;
      },
      error: () => {
        this.errorMessage = 'Failed to load category.';
      }
    });
  }

  loadProducts(id: number): void {
    this.loading = true;

    this.categoryService.getProducts(id).subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load products.';
        this.loading = false;
      }
    });
  }
}