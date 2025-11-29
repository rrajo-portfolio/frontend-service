import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { User } from '../../../shared/models/user.model';
import { PageResponse } from '../../../shared/models/page.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly baseEndpoint = '/api/users';

  constructor(private readonly api: ApiService) {}

  getUsers(): Observable<User[]> {
    return this.api
      .get<PageResponse<User>>(this.baseEndpoint)
      .pipe(map((page) => this.ensureArray(page.content)));
  }

  getUser(id: string): Observable<User> {
    return this.api.get<User>(`${this.baseEndpoint}/${id}`);
  }

  updateUserRoles(id: string, roles: string[]): Observable<User> {
    return this.api.put<User>(`${this.baseEndpoint}/${id}/roles`, { roles });
  }

  private ensureArray<T>(items: T[] | T | undefined | null): T[] {
    return Array.isArray(items) ? items : [];
  }
}
