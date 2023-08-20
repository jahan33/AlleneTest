import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractOverviewComponent } from './contract-overview/contract-overview.component';
import { SharedModule } from '../shared/shared.module';
import { AddContractComponent } from './add-contract/add-contract.component';
import { CustomerModule } from '../customer/customer.module';
import { VehicleModule } from '../vehicle/vehicle.module';

@NgModule({
  declarations: [ContractOverviewComponent, AddContractComponent],
  imports: [
    CommonModule,
    SharedModule,
    ContractRoutingModule,
    CustomerModule,
    VehicleModule,
  ],
})
export class ContractModule {}
