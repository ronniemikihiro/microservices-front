import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [UserListComponent, UserFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
