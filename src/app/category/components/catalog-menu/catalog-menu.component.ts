import { DecimalPipe } from '@angular/common';
import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../product/models/product.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-catalog-menu',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './catalog-menu.component.html',
  styleUrl: './catalog-menu.component.css'
})
export class CatalogMenuComponent {
  @Input() categories: Category[] = [];
  @Input() products: Product[] = [];

  isOpen = false;
  activeCategoryId: number | null = null;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  toggle(): void {
    this.isOpen = !this.isOpen;

    if (this.isOpen && this.activeCategoryId === null && this.categories.length > 0) {
      this.activeCategoryId = this.categories[0].id;
    }
  }

  get activeCategory(): Category | null {
    return this.categories.find(category => category.id === this.activeCategoryId)
      ?? this.categories[0]
      ?? null;
  }

  get activeCategoryProducts(): Product[] {
    const categoryId = this.activeCategory?.id;
    return categoryId === undefined
      ? []
      : this.products.filter(product => product.category?.id === categoryId);
  }

  selectCategory(categoryId: number): void {
    this.activeCategoryId = categoryId;
  }

  close(): void {
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.close();
  }
}
