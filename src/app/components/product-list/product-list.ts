import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product, ProductService } from '../../services/product';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [RouterModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {

  products: Product[] = [];
  loading = false;
  error = '';
  selectedCategory = '';
  categories = ['', 'SNEAKER', 'VETEMENT', 'ACCESSOIRE'];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }


  loadProducts(): void {
    this.productService.getAll(this.selectedCategory).subscribe({
      next: (data) => {
        this.products = [...data];
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Erreur lors du chargement des produits';
      }
    });
  }

  onCategoryChange(): void {
    this.loadProducts();
  }

  deleteProduct(id: number): void {
    if (confirm('Supprimer ce produit ?')) {
      this.productService.delete(id).subscribe({
        next: () => this.loadProducts(),
        error: () => this.error = 'Erreur lors de la suppression'
      });
    }
  }
}