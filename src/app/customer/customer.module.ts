import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { SharedModule } from '../shared/shared.module';
import { DxDataGridModule } from 'devextreme-angular';
import { AddCustomerPopupComponent } from './add-customer-popup/add-customer-popup.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';

const comp = [AddCustomerPopupComponent, ViewCustomerComponent];

@NgModule({
  declarations: [...comp, CustomerListComponent],
  exports: [...comp],
  imports: [CommonModule, SharedModule, CustomerRoutingModule],
})
export class CustomerModule {}
