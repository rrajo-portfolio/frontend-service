import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import {
  AccountUser,
  UserPreferences,
  UserStats
} from '../../shared/models/account-user.model';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { NotificationService } from '../../core/services/notification.service';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$!: Observable<AccountUser | null>;
  userStats$!: Observable<UserStats | null>;
  private currentUser: AccountUser | null = null;

  preferences: UserPreferences = {
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false
  };

  personalForm: FormGroup;
  editingPersonal = false;
  savingPersonal = false;
  activeSessions = 1;
  private readonly defaultMemberSince = new Date('2023-01-01');

  constructor(
    private readonly fb: FormBuilder,
    public readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
    private readonly translationService: TranslationService
  ) {
    this.personalForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: [{ value: '', disabled: true }],
      phone: [''],
      username: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.initializeUserStreams();
    this.loadPreferences();
  }

  get hasAdminRole(): boolean {
    return this.authService.hasRole('portfolio_admin') || this.authService.hasRole('admin');
  }

  private readonly roleLabelMap: Record<string, string> = {
    admin: 'profile.roles.labels.admin',
    user: 'profile.roles.labels.user',
    catalog_read: 'profile.roles.labels.catalogRead',
    orders_write: 'profile.roles.labels.ordersWrite'
  };

  getRoleLabel(role: string): string {
    const key = this.roleLabelMap[role];
    return key ? this.translationService.translate(key) : role;
  }

  toggleEditPersonal(): void {
    this.editingPersonal = true;
  }

  cancelEditPersonal(): void {
    this.editingPersonal = false;
    if (this.currentUser) {
      this.patchPersonalForm(this.currentUser);
    }
  }

  savePersonal(): void {
    if (this.personalForm.invalid) {
      this.personalForm.markAllAsTouched();
      return;
    }

    this.savingPersonal = true;
    const { firstName, lastName, phone, username } =
      this.personalForm.getRawValue();
    const payload = {
      name: `${firstName} ${lastName}`.trim(),
      phone,
      username
    };

    this.userService.updateProfile(payload).subscribe({
      next: () => {
        this.savingPersonal = false;
        this.editingPersonal = false;
        this.refreshCurrentUser();
        this.notificationService.success(this.t('profile.notifications.personalSaved'));
      },
      error: () => {
        this.savingPersonal = false;
        this.notificationService.error(this.t('profile.notifications.personalError'));
      }
    });
  }

  changeAvatar(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (!file) {
        return;
      }
      this.userService.uploadAvatar(file).subscribe({
        next: () => {
          this.refreshCurrentUser();
          this.notificationService.success(this.t('profile.notifications.avatarSaved'));
        },
        error: () => {
          this.notificationService.error(this.t('profile.notifications.avatarError'));
        }
      });
    };
    input.click();
  }

  changePassword(): void {
    this.authService.startKeycloakAccountAction('UPDATE_PASSWORD');
  }

  downloadData(): void {
    this.userService.downloadUserData().subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'portfolio-profile.json';
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  }

  deleteAccount(): void {
    if (
      !confirm(
        this.t('profile.notifications.deleteConfirm')
      )
    ) {
      return;
    }
    this.userService.deleteAccount().subscribe(() => {
      this.notificationService.success(this.t('profile.notifications.deleteSuccess'));
      this.authService.logout();
    });
  }

  savePreferences(): void {
    this.userService.updatePreferences(this.preferences).subscribe(() => {
      this.notificationService.success(this.t('profile.notifications.preferencesSaved'));
    });
  }

  setup2FA(): void {
    this.authService.startKeycloakAccountAction('CONFIGURE_TOTP');
  }

  viewActivity(): void {
    this.notificationService.success(this.t('profile.notifications.activity'));
  }

  viewSessions(): void {
    this.notificationService.success(this.t('profile.notifications.sessions'));
  }

  private initializeUserStreams(): void {
    const stream$ = this.loadCurrentUserStream().pipe(shareReplay(1));
    this.user$ = stream$;
    this.userStats$ = stream$.pipe(
      map((user) => ({
        orderCount: 24,
        memberSince: user?.passwordUpdatedAt ?? this.defaultMemberSince
      }))
    );
  }

  getUserInitials(user: AccountUser | null): string {
    if (!user) {
      return '';
    }
    const source = user.name?.trim() || user.username || user.email || '';
    return source
      .split(/\s+/)
      .filter(Boolean)
      .map((segment) => segment[0]?.toUpperCase() ?? '')
      .slice(0, 2)
      .join('');
  }

  private patchPersonalForm(user: AccountUser): void {
    const [firstName, ...lastParts] = user.name.split(' ');
    this.personalForm.patchValue({
      firstName: firstName,
      lastName: lastParts.join(' '),
      email: user.email,
      phone: user.phone ?? '',
      username: user.username
    });
  }

  private loadPreferences(): void {
    this.userService
      .getPreferences()
      .pipe(take(1))
      .subscribe({
        next: (prefs) => {
          this.preferences = { ...prefs };
        }
      });
  }

  private loadCurrentUserStream(): Observable<AccountUser | null> {
    return this.authService.getCurrentUser().pipe(
      tap((user) => {
        this.currentUser = user;
        if (user) {
          this.userService.setCurrentUser(user);
          this.patchPersonalForm(user);
        }
      })
    );
  }

  private refreshCurrentUser(): void {
    this.initializeUserStreams();
  }

  private t(key: string): string {
    return this.translationService.translate(key);
  }
}




