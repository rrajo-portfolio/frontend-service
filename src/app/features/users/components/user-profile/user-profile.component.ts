import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user$!: Observable<User>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params) => this.usersService.getUser(params.get('id')!))
    );
  }

  displayName(user: User): string {
    return `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.fullName || user.email;
  }
}
