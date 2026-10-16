import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductListComponent } from '../../components/product-list/product-list.component';

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.css'
})
export class ProductListPageComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = false;
  errorMessage = '';
  private searchKeyword = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.searchKeyword = (params.get('search') ?? '').trim().toLowerCase();
      this.filterByKeyword();
    });
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        this.filterByKeyword();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load products. Make sure the Java backend is running on port 8080.';
        this.loading = false;
      }
    });
  }

  private filterByKeyword(): void {
    this.filteredProducts = this.searchKeyword
      ? this.products.filter(product =>
          product.name.toLowerCase().includes(this.searchKeyword) ||
          product.description?.toLowerCase().includes(this.searchKeyword) ||
          product.category?.name.toLowerCase().includes(this.searchKeyword)
        )
      : this.products;
  }
}
