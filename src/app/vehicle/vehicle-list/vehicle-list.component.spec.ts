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

import { VehicleListComponent } from './vehicle-list.component';

describe('VehicleListComponent', () => {
  let component: VehicleListComponent;
  let fixture: ComponentFixture<VehicleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ToastrModule.forRoot(),
        SweetAlert2Module.forRoot(),
        HttpClientModule,
      ],
      declarations: [VehicleListComponent],
    });
    fixture = TestBed.createComponent(VehicleListComponent);
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
