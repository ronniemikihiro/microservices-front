import { UserFormComponent } from './user-form/user-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { LayoutComponent } from '../shared/layout/layout.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'form',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: '', component: UserFormComponent }
    ]
  },
  {
    path: 'form/:id',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: '', component: UserFormComponent }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard], 
    canActivateChild: [AuthGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: '', component: UserListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
