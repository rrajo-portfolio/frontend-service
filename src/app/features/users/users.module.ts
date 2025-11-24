import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [UserListComponent, UserProfileComponent],
  imports: [CommonModule, FormsModule, SharedModule, UsersRoutingModule]
})
export class UsersModule {}
