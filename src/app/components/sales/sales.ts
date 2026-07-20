import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from '../../services/product';
import { Sale, SaleService, CreateSaleRequest } from '../../services/sale';
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
  error = '';
  success = '';

  newSale : CreateSaleRequest = {
    productId: 0,
    quantity: 1,
    promotion: 0,
  };

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
        this.cdr.detectChanges();
      },
      error: () => this.error = 'Erreur lors du chargement des produits'
    });
  }

  createSale(): void {
    this.error = '';
    this.success = '';
    this.saleService.create(this.newSale).subscribe({
      next: () => {
        this.success = 'Vente enregistrée avec succès !';
        this.newSale = { productId: 0, quantity: 1, promotion : 0 };
        this.loadSales();
        this.loadProducts();
      },
      error: (err) => this.error = 'Erreur : stock insuffisant ou produit introuvable'
    });
  }

}
