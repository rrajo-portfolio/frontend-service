import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$!: Observable<User[]>;
  displayedColumns = ['name', 'email', 'roles', 'status', 'actions'];

  constructor(private readonly usersService: UsersService) {}

  ngOnInit(): void {
    this.users$ = this.usersService.getUsers();
  }
}
