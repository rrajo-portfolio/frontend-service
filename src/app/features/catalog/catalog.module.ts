import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogRoutingModule } from './catalog-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductAdminComponent } from './components/product-admin/product-admin.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductSearchComponent,
    ProductAdminComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CatalogRoutingModule
  ]
})
export class CatalogModule {}
