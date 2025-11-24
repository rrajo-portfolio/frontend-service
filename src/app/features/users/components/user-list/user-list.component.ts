import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { User } from '../../../../shared/models/user.model';

interface UsersMetrics {
  total: number;
  active: number;
  pending: number;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$!: Observable<User[]>;
  metrics$!: Observable<UsersMetrics>;

  constructor(private readonly usersService: UsersService) {}

  ngOnInit(): void {
    this.users$ = this.usersService.getUsers().pipe(shareReplay(1));
    this.metrics$ = this.users$.pipe(map((users) => this.mapMetrics(users)));
  }

  trackByUser(index: number, user: User): string | number {
    return user.id ?? index;
  }

  getInitials(user: User): string {
    const base = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.email;
    return base
      .split(/\s+/)
      .filter(Boolean)
      .map((segment) => segment[0]?.toUpperCase() ?? '')
      .slice(0, 2)
      .join('');
  }

  private mapMetrics(users: User[]): UsersMetrics {
    const total = users.length;
    const active = users.filter((user) => user.active).length;
    return {
      total,
      active,
      pending: total - active
    };
  }
}
