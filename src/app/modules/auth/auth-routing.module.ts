import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

import { LoginComponent } from './login/login.component';
import { RedefinePasswordComponent } from './redefine-password/redefine-password.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'redefine-password', 
    component: RedefinePasswordComponent 
  },
  {
    path: 'unauthorized',
    component: LayoutComponent,
    children: [
      { path: '', component: UnauthorizedComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
