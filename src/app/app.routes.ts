import { Routes } from '@angular/router';
import { HeroPage } from './components/dashboard/hero/hero';
import { AuthPage } from './components/LoginRegister/auth-page/auth-page';
import { MainCart } from './components/Add-Cart/main-cart/main-cart';
import { ProfileDashboard } from './components/LoginRegister/profile-dashboard/profile-dashboard';
import { AdminMain } from './components/admin-dashboard/admin-main/admin-main';

// Order Components
import { OrderMain } from './components/order-mgmt/order-main/order-main';
import { OrderDashboard } from './components/order-mgmt/order-dashboard/order-dashboard';
import { OrderList } from './components/order-mgmt/order-list/order-list';
import { OrderDetail } from './components/order-mgmt/order-detail/order-detail';
import { RegisterForm } from './components/LoginRegister/register-form/register-form';
import { ViewProduct } from './components/admin-dashboard/view-product/view-product';
import { AddProduct } from './components/admin-dashboard/add-product/add-product';
import { Editproduct } from './components/admin-dashboard/edit-product/edit-product';
import { Editformcomponent } from './components/admin-dashboard/editformcomponent/editformcomponent';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HeroPage },
  { path: 'login', component: AuthPage },
  {path: 'register', component:RegisterForm},
  { path: 'cart', component: MainCart },
  { path: 'profile', component: ProfileDashboard },

  { 
    path: 'orders', component: OrderMain, 
    children: [          
      { path: '', redirectTo: 'history', pathMatch: 'full' }, 
      { path: 'history', component: OrderList },
      { path: 'detail/:id', component: OrderDetail }
    ]
  },

  {
  path: 'admin',
  component: AdminMain,
  children: [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'products', component: ViewProduct },
    { path: 'add', component: AddProduct },
 
    { path: 'manage', component: Editproduct },
 
    { path: 'edit/:id', component: Editformcomponent }
  ]
},
 

  { path: '**', redirectTo: 'home' } 
];