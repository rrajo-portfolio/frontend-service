import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { LucideAngularModule } from 'lucide-angular';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LucideAngularModule,
    RouterModule.forChild([{ path: '', component: ProfileComponent }])
  ]
})
export class ProfileModule {}
