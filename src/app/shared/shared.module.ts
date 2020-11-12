import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LimitToPipe } from './pipes/limit-to.pipe';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SelectCheckAllComponent } from './components/select-check-all/select-check-all.component';

@NgModule({
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  declarations: [
    LayoutComponent,
    LimitToPipe,
    LocalDatePipe,
    YesNoPipe,
    ConfirmDialogComponent,
    SelectCheckAllComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    LimitToPipe,
    LocalDatePipe,
    YesNoPipe,
    ConfirmDialogComponent,
    SelectCheckAllComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    SelectCheckAllComponent
  ]
})
export class SharedModule { }
