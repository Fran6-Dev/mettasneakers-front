import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Product, ProductService } from '../../services/product';

@Component({
  selector: 'app-product-form',
  imports: [FormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnInit {

  product: Product = {
    name: '',
    brand: '',
    price: 0,
    size: '',
    stock: 0,
    description: '',
    category: 'SNEAKER'
  };

  categories = ['SNEAKER', 'VETEMENT', 'ACCESSOIRE'];
  isEditMode = false;
  productId: number | null = null;
  error = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  goBack(): void {
    this.router.navigate(['/products']);
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.isEditMode = true;
      this.productService.getById(this.productId).subscribe({
        next: (data) => this.product = data,
        error: () => this.error = 'Produit introuvable'
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.productId) {
      this.productService.update(this.productId, this.product).subscribe({
        next: () => this.router.navigate(['/products']),
        error: () => this.error = 'Erreur lors de la modification'
      });
    } else {
      this.productService.create(this.product).subscribe({
        next: () => this.router.navigate(['/products']),
        error: () => this.error = 'Erreur lors de la création'
      });
    }
  }
}