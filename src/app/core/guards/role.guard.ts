import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const roles = route.data['roles'] as string[] | undefined;
    const excludedRoles = route.data['excludeRoles'] as string[] | undefined;
    const hasAllowedRole = !roles || this.authService.hasAnyRole(roles);
    const hitsExcluded =
      excludedRoles && excludedRoles.length
        ? this.authService.hasAnyRole(excludedRoles)
        : false;
    if (hasAllowedRole && !hitsExcluded) {
      return true;
    }

    return this.router.parseUrl('/catalog');
  }
}
