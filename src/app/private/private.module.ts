import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialDesignModule } from '../modules/material-design/material-design.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditItemComponent } from './components/dialog/edit-item/edit-item.component';
import { CarComponent } from './components/dictionaries/car/car.component';
import { CustomerComponent } from './components/dictionaries/customer/customer.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { PrivateRoutingModule } from './private-routing.module';
import { CategoryComponent } from './components/dictionaries/category/category.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MaterialDesignModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    CarComponent,
    MainNavComponent,
    EditItemComponent,
    CustomerComponent,
    CategoryComponent,
    CatalogComponent
  ],
  entryComponents: [
    EditItemComponent
  ],
  exports: [
    RouterModule
  ]
})
export class PrivateModule {
}
