import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule
  ],
  declarations: [
    CustomerListComponent
  ],
  entryComponents: [
  ]
})
export class CustomersModule { }
