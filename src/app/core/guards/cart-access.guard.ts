import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class CartAccessGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.isAdministrativeUser()) {
      return this.router.parseUrl('/orders');
    }
    return true;
  }

  private isAdministrativeUser(): boolean {
    return this.authService.hasRole('admin') || this.authService.hasRole('portfolio_admin');
  }
}
