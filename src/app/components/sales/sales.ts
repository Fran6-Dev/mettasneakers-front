import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from '../../services/product';
import { Sale, SaleService, CreateSaleRequest, CreateSaleItemRequest } from '../../services/sale';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sales',
  imports: [FormsModule, DatePipe],
  templateUrl: './sales.html',
  styleUrl: './sales.css',
})
export class Sales implements OnInit {

  sales: Sale[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart: CreateSaleItemRequest[] = [];
  cartDetails: { product: Product; quantity: number; promotion: number }[] = [];

  searchQuery = '';
  error = '';
  success = '';

  constructor(
    private saleService: SaleService,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSales();
    this.loadProducts();
  }

  loadSales(): void {
    this.saleService.getAll().subscribe({
      next: (data) => {
        this.sales = [...data];
        this.cdr.detectChanges();
      },
      error: () => this.error = 'Erreur lors du chargement des ventes'
    });
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = [...data];
        this.filteredProducts = [...data];
        this.cdr.detectChanges();
      },
      error: () => this.error = 'Erreur lors du chargement des produits'
    });
  }

  onSearch(): void {
    const q = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      (p.size && p.size.toString().includes(q))
    );
  }

  addToCart(product: Product): void {
    const existing = this.cartDetails.find(c => c.product.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cartDetails.push({ product, quantity: 1, promotion: 0 });
    }
  }

  removeFromCart(index: number): void {
    this.cartDetails.splice(index, 1);
  }

  getCartTotal(): number {
    return this.cartDetails.reduce((total, item) => {
      return total + (item.product.price * item.quantity) * (1 - item.promotion / 100);
    }, 0);
  }

  validateSale(): void {
    if (this.cartDetails.length === 0) {
      this.error = 'Le panier est vide';
      return;
    }

    this.error = '';
    this.success = '';

    const request: CreateSaleRequest = {
      items: this.cartDetails.map(item => ({
        productId: item.product.id!,
        quantity: item.quantity,
        promotion: item.promotion
      }))
    };

    this.saleService.create(request).subscribe({
      next: () => {
        this.success = `Vente #${Date.now()} enregistrée avec succès !`;
        this.cartDetails = [];
        this.searchQuery = '';
        this.filteredProducts = [...this.products];
        this.loadSales();
        this.loadProducts();
      },
      error: (err) => this.error = 'Erreur : stock insuffisant ou produit introuvable'
    });
  }
}