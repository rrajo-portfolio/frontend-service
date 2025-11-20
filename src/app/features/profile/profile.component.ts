import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AccountUser,
  UserPreferences,
  UserStats
} from '../../shared/models/account-user.model';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: AccountUser | null = null;
  userStats: UserStats | null = null;
  preferences: UserPreferences = {
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false
  };

  personalForm: FormGroup;
  editingPersonal = false;
  savingPersonal = false;
  activeSessions = 1;

  constructor(
    private readonly fb: FormBuilder,
    public readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService
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
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.userService.setCurrentUser(user);
      this.patchPersonalForm(user);
    });

    this.userService.getUserStats().subscribe((stats) => {
      this.userStats = stats;
    });

    this.userService.getPreferences().subscribe((prefs) => {
      this.preferences = prefs;
    });
  }

  get hasAdminRole(): boolean {
    return this.user?.roles.includes('admin') ?? false;
  }

  getRoleLabel(role: string): string {
    const labels: Record<string, string> = {
      admin: 'Administrador',
      user: 'Usuario',
      'catalog_read': 'Lectura catálogo',
      'orders_write': 'Gestión pedidos'
    };
    return labels[role] ?? role;
  }

  toggleEditPersonal(): void {
    this.editingPersonal = true;
  }

  cancelEditPersonal(): void {
    this.editingPersonal = false;
    if (this.user) {
      this.patchPersonalForm(this.user);
    }
  }

  savePersonal(): void {
    if (this.personalForm.invalid || !this.user) {
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
      next: (user) => {
        this.user = user;
        this.savingPersonal = false;
        this.editingPersonal = false;
        this.notificationService.success('Perfil actualizado correctamente');
      },
      error: () => {
        this.savingPersonal = false;
        this.notificationService.error('Error al actualizar el perfil');
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
        next: ({ avatarUrl }) => {
          if (this.user) {
            this.user = { ...this.user, avatar: avatarUrl };
          }
          this.notificationService.success('Avatar actualizado correctamente');
        },
        error: () => {
          this.notificationService.error('No se pudo actualizar el avatar');
        }
      });
    };
    input.click();
  }

  changePassword(): void {
    window.location.href = this.authService.getKeycloakPasswordChangeUrl();
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
        'Esta acción eliminará tu cuenta de demostración. ¿Deseas continuar?'
      )
    ) {
      return;
    }
    this.userService.deleteAccount().subscribe(() => {
      this.notificationService.success('Cuenta eliminada correctamente');
      this.authService.logout();
    });
  }

  savePreferences(): void {
    this.userService.updatePreferences(this.preferences).subscribe(() => {
      this.notificationService.success('Preferencias guardadas');
    });
  }

  setup2FA(): void {
    this.notificationService.success('Configura 2FA desde el portal de Keycloak');
  }

  viewActivity(): void {
    this.notificationService.success('Actividad disponible en el panel de Keycloak');
  }

  viewSessions(): void {
    this.notificationService.success('Revisa las sesiones activas en Keycloak');
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
}
