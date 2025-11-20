import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import {
  AccountUser,
  UserPreferences,
  UserStats,
} from '../../shared/models/account-user.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly preferencesKey = 'portfolio.preferences';
  private currentUser?: AccountUser;

  constructor(private readonly authService: AuthService) {}

  setCurrentUser(user: AccountUser): void {
    this.currentUser = user;
  }

  getUserStats(): Observable<UserStats> {
    const memberSince =
      this.currentUser?.passwordUpdatedAt ?? new Date('2023-01-01');
    return of({
      orderCount: 24,
      memberSince,
    });
  }

  getPreferences(): Observable<UserPreferences> {
    const stored = localStorage.getItem(this.preferencesKey);
    if (stored) {
      try {
        return of(JSON.parse(stored) as UserPreferences);
      } catch {
        // fallthrough to defaults
      }
    }
    return of({
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
    });
  }

  updatePreferences(
    preferences: UserPreferences,
  ): Observable<UserPreferences> {
    localStorage.setItem(this.preferencesKey, JSON.stringify(preferences));
    return of(preferences);
  }

  updateProfile(
    payload: Partial<Pick<AccountUser, 'name' | 'phone' | 'username'>>,
  ): Observable<AccountUser> {
    if (!this.currentUser) {
      return this.authService.getCurrentUser().pipe(
        map((user) => {
          this.currentUser = { ...user, ...payload };
          return this.currentUser;
        }),
      );
    }
    this.currentUser = { ...this.currentUser, ...payload };
    return of(this.currentUser);
  }

  uploadAvatar(_: File): Observable<{ avatarUrl: string }> {
    const seed = this.currentUser?.name || 'portfolio-user';
    const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      seed,
    )}`;
    if (this.currentUser) {
      this.currentUser.avatar = avatarUrl;
    }
    return of({ avatarUrl });
  }

  downloadUserData(): Observable<Blob> {
    const payload = {
      user: this.currentUser ?? null,
      preferences: JSON.parse(
        localStorage.getItem(this.preferencesKey) ?? '{}',
      ),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    return of(blob);
  }

  deleteAccount(): Observable<void> {
    return of(undefined).pipe(delay(800));
  }
}
