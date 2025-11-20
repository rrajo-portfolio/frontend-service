import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: AdminComponent }])
  ]
})
export class AdminModule {}
