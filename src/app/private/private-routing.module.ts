import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CarComponent } from './components/dictionaries/car/car.component';
import { CategoryComponent } from './components/dictionaries/category/category.component';
import { CustomerComponent } from './components/dictionaries/customer/customer.component';
import { TestTableComponent } from './components/test-table/test-table.component';
import { AuthenticatedUserGuard } from './guards/authenticated-user-guard/authenticated-user.guard';


const privateRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canLoad: [AuthenticatedUserGuard],
    canActivate: [AuthenticatedUserGuard],
    canActivateChild: [AuthenticatedUserGuard],
    children: [
      {
        path: '',
        component: CatalogComponent,
        canLoad: [AuthenticatedUserGuard],
        canActivate: [AuthenticatedUserGuard]
      },
      {
        path: 'table',
        component: TestTableComponent,
        canLoad: [AuthenticatedUserGuard],
        canActivate: [AuthenticatedUserGuard]
      },
      {
        path: 'cars',
        component: CarComponent,
        canLoad: [AuthenticatedUserGuard],
        canActivate: [AuthenticatedUserGuard]
      },
      {
        path: 'customers',
        component: CustomerComponent,
        canLoad: [AuthenticatedUserGuard],
        canActivate: [AuthenticatedUserGuard]
      },
      {
        path: 'categories',
        component: CategoryComponent,
        canLoad: [AuthenticatedUserGuard],
        canActivate: [AuthenticatedUserGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(privateRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PrivateRoutingModule {
}
