import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { DxDataGridModule } from 'devextreme-angular';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DxDataGridModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    SharedRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  exports: [
    DxDataGridModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    DxDataGridModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask()],
})
export class SharedModule {}
