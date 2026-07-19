import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { ProductList } from './components/product-list/product-list';
import { authGuard } from './guards/auth-guard';
import { ProductForm } from './components/product-form/product-form';
import { Sales } from './components/sales/sales';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'products', component: ProductList, canActivate: [authGuard] },
  { path: 'products/add', component: ProductForm, canActivate: [authGuard] },
  { path: 'products/edit/:id', component: ProductForm, canActivate: [authGuard] },
  { path: 'sales', component: Sales, canActivate: [authGuard] }
];