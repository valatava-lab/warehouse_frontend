import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialDesignModule } from '../modules/material-design/material-design.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditItemComponent } from './components/dialog/edit-item/edit-item.component';
import { CarComponent } from './components/dictionaries/car/car.component';
import { CustomerComponent } from './components/dictionaries/customer/customer.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { PrivateRoutingModule } from './private-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MaterialDesignModule,
    FormsModule
  ],
  declarations: [
    DashboardComponent,
    CarComponent,
    MainNavComponent,
    EditItemComponent,
    CustomerComponent
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
