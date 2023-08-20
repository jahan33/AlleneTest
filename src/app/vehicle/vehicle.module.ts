import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { AddVehiclePopupComponent } from './add-vehicle-popup/add-vehicle-popup.component';
import { SharedModule } from '../shared/shared.module';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';

const comp = [AddVehiclePopupComponent, ViewVehicleComponent];
@NgModule({
  declarations: [...comp, VehicleListComponent],
  exports: [...comp],
  imports: [CommonModule, SharedModule, VehicleRoutingModule],
})
export class VehicleModule {}
