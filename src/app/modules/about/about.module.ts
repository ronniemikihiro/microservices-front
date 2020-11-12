import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutHomeComponent } from './about-home/about-home.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AboutHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
