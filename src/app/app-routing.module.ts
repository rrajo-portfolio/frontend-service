import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalog',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'portfolio_admin'] },
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      )
  },
  {
    path: 'catalog',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/catalog/catalog.module').then(
        (m) => m.CatalogModule
      )
  },
  {
    path: 'orders',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['user', 'admin', 'portfolio_admin'] },
    loadChildren: () =>
      import('./features/orders/orders.module').then((m) => m.OrdersModule)
  },
  {
    path: 'cart',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['user'] },
    loadChildren: () =>
      import('./features/cart/cart.module').then((m) => m.CartModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/profile/profile.module').then((m) => m.ProfileModule)
  },
  {
    path: 'users',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'portfolio_admin'] },
    loadChildren: () =>
      import('./features/users/users.module').then((m) => m.UsersModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'portfolio_admin'] },
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: '**',
    redirectTo: 'catalog'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
