import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/pages/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/pages/register/register.component')
        .then(m => m.RegisterComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./auth/pages/forgot-password/forgot-password.component')
        .then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./auth/pages/reset-password/reset-password.component')
        .then(m => m.ResetPasswordComponent)
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./product/pages/product-list/product-list-page.component')
        .then(m => m.ProductListPageComponent)
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./product/pages/product-details/product-details.component')
        .then(m => m.ProductDetailsComponent)
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./category/components/category-list/category-list.component')
        .then(m => m.CategoryListComponent)
  },
  {
    path: 'categories/:id',
    loadComponent: () =>
      import('./category/pages/category-products/category-products.component')
        .then(m => m.CategoryProductsComponent)
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./cart/pages/cart/cart.component')
        .then(m => m.CartPageComponent)
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./order/pages/checkout/checkout.component')
        .then(m => m.CheckoutComponent)
  },
  {
    path: 'my-orders',
    loadComponent: () =>
      import('./order/pages/my-orders/my-orders.component')
        .then(m => m.MyOrdersComponent)
  },
  {
    path: 'orders/:id',
    loadComponent: () =>
      import('./order/pages/order-details/order-details.component')
        .then(m => m.OrderDetailsComponent)
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./user/pages/profile/profile.component')
        .then(m => m.ProfileComponent)
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/pages/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },
  {
    path: 'admin/products',
    loadComponent: () =>
      import('./admin/pages/products/admin-products.component')
        .then(m => m.AdminProductsComponent)
  },
  {
    path: 'admin/products/new',
    loadComponent: () =>
      import('./admin/pages/product-form/product-form.component')
        .then(m => m.ProductFormComponent)
  },
  {
    path: 'admin/products/edit/:id',
    loadComponent: () =>
      import('./admin/pages/product-form/product-form.component')
        .then(m => m.ProductFormComponent)
  },
  {
    path: 'admin/categories',
    loadComponent: () =>
      import('./admin/pages/categories/admin-categories.component')
        .then(m => m.AdminCategoriesComponent)
  },
  {
    path: 'admin/categories/new',
    loadComponent: () =>
      import('./admin/pages/category-form/category-form.component')
        .then(m => m.CategoryFormComponent)
  },
  {
    path: 'admin/categories/edit/:id',
    loadComponent: () =>
      import('./admin/pages/category-form/category-form.component')
        .then(m => m.CategoryFormComponent)
  },
  {
    path: 'admin/orders',
    loadComponent: () =>
      import('./admin/pages/orders/admin-orders.component')
        .then(m => m.AdminOrdersComponent)
  },
  {
    path: 'admin/users',
    loadComponent: () =>
      import('./admin/pages/users/admin-users.component')
        .then(m => m.AdminUsersComponent)
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];
