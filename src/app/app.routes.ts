import { Routes } from '@angular/router';
import { AuthPage } from './components/LoginRegister/auth-page/auth-page'; 
import { AdminMain } from './components/admin-dashboard/admin-main/admin-main'; 

import { AddProduct } from './components/admin-dashboard/add-product/add-product'; 
import { Editproduct } from './components/admin-dashboard/edit-product/edit-product'; 
// import { EditProductFormComponent } from './admin/products/edit-product-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthPage },
  {
    path: 'admin',
    component: AdminMain,
    children: [
      { path: 'products/add', component: AddProduct },
      { path: 'products/edit', component: Editproduct },
    //   { path: 'products/edit/:id', component: EditProductFormComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
