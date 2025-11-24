import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import { User } from '../../../../shared/models/user.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private readonly userSubject = new BehaviorSubject<User | null>(null);
  readonly user$: Observable<User> = this.userSubject
    .asObservable()
    .pipe(filter((user): user is User => !!user));
  editableRoles: string[] = [];
  newRole = '';
  savingRoles = false;
  private currentUser?: User;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly usersService: UsersService,
    private readonly notificationService: NotificationService,
    private readonly translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => this.usersService.getUser(params.get('id')!)),
        tap((user) => {
          this.currentUser = user;
          this.editableRoles = [...(user.roles ?? [])];
        })
      )
      .subscribe((user) => this.userSubject.next(user));
  }

  displayName(user: User): string {
    return `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.fullName || user.email;
  }

  addRole(): void {
    const value = this.newRole.trim();
    if (!value || this.editableRoles.includes(value)) {
      this.newRole = '';
      return;
    }
    this.editableRoles = [...this.editableRoles, value];
    this.newRole = '';
  }

  removeRole(role: string): void {
    this.editableRoles = this.editableRoles.filter((item) => item !== role);
  }

  resetRoles(): void {
    if (this.currentUser) {
      this.editableRoles = [...(this.currentUser.roles ?? [])];
    }
  }

  get rolesChanged(): boolean {
    if (!this.currentUser) {
      return false;
    }
    const original = [...(this.currentUser.roles ?? [])].sort().join('|');
    const edited = [...this.editableRoles].sort().join('|');
    return original !== edited;
  }

  saveRoles(): void {
    if (!this.currentUser || !this.rolesChanged) {
      return;
    }
    this.savingRoles = true;
    this.usersService.updateUserRoles(this.currentUser.id, this.editableRoles).subscribe({
      next: (updated) => {
        this.currentUser = updated;
        this.editableRoles = [...(updated.roles ?? [])];
        this.userSubject.next(updated);
        this.savingRoles = false;
        this.notificationService.success(
          this.translationService.translate('users.detail.roles.saved')
        );
      },
      error: () => {
        this.savingRoles = false;
        this.notificationService.error(
          this.translationService.translate('users.detail.roles.error')
        );
      }
    });
  }
}
