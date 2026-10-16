import { Component, HostListener, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { CartService } from './cart/services/cart.service';
import { Category } from './category/models/category.model';
import { CatalogMenuComponent } from './category/components/catalog-menu/catalog-menu.component';
import { CategoryService } from './category/services/category.service';
import { Product } from './product/models/product.model';
import { ProductService } from './product/services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CatalogMenuComponent,
    DecimalPipe,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  searchTerm = '';
  searchMenuOpen = false;
  searchDataLoading = false;
  categories: Category[] = [];
  products: Product[] = [];
  cartItemCount = 0;
  cartTotal = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {
    this.cartService.cart$.subscribe(() => {
      this.cartItemCount = this.cartService.getTotalItems();
      this.cartTotal = this.cartService.getTotalPrice();
    });
  }

  ngOnInit(): void {
    this.loadSearchData();
  }

  get isAdmin(): boolean {
    return this.authService.getUser()?.roles?.some(role =>
      role.toUpperCase() === 'ADMIN' || role.toUpperCase() === 'ROLE_ADMIN'
    ) ?? false;
  }

  get filteredCategories(): Category[] {
    const keyword = this.normalizedSearchTerm;

    return keyword
      ? this.categories.filter(category =>
          category.name.toLowerCase().includes(keyword)
        )
      : this.categories;
  }

  get filteredSearchProducts(): Product[] {
    const keyword = this.normalizedSearchTerm;

    if (!keyword) {
      return this.products;
    }

    return this.products.filter(product =>
      product.name.toLowerCase().includes(keyword) ||
      product.description?.toLowerCase().includes(keyword) ||
      product.category?.name.toLowerCase().includes(keyword)
    );
  }

  get hasSearchResults(): boolean {
    return this.filteredCategories.length > 0 || this.filteredSearchProducts.length > 0;
  }

  search(): void {
    const keyword = this.searchTerm.trim();
    this.closeSearchMenu();
    this.router.navigate(['/products'], {
      queryParams: keyword ? { search: keyword } : {}
    });
  }

  openSearchMenu(): void {
    this.searchMenuOpen = true;
  }

  closeSearchMenu(): void {
    this.searchMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeSearchMenuOnOutsideClick(event: MouseEvent): void {
    const target = event.target as Element;

    if (!target.closest('.header-search-wrap')) {
      this.closeSearchMenu();
    }
  }

  private get normalizedSearchTerm(): string {
    return this.searchTerm.trim().toLowerCase();
  }

  private loadSearchData(): void {
    this.searchDataLoading = true;
    let completedRequests = 0;
    const markRequestComplete = (): void => {
      completedRequests += 1;
      this.searchDataLoading = completedRequests < 2;
    };

    this.categoryService.getAll().subscribe({
      next: categories => {
        this.categories = categories;
      },
      error: markRequestComplete,
      complete: markRequestComplete
    });

    this.productService.getAll().subscribe({
      next: products => {
        this.products = products;
      },
      error: markRequestComplete,
      complete: markRequestComplete
    });
  }

}
