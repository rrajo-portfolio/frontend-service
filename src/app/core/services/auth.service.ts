import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AccountUser } from '../../shared/models/account-user.model';

import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private profile?: KeycloakProfile;
  private authenticated = false;

  constructor(
    private readonly keycloak: KeycloakService,
    private readonly http: HttpClient
  ) {}

  init(): Observable<KeycloakProfile | undefined> {
    return from(Promise.resolve(this.keycloak.isLoggedIn())).pipe(
      map((loggedIn) => {
        this.authenticated = loggedIn;
        if (loggedIn) {
          const profile = this.syncProfileFromToken();
          this.syncUserWithBackend(profile);
          return profile;
        }
        return undefined;
      })
    );
  }

  private syncUserWithBackend(profile?: KeycloakProfile): void {
    if (!profile) return;
    const user = this.mapAccountUser(profile);
    const payload = {
      fullName: user.name,
      email: user.email,
      phoneNumber: user.phone,
      status: 'ACTIVE'
    };
    // Fire and forget sync to users-service
    this.http.post(`${environment.apiUrl}/api/users`, payload).subscribe({
      error: (err) => {
        if (err.status !== 409) { // 409 means already exists, which is fine
          console.warn('Failed to sync user with backend', err);
        }
      }
    });
  }

  login(): void {
    this.keycloak.login({
      redirectUri: window.location.origin + '/catalog'
    });
  }

  logout(): void {
    this.keycloak.logout(window.location.origin);
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getToken(): Promise<string> {
    return this.keycloak.getToken();
  }

  getProfile(): KeycloakProfile | undefined {
    return this.profile;
  }

  getCurrentUser(): Observable<AccountUser> {
    const profile = this.profile ?? this.syncProfileFromToken();
    if (profile) {
      return of(this.mapAccountUser(profile));
    }
    return of(this.mapFallbackAccountUser());
  }

  hasRole(role: string): boolean {
    return this.keycloak.isUserInRole(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some((role) => this.hasRole(role));
  }

  getRoles(): string[] {
    const token =
      (this.keycloak.getKeycloakInstance().tokenParsed as Record<
        string,
        unknown
      >) ?? {};
    const realmRoles =
      (token['realm_access'] as { roles?: string[] } | undefined)?.roles ?? [];
    const resourceAccess =
      (token['resource_access'] as Record<string, { roles?: string[] }> | undefined) ??
      {};
    const clientRoles = Object.values(resourceAccess).flatMap(
      (client) => client.roles ?? []
    );
    return Array.from(new Set([...realmRoles, ...clientRoles]));
  }

  getAccountManagementUrl(redirectPath: string = '/profile'): string {
    return this.keycloak
      .getKeycloakInstance()
      .createAccountUrl({ redirectUri: `${window.location.origin}${redirectPath}` });
  }

  getKeycloakPasswordChangeUrl(): string {
    const accountUrl = this.keycloak
      .getKeycloakInstance()
      .createAccountUrl({ redirectUri: `${window.location.origin}/profile` });
    const url = new URL(accountUrl);
    url.searchParams.set('kc_action', 'UPDATE_PASSWORD');
    return url.toString();
  }

  private syncProfileFromToken(): KeycloakProfile | undefined {
    const token =
      (this.keycloak.getKeycloakInstance().tokenParsed as Record<string, unknown>) ??
      undefined;
    if (!token) {
      this.profile = undefined;
      return undefined;
    }
    const profile: KeycloakProfile = {
      firstName: token['given_name'] as string | undefined,
      lastName: token['family_name'] as string | undefined,
      email: token['email'] as string | undefined,
      username: (token['preferred_username'] as string | undefined) ?? undefined
    };
    this.profile = profile;
    return profile;
  }

  private mapAccountUser(profile: KeycloakProfile): AccountUser {
    const fullName =
      `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim() ||
      profile.username ||
      'Portfolio User';
    const parsedToken = this.keycloak.getKeycloakInstance()
      .tokenParsed as Record<string, unknown> | undefined;
    
    // Use 'sub' (Subject) claim as the definitive UUID for the user
    const userId = (parsedToken?.['sub'] as string) || profile.id || 'current-user';

    const passwordUpdatedAt =
      typeof parsedToken?.['auth_time'] === 'number'
        ? new Date((parsedToken!['auth_time'] as number) * 1000)
        : undefined;

    const attributes =
      ((profile as unknown as { attributes?: Record<string, string[]> })
        .attributes as Record<string, string[]> | undefined) ?? undefined;
    const phoneAttribute =
      attributes?.['phone'] ?? attributes?.['phoneNumber'];
    const phone =
      Array.isArray(phoneAttribute) && phoneAttribute.length > 0
        ? phoneAttribute[0]
        : undefined;

    return {
      id: userId,
      name: fullName,
      email: profile.email ?? 'sin-email@portfolio.local',
      username: profile.username ?? 'portfolio-user',
      phone,
      avatar: undefined,
      roles: this.getRoles(),
      passwordUpdatedAt,
      twoFactorEnabled: false
    };
  }

  private getRealmBaseUrl(): string {
    const baseUrl = environment.keycloak.url.replace(/\/$/, '');
    return `${baseUrl}/realms/${environment.keycloak.realm}`;
  }

  private mapFallbackAccountUser(): AccountUser {
    const profile = this.syncProfileFromToken();
    if (profile) {
      return this.mapAccountUser(profile);
    }
    const username = 'portfolio-user';
    return {
      id: username,
      name: 'Portfolio User',
      email: 'sin-email@portfolio.local',
      username,
      phone: undefined,
      avatar: undefined,
      roles: this.getRoles(),
      passwordUpdatedAt: undefined,
      twoFactorEnabled: false
    };
  }
}
