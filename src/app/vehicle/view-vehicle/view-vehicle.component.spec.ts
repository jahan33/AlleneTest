import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  inject,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import {
  PageRequestDto,
  sortEnum,
} from '../../shared/models/page-request/page-request-dto';
import { VehicleService } from '../../shared/services/vehicle/vehicle.service';
import { SharedModule } from '../../shared/shared.module';

import { ViewVehicleComponent } from './view-vehicle.component';

describe('ViewVehicleComponent', () => {
  let component: ViewVehicleComponent;
  let fixture: ComponentFixture<ViewVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ToastrModule.forRoot(),
        SweetAlert2Module.forRoot(),
        HttpClientModule,
      ],
      declarations: [ViewVehicleComponent],
    });
    fixture = TestBed.createComponent(ViewVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Get Vehicle List', waitForAsync(
    inject([VehicleService], (vehicleService: VehicleService) => {
      let pageRequestDto: PageRequestDto = {
        page: 0,
        size: 10,
        sort: sortEnum.UNSORTED,
      };
      vehicleService.GetVehiclePageList(pageRequestDto).subscribe((result) => {
        expect(result.numberOfItems).toBeGreaterThanOrEqual(0);
      });
    })
  ));
});
