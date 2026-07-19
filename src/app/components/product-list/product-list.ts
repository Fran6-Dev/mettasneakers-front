import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product, ProductService } from '../../services/product';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {

  products: Product[] = [];
  loading = false;
  error = '';

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = [...data];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Erreur lors du chargement des produits';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
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