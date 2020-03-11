import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticatedUserGuard } from './guards/authenticated-user-guard/authenticated-user.guard';


const privateRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canLoad: [AuthenticatedUserGuard],
    canActivate: [AuthenticatedUserGuard],
    canActivateChild: [AuthenticatedUserGuard]
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
